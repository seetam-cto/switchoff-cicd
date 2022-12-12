import Property from "../models/property"
import Room from "../models/room";
import Calender from "../models/calender";

export const getProperties = async (req, res) => {
    try{
        let properties = await Property.find({deleted: false})
        .populate("createdBy")
        .exec();
        if(!properties) return res.status(400).send("No Properties Found!")
        res.status(200).json(properties)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Properties")
    }
}

export const getProperty = async (req, res) => {
    try{
        let properties = await Property.findById(req.params.propertyId).exec();
        if(!properties) return res.status(400).send("No Properties Found!")
        res.status(200).json(properties)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Property details")
    }
}

export const addProperty = async (req, res) => {
    let {auth, body} = req
    console.log(body)
    const propData = {
        ...body,
        createdBy: auth._id
    }
    const property = new Property(propData)

    try{
        await property.save()
        return res.status(200).json(property)
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            res.status(400).send("Property Already Exists")
        }else{
            res.status(400).send("Couldn't add Property!")
        }
    }
}

export const updateProperty = async (req, res) => {
    let {body, params} = req
    console.log(body)
    try{
        let updated = await Property.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Update Failed!")
    }
}

export const updatePropertyStatus = async (req, res) => {
    let {body, params} = req
    console.log(body)
    try{
        await Property.findByIdAndUpdate(params.id, {status: body.status}, {new: true})
        res.status(200).send("Property Status Updated")
    }catch(err){
        console.log(err)
        res.status(400).send("Property Status Update Failed!")
    }
}

export const deleteProperty = async (req, res) => {
    let {params} = req
    try{
        let deleted = await Property.findByIdAndUpdate(params.id, {deleted: true}, {new: true})
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Delete Failed!")
    }
}

//rooms
export const getRooms = async (req, res) => {
    try{
        let rooms = await Room.find({propertyId: req.params.propertyId, status: {$gt : -2}})
        .populate("propertyId")
        .populate("createdBy")
        .exec();
        if(!rooms) return res.status(400).send("No Rooms Found!")
        res.status(200).json(rooms)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Rooms")
    }
}

export const getRoom = async (req, res) => {
    try{
        let room = await Room.findById(req.params.roomId)
                    .populate("propertyId")
                    .populate("createdBy")
                    .exec();
        if(!room) return res.status(400).send("Room Details Found!")
        res.status(200).json(room)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Room Details")
    }
}


export const addRoom = async (req, res) => {
    let {auth, body} = req
    console.log(body)
    const roomData = {
        ...body,
        createdBy: auth._id
    }
    const room = new Room(roomData)
    try{
        await room.save()
        return res.status(200).json(room)
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            res.status(400).send("Room Already Exists")
        }else{
            res.status(400).send("Couldn't add Room!")
        }
    }
}
export const updateRoom = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Room.findByIdAndUpdate(params.roomId, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Room Update Failed!")
    }
}

export const deleteRoom = async (req, res) => {
    let {params} = req
    try{
        let updated = await Room.findByIdAndUpdate(params.roomId, {status: -2}, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Room Update Failed!")
    }
}

export const getCalendar = async (req, res) => {
    try{
        let calendar = await Calender.find({roomId: req.params.roomId}).exec()
        if(!calendar) return res.status(400).send("Create Calendar")
        res.status(200).json(calendar)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in fetching Calendar")
    }
}

export const handleRoomPrice = async (req, res) => {
    let {auth, body} = req
    console.log(body, req.params.roomId)
    let exists = await Calender.findOne({date: body.date, roomId: req.params.roomId}).exec()
    if(exists){
        try{
            let updated = await Calender.findByIdAndUpdate(exists._id, body, {new: true})
            res.status(200).json(updated)
        }catch(err){
            console.log(err)
            res.status(400).send("Price Update Failed!")
        }
    }else{
        const calendarData = {
            ...body,
            roomId: req.params.roomId,
            createdBy: auth._id
        }
        const calendar = new Calender(calendarData)
        try{
            await calendar.save()
            return res.status(200).json(calendar)
        }catch(err){
            console.log(err)
            if(err.code == 11000){
                res.status(400).send
            }
        }
    }
}