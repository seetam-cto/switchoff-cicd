import Location from "../models/location";

export const getLocations = async (req, res) => {
    const location_type = req.params.type
    try{
        let locations = await Location.find({location_type: location_type}).exec()
        if(!locations) return res.status(400).send("No Locations Found!")
        res.status(200).json(locations)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Locations")
    }
} 

export const addLocation = async (req, res) => {
    let {auth, body} = req
    let {
        name, about,
        icon, cover_image,
        location_type, lat, lon
    } = body;
    const locData = {
        name,
        about,
        icon,
        cover_image,
        location_type,
        lat_lon: {
            lat: lat,
            lon: lon
        },
        createdBy: auth._id
    }
    const location = new Location(locData)
    try{
        await Location.bulkSave()
        return res.status(200).json(location)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't add Location!")
    }
} 

export const updateLocation = () => {
    return true
} 

export const deleteLocation = () => {
    return true
} 