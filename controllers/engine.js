import Property from "../models/property"
import Room from "../models/room"
import Calender from "../models/calender"
import ChannelManager from "../models/channelmanager"

const createResponse = (status, message, data = {}) => {
    return {
        status,
        message,
        ...data
    }
}

export const getChannelManagers = async (req, res) => {
    try{
        let results = await ChannelManager.find().exec()
        if(!results) res.status(400).json(createResponse("Failure","No Channel Managers Found"))
        return res.status(200).json(createResponse("Success","",{
            channelManagers: results
        }))
    }catch(err){
        return res.status(400).json(createResponse("Failure", "Error in Fetching Channel Managers"))
    }
}

export const addChannelManager = async (req, res) => {
    let {auth, body} = req

    let token = jwt.sign(body, process.env.JWT_SECRET, {
        expiresIn: body.planSelected == "Year" ? '365d' : '1000000d'
    })
    
    let preData = {
        ...body,
        accessKey: token,
        start: new Date().getTime(),
        end: new Date().setFullYear(new Date().getFullYear() + 1),
        createdBy: auth._id
    }

    const channelManager = new ChannelManager(preData)

    try{
        await channelManager.save()
        return res.status(200).json(createResponse("Success","Channel Manager Added"))
    }catch(err){
        return res.status(400).json(createResponse("Failure","Error Adding Channel Manager"))
    }

}

export const fetchInventory = async (req, res) => {
    let {body} = req
    try{
        var query = {
            date: {
                $gte: body.startDate, 
                $lte: body.endDate
            }, 
            propertyId: body.propertyId,
            roomId: body.roomId
        }

        let calendar = await Calender.find(query)
        .select("-createdBy")
        .exec()
        if(!calendar) return res.status(400).json({
            status: "Failure",
            message: "No Inventory Found!"
        })

        const response = {
            status: "Success",
            message: "",
            propertyId: body.propertyId,
            roomId: body.roomId,
            availability: calendar.map((result) => ({
                available: result.available,
                date: result.date
            }))
        }

        return res.status(200).json(response)

    }catch(err){
        const response = {
            status: "Failure",
            message: "Error in Fetching Inventory"
        }
        console.log(err)
        return res.status(400).json(response);
    }
}