import axios from "axios"

export const login = async (user) => 
    await axios.post(`${process.env.REACT_APP_API}/login`, user)