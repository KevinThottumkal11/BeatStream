import { createContext, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekPlayer = useRef();
    const seekBar = useRef();

    // state variables
    const [track, setTrack] = useState(songsData[0]);   // Default = 1st song
    const [playerStatus, setPlayerStatus] = useState(false);
    const [time, SetTime] = useState({
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

    const contextValue = {
        audioRef,
        seekPlayer,
        seekBar,
        track,
        setTrack,
        playerStatus,
        setPlayerStatus,
        time,
        SetTime,
        play,
        pause,
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;