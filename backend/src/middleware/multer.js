// extract song data, mp3 data and image data from frontend
import multer from 'multer'

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null,file.originalname)
    }
})

const upload = multer({storage});

export default upload;