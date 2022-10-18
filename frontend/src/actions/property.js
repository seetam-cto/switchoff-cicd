import axios from "axios"


export const getProperties = async () => 
    await axios.get(`${process.env.REACT_APP_API}/properties`)

export const getProperty = async (id) => 
    await axios.get(`${process.env.REACT_APP_API}/property/${id}`)

export const addProperty = async (token, property) =>
    await axios.post(`${process.env.REACT_APP_API}/properties/add`, property, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const updateProperty = async (token, property, id) =>
    await axios.put(`${process.env.REACT_APP_API}/properties/update/${id}`, property, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })