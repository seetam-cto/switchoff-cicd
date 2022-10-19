import PropertyType from "../models/proptype";
import Amenity from "../models/amenity"
import Experience from "../models/experience";

//property type
export const getPropertyTypes = async (req, res) => {
    try{
        let propTypes = await PropertyType.find().exec()
        if(!propTypes) return res.status(400).send("No Property Types Found!")
        res.status(200).json(propTypes)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in Fetching Property Types")
    }
} 

export const addPropertyType = async (req, res) => {
    let {auth, body} = req
    const propertyTypeData = {
        ...body,
        createdBy: auth._id
    }
    const propertyType = new PropertyType(propertyTypeData)
    try{
        await propertyType.save()
        return res.status(200).json(propertyType)
    }catch(err){
        res.status(400).send("Couldn't add Property Type!")
    }
}

export const updatePropertyType = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await PropertyType.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Type Update Failed!")
    }
}

//experience
export const getExperiences = async (req, res) => {
    try{
        let experiences = await Experience.find().exec()
        if(!experiences) return res.status(400).send("No Experiences Found!")
        res.status(200).json(experiences)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Experiences")
    }
} 

export const addExperience = async (req, res) => {
    let {auth, body} = req
    const experienceData = {
        ...body,
        createdBy: auth._id
    }
    const experience = new Experience(experienceData)
    try{
        await experience.save()
        return res.status(200).json(experience)
    }catch(err){
        res.status(400).send("Couldn't add Experience!")
    }
}

export const updateExperience = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Experience.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Experience Update Failed!")
    }
}


//amenities
export const getAmenities = async (req, res) => {
    try{
        let amenities = await Amenity.find().exec()
        if(!amenities) return res.status(400).send("No Amenities Found!")
        res.status(200).json(amenities)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Amenities")
    }
} 

export const addAmenity = async (req, res) => {
    let {auth, body} = req
    const amenityData = {
        ...body,
        createdBy: auth._id
    }
    const amenity = new Amenity(amenityData)
    try{
        await amenity.save()
        return res.status(200).json(amenity)
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            res.status(400).send("Amenity already Exists")
        }else{
            res.status(400).send("Couldn't add amenity!")
        }
    }
} 

export const updateAmenity = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Amenity.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Amenity Update Failed!")
    }
}