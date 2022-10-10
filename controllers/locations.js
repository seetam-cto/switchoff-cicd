import Location from "../models/location";

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
            res.status(400).send("Country Already Exists")
        }else{
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