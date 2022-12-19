import PropertyType from "../models/proptype";
import Amenity from "../models/amenity"
import Experience from "../models/experience";
import CMS from "../models/cms";

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
        let propTypes = await PropertyType.find().exec()
        if(!propTypes) return res.status(400).send("No Property Types Found!")
        res.status(200).json(propTypes)
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

export const deletePropertyType = async (req, res) => {
    let {params} = req
    try{
        await PropertyType.findByIdAndUpdate(params.id, {active: false}, {new: true})
        let propTypes = await PropertyType.find().exec()
        if(!propTypes) return res.status(400).send("No Property Types Found!")
        res.status(200).json(propTypes)
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

export const deleteExperience = async (req, res) => {
    let {params} = req
    try{
        let settings = await CMS.find().exec()
        if(settings[0].homepage.experiences.list.includes(params.id)){
            res.status(400).send("Experience is in use. Can't be deleted! Please check for uses!")
        }else{
            let deleted = await Experience.findByIdAndDelete(params.id)
            res.status(200).json(deleted)
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Experience Delete Failed!")
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