import CMS from "../models/cms"
import Property from "../models/property"
import Banner from "../models/banner"
import SettingGeneral from "../models/settings/general"
import SettingHomepage from "../models/settings/homepage"
import SettingFooter from "../models/settings/footer"

//banners
export const getBanners = async (req, res) => {
    try{
        let banners = await Banner.find()
        .populate("location")
        .exec()
        if(!banners) return res.status(400).send("Banners not found!")
        let properties = await Property.find().select("nameLocation.address").exec()
        let propCount = properties.map((prp) => ({locality: prp.nameLocation.address.locality, state: prp.nameLocation.address.state}))
        let result = {banners, propCount}
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
        location: body.location ? body.location : null,
        createdBy: auth._id
    }
    const banner = new Banner(bannerData)
    try{
        await banner.save()
        return res.status(200).json(banner)
    }catch(err){
        console.log(err)
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

//general settings
export const getSettings = async (req, res) => {
    let {params} = req
    try{
        let result = null;
        switch(params.type){
            case "general":
                result = await SettingGeneral.find().limit(1);
                if(!result) return res.status(400).send("General Setting not found!")
                break;
            case "homepage":
                result = await SettingHomepage.find().limit(1);
                if(!result) return res.status(400).send("Homepage Setting not found!")
                break;
            case "footer":
                result = await SettingFooter.find().limit(1);
                if(!result) return res.status(400).send("Footer Setting not found!");
                break;
            case "all":
                let general = await SettingGeneral.find().limit(1)
                let homepage = await SettingHomepage.find().limit(1)
                let footer = await SettingFooter.find().limit(1)
                result = {general, homepage, footer}
                if(!result) return res.status(400).send("Settings not found!")
                break;
        }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(400).send("Error Fetching Settings")
    }
}

export const addSettings = async (req, res) => {
    let {params, body} = req
    try{
        switch(params.type){
            case "general":
                const general = new SettingGeneral(body)
                await general.save()
                return res.status(200).json(general)
            case "homepage":
                const homepage = new SettingHomepage(body)
                await homepage.save()
                return res.status(200).json(homepage)
            case "footer":
                const footer = new SettingFooter(body)
                await footer.save()
                return res.status(200).json(footer)
            default:
                return res.status(400).send("No Proper Setting Type Defined!")
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Error Adding Settings")
    }
}

export const updateSettings = async (req, res) => {
    let {params, body} = req
    try{
        switch(params.type){
            case "general":
                let general = await SettingGeneral.findByIdAndUpdate(params.id, body, {new: true})
                return res.status(200).json(general)
            case "homepage":
                let homepage = await SettingHomepage.findByIdAndUpdate(params.id, body, {new: true})
                return res.status(200).json(homepage)
            case "footer":
                let footer = await SettingFooter.findByIdAndUpdate(params.id, body, {new: true})
                return res.status(200).json(footer)
            default:
                return res.status(400).send("No Proper Setting Type Defined!")
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Error Updating Settings")
    }
}