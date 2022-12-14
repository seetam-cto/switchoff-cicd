import Media from "../models/media"
const imageTypes = ['image/jpeg', 'image/png']
const videoTypes = ['video/mpeg', 'video/mp4', 'video/quicktime']
const iconTypes = ['image/x-icon', 'image/svg+xml']

const getMediaType = (mtype) => {
    if(imageTypes.includes(mtype)){
        return "image"
    } else if(videoTypes.includes(mtype)){
        return "video"
    } else if(iconTypes.includes(mtype)){
        return "icon"
    } else {
        return "document"
    }
}

export const getMedia = async (req, res) => {
    const mediaId = req.params.id
    try{
        let media = await Media.findById(mediaId).exec();
        if(!media) return res.status(400).send("Media file doesn't exist!")
        res.status(200).json(media.url)
    }catch(err){
        console.log(err)
        res.status(400).send("Error Fetching Media File!")
    }
}

export const getSpecificMedia = async (req, res) => {
    const {auth} = req
    try{
        let result = await Media.find({'postedBy': auth._id, 'forProperty': req.params.propertyId})
        .sort({createdAt: -1}).exec();
        if(!result) return res.status(400).send("No Media files Found.")
        // const files = result.map(file => {
        //     file.url = req.protocol + '://' + req.get('host') + file.url
        //     return file
        // });
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error Fetching Media Files!")
    }
}

export const getPrivateMedia = async (req, res) => {
    const {auth} = req
    try{
        let result = await Media.find({'postedBy': auth._id})
        .sort({createdAt: -1}).exec();
        if(!result) return res.status(400).send("Media files doesn't exist!")
        // const files = result.map(file => {
        //     file.url = req.protocol + '://' + req.get('host') + file.url
        //     return file
        // });
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error Fetching Media Files!")
    }
}

export const directUpload = async (req, res) => {
    // console.log(req.file)
    if(!req.file) return res.status(400).send("Upload Failed!")
    return res.status(200).json(req.file)
}

export const uploadMedia = async (req, res) => {
    // console.log(JSON.stringify(req.file, null, 4))
    if(!req.file) return res.status(400).send("Upload Failed!")
    const mediaData = {
        title: req.file.originalname,
        alt: '',
        url: req.file.location,
        media_type: getMediaType(req.file.mimetype.toString()),
        postedBy: req.auth._id
    }
    const media = new Media(mediaData)
    try{
        await media.save()
        return res.status(200).json(media)
    }catch(err){
        console.log(err)
        res.status(400).send("Upload Failed!")
    }
    res.status(200).send("Image Uploaded")
}

export const uploadPropertyMedia = async (req, res) => {
    // console.log(JSON.stringify(req.file, null, 4))
    console.log(req.files)
    console.log(req.params.propertyId)
    let status = 400;
    const {files, params} = req
    files.map(async (file) => {
        const mediaData = {
            title: file.originalname,
            alt: '',
            url: file.location,
            forProperty: params.propertyId,
            media_type: getMediaType(file.mimetype.toString()),
            postedBy: req.auth._id
        }
        const media = new Media(mediaData)
        try{
            await media.save()
            status = 200
        }catch(err){
            console.log(err)
            status = 400
            res.status(400).send("Upload Failed!")
        }
    })
    res.status(200).send("Image Uploaded")
}

export const deleteMedia = () => {
    return true
}