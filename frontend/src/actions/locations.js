import axios from "axios"

export const getLocations = async (locType) => 
    await axios.get(`${process.env.REACT_APP_API}/locations/${locType}`)

export const addLocation = async (token, location) =>
    await axios.post(`${process.env.REACT_APP_API}/locations/add`, location, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })