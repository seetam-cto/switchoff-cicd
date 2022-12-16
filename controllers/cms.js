import CMS from "../models/cms"
import Property from "../models/property"
import Banner from "../models/banner"

//get settings
export const getSettings = async (req, res) => {
    try{
        let settings = await CMS.find()
        .populate("homepage.banner")
        .populate({
            path: "homepage.deals",
            populate: {
                path: "list",
                model: "Property"
            }
        })
        .exec()

        if(!settings) return res.status(400).send("Settings not found!")

        let setting = settings[0]
        res.status(200).json(setting)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Settings!")
    }
}

//create settings
export const addSettings = async (req, res) => {
    let {auth, body} = req
    const settingsData = {
        ...body,
        allowed: [auth._id]
    }
    const settings = new CMS(settingsData)
    try{
        await settings.save()
        return res.status(200).json(settings)
    }catch(err){
        res.status(400).send("Couldn't Create Settings")
    }
}

//update settings
export const updateSettings = async (req, res) => {
    let {body, params} = req
    try{
        let settings = await CMS.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(settings)
    }catch(err){
        console.log(err)
        res.status(400).send("Settings Update Failed!")
    }
}

// export const updateBanner = async (req, res) => {
//     let {body, params} = req
//     try{
//         let settings = await CMS.findByIdAndUpdate(params.id, 
//             {
//                 homepage : {
//                     banner}
//             }, {new: true})
//     }
// }

export const getBanners = async (req, res) => {
    try{
        let banners = await Banner.find()
        .populate("location")
        .exec()
        if(!banners) return res.status(400).send("Banners not found!")
        let properties = await Property.find().select("nameLocation.address").exec()
        let newProps = properties.map((prp) => ({locality: prp.nameLocation.address.locality, state: prp.nameLocation.address.state}))
        let result = {banners, newProps}
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Settings!")
    }
}

export const addBanner = async (req, res) => {
    let {auth, body} = req
    const bannerData = {
        ...body,
        createdBy: auth._id
    }
    const banner = new Banner(bannerData)
    try{
        await banner.save()
        return res.status(200).json(banner)
    }catch(err){
        res.status(400).send("Couldn't Add Banner")
    }
}

export const updateBanner = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Banner.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Update Banner")
    }
}

export const deleteBanner = async (req, res) => {
    let {params} = req
    try{
        let deleted = await Banner.findByIdAndDelete(params.id)
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't Delete Banner")
    }
}