import axios from "axios"

//property type
export const getPropertyTypes = async () => 
    await axios.get(`${process.env.REACT_APP_API}/attributes/property-type`)

export const addPropertyType = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/attributes/property-type/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

//experience
export const getExperiences = async () => 
    await axios.get(`${process.env.REACT_APP_API}/attributes/experience`)

export const addExperience = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/attributes/experience/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

//amenities
export const getAmenities = async () => 
    await axios.get(`${process.env.REACT_APP_API}/attributes/amenity`)

export const addAmenity = async (token, data) =>
    await axios.post(`${process.env.REACT_APP_API}/attributes/amenity/add`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })