const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req ,file , callBack) => {
        callBack (null , './public/images')
    },
    filename: (req, file, callback) => {
        callback (null ,Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine });

module.exports = upload;
