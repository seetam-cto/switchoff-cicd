import axios from "axios"

export const uploadMedia = async (token, data) => 
    await axios.post(`${process.env.REACT_APP_API}/media/upload`, data, {
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