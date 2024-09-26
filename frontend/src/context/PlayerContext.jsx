import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekPlayer = useRef();
    const seekBar = useRef();

    // state variables
    const [track, setTrack] = useState(songsData[0]);   // Default = 1st song
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            seconds: 0,
            minutes: 0
        },
        totalTime: {
            seconds: 0,
            minutes: 0
        }
    })

    const play = () => {
        audioRef.current.play();
        setPlayerStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayerStatus(false)
    }

    const playWithId = async(id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayerStatus(true)
    }

    const previous = async () => {
        if(track.id > 0) {
            await setTrack(songsData[track.id - 1])
            await audioRef.current.play();
            setPlayerStatus(true);
        }
    }

    const next = async () => {
        if(track.id < songsData.length - 1) {
            await setTrack(songsData[track.id + 1])
            await audioRef.current.play();
            setPlayerStatus(true);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = Math.floor(Math.floor((audioRef.current.currentTime/audioRef.current.duration)*100)) + "%"
                setTime({
                    currentTime: {
                        seconds: Math.floor(audioRef.current.currentTime % 60),
                        minutes: Math.floor(audioRef.current.currentTime / 60)
                    },
                    totalTime: {
                        seconds: Math.floor(audioRef.current.duration % 60),
                        minutes: Math.floor(audioRef.current.duration % 60)
                    }
                })
            }
        }, 1000)    // 1 sec
    }, [audioRef])

    const contextValue = {
        audioRef,
        seekPlayer,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;