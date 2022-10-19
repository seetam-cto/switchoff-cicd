import CMS from "../models/cms"

//get settings
export const getSettings = async (req, res) => {
    try{
        let settings = await CMS.find().exec()
        if(!settings) return res.status(400).send("Settings not found!")
        res.status(200).json(settings)
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