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
        res.status(200).json(result)
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
            res.status(400).send("Location Already Exists")
        }else{
            console.log(err)
            res.status(400).send("Couldn't add Location!")
        }
    }
} 

export const updateLocation = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Location.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Location Update Failed!")
    }
} 

export const deleteLocation = async(req, res) => {
    try{
        let deleted = await Location.findByIdAndDelete(req.params.id)
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
        res.status(400).send("Location Deleted!")
    }
} 