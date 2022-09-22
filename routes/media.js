import express from "express"
import { appendFile } from "fs"
import { getMedia, uploadMedia, getPrivateMedia } from "../controllers/media"
import { requireSignIn } from "../middlewares"
const path = require('path')
import { v4 as uuidv4 } from 'uuid';
const multer = require('multer')

const imageTypes = ['image/jpeg', 'image/png']
const videoTypes = ['video/mpeg', 'video/mp4', 'video/quicktime']
const iconTypes = ['image/x-icon', 'image/svg+xml']

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if(imageTypes.includes(file.mimetype.toString())){
            cb(null, './media/images')
        }else if(videoTypes.includes(file.mimetype.toString())){
            cb(null, './media/videos')
        }else if(iconTypes.includes(file.mimetype.toString())){
            cb(null, './media/icons')
        } else {
            cb(null, './media/documents')
        }
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

const router = express.Router()

router.post("/media/upload", requireSignIn, upload.single("media"), uploadMedia)
router.get("/media/:id", getMedia)
router.get("/media", requireSignIn, getPrivateMedia)

module.exports = router