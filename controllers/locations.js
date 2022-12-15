import Location from "../models/location"
import Property from "../models/property"

export const getAllLocations = async (req, res) => {
    try{
        let locations = await Location.find().exec()
        if(!locations) return res.status(400).send("No Locations Found!")
        res.status(200).json(locations)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Locations")
    }
} 

export const getAllPropertyLocations = async (req, res) => {
    let locType = req.params.ptype
    try{
        let properties = await Property.find()
        .select(`nameLocation.address.${locType}`)
        .exec()
        if(!properties) return res.status(400).send("No Locations Found!")
        let result = []
        if(locType === "locality"){
            result = properties.map((p) => p.nameLocation.address.locality)
        }else if(locType === "state"){
            result = properties.map((p) => p.nameLocation.address.state)
        }
        let sresult = new Set(result)
        res.status(200).json(sresult)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Locations")
    }
} 

export const getLocations = async (req, res) => {
    const location_type = req.params.type
    try{
        let locations = [];
        if(location_type === "state"){
            locations = await Location.find({location_type: location_type})
            .populate("parent")
            .exec()
        }else{
            locations = await Location.find({location_type: location_type}).exec()
        }
        if(!locations) return res.status(400).send("No Locations Found!")
        res.status(200).json(locations)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Locations")
    }
} 

export const addLocation = async (req, res) => {
    let {auth, body} = req
    console.log(body)
    const locData = {
        ...body,
        createdBy: auth._id
    }
    const location = new Location(locData)
    try{
        await location.save()
        return res.status(200).json(location)
    }catch(err){
        if(err.code == 11000){
            console.log(err)
            res.status(400).send("Country Already Exists")
        }else{
            console.log(err)
            res.status(400).send("Couldn't add Location!")
        }
    }
} 

export const updateLocation = () => {
    return true
} 

export const deleteLocation = () => {
    return true
} 