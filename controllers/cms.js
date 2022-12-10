import CMS from "../models/cms"
import Property from "../models/property"

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