const multer = require('multer')
const path = require('path')

module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Formato de imagen no permitido'), false)
        }
        cb(null, true)
    }
})