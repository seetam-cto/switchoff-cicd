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

export const updatePropertyType = async (token, data, id) =>
    await axios.put(`${process.env.REACT_APP_API}/attributes/property-type/update/${id}`, data, {
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

export const updateExperience = async (token, data, id) =>
    await axios.put(`${process.env.REACT_APP_API}/attributes/experience/update/${id}`, data, {
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

    export const updateAmenity = async (token, data, id) =>
    await axios.put(`${process.env.REACT_APP_API}/attributes/amenity/update/${id}`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const allAttributes = async () => {
    let propTypes = await getPropertyTypes()
    let exps = await getExperiences()
    let amens = await getAmenities()
    const counts = {
        propTypes: propTypes.data.length,
        experiences: exps.data.length,
        amenities: amens.data.length
    }
    return counts
}