import axios from "axios"

export const uploadMedia = async (token, data) => 
    await axios.post(`${process.env.REACT_APP_API}/media/upload`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const uploadMediaToProperty = async (token, data, id) => 
    await axios.post(`${process.env.REACT_APP_API}/media/${id}/upload`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getMedia = async (token) =>
    await axios.get(`${process.env.REACT_APP_API}/media`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getSpecificMedia = async (token, property) =>
    await axios.get(`${process.env.REACT_APP_API}/media/property/${property}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
