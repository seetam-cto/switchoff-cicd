import express from "express"
import { appendFile } from "fs"
import { getMedia, uploadMedia, getPrivateMedia, getSpecificMedia, uploadPropertyMedia } from "../controllers/media"
import { requireSignIn } from "../middlewares"
const path = require('path')
import { v4 as uuidv4 } from 'uuid';
import { s3Client } from "../controllers/s3client"
const multer = require('multer')
const multerS3 = require('multer-s3')

const imageTypes = ['image/jpeg', 'image/png']
const videoTypes = ['video/mpeg', 'video/mp4', 'video/quicktime']
const iconTypes = ['image/x-icon', 'image/svg+xml']

// const localstorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if(imageTypes.includes(file.mimetype.toString())){
//             cb(null, './media/images')
//         }else if(videoTypes.includes(file.mimetype.toString())){
//             cb(null, './media/videos')
//         }else if(iconTypes.includes(file.mimetype.toString())){
//             cb(null, './media/icons')
//         } else {
//             cb(null, './media/documents')
//         }
//     },
//     filename: (req, file, cb) => {
//         cb(null, uuidv4() + path.extname(file.originalname))
//     }
// })

const s3storage =  multerS3({
        s3: s3Client,
        bucket: 'switchoff-assets',
        acl: "public-read",
        metadata: (req, file, cb) => {
            if(imageTypes.includes(file.mimetype.toString())){
                cb(null, '/media/images')
            }else if(videoTypes.includes(file.mimetype.toString())){
                cb(null, '/media/videos')
            }else if(iconTypes.includes(file.mimetype.toString())){
                cb(null, '/media/icons')
            } else {
                cb(null, '/media/documents')
            }
        },
        key: (req, file, cb) => {
            cb(null, uuidv4() + path.extname(file.originalname))
        }
    })

const upload = multer({storage: s3storage})

const router = express.Router()

router.post("/media/upload", requireSignIn, upload.single("media"), uploadMedia)
router.post("/media/:propertyId/upload", requireSignIn, upload.array("media",30), uploadPropertyMedia)
router.get("/media/:id", getMedia)
router.get("/media", requireSignIn, getPrivateMedia)
router.get("/media/property/:propertyId", requireSignIn, getSpecificMedia)

module.exports = router