import Property from "../models/property"
import Room from "../models/room"
import Calender from "../models/calender"
import Tag from "../models/tag"
import User from "../models/user"
import Manager from "../models/manager"
// import fetch from "node-fetch";
// import algoliasearch from "algoliasearch"

export const getProperties = async (req, res) => {
    try{
        let properties = await Property.find({deleted: false})
        .populate("tags")
        .populate("createdBy", "_id name email createdAt updatedAt")
        .exec();
        if(!properties) return res.status(400).send("No Properties Found!")
        res.status(200).json(properties)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Properties")
    }
}

export const getTrashProperties = async (req, res) => {
    try{
        let properties = await Property.find({deleted: true})
        .populate("tags")
        .populate("createdBy", "_id name email createdAt updatedAt")
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

export const deletePropertyFinal = async (req, res) => {
    let {params} = req
    try{
        let deleted = await Property.findByIdAndDelete(params.id)
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Delete Failed!")
    }
}

export const restoreProperty = async (req, res) => {
    let {params} = req
    try{
        let restored = await Property.findByIdAndUpdate(params.id, {deleted: false}, {new: true})
        res.status(200).json(restored)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Restore Failed!")
    }
}

//rooms
export const getRooms = async (req, res) => {
    try{
        let rooms = await Room.find({propertyId: req.params.propertyId, status: {$gt : -2}})
        .populate("propertyId")
        .populate("createdBy", "_id name email createdAt updatedAt")
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
                    .populate("createdBy", "_id name email createdAt updatedAt")
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

export const addTag = async (req, res) => {
    let {auth, body} = req
    const tagData = {
        ...body,
        createdBy: auth._id
    }
    const tag = new Tag(tagData)
    try{
        await tag.save()
        return res.status(200).json(tag)
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            res.status(400).send("Tag Already Exists")
        }else{
            res.status(400).send("Couldn't add Tag!")
        }
    }
}

export const enquire = async (req, res) => {
    
}

export const rate = async (req, res) => {
    let {params, auth} = req
    try{
        let property = await Property.findById(params.id)
        let prevRatings = property.rating.length > 0 ? property.rating : []
        if(prevRatings.filter((pr) => pr.createdBy === auth._id)) return res.status(400).send("Rating Exists!")
        let updated = await Property.findByIdAndUpdate(params.id, {
            rating: [prevRatings, {by: auth._id, rate: params.rate}]
        }, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Rate Property Failed!")
    }
}

export const handleFavourites = async (req, res) => {
    let {body, auth} = req
    try{
        let updated = await User.findByIdAndUpdate(auth._id, {favourites: body.list}, {new: true})
        res.status(200).json(updated.favourites)
    }catch(err){
        console.log(err)
        res.status(400).send("Cannot Update favourites List!")
    }
}

export const updateHoteId = async (req, res) => {
    let {params, body} = req
    try{
        let updated = await Property.findByIdAndUpdate(params.id, {hotelId: body.summary.id, hotelData: body}, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Cannot Update Hotel ID!")
    }
}

export const updateTripAdId = async (req, res) => {
    let {params, body} = req
    try{
        let updated = await Property.findByIdAndUpdate(params.id, {tripAdId: body.tripid}, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Cannot Update Trip Advisor ID!")
    }
}

export const addManager = async (req, res) => {
    let {auth, body} = req
    const managerData = {
        ...body,
        createdBy: auth._id
    }
    const manager = new Manager(managerData)
    try{
        await manager.save()
        return res.status(200).json(manager)
    }catch(err){
        console.log(err)
        res.status(400).send("Couldn't add Tag!")
    }
}

export const getManager = async (req, res) => {
    try{
        let managers;
        if(req.params.property == "all"){
            managers = await Manager.find()
            .populate("current_manager", "_id name")
            .populate("property", "_id nameLocation.name")
            .exec();
        }else{
            managers = await Manager.find({property: req.params.property}).exec();
        }
        if(!managers) return res.status(400).send("Managers Not Found!")
        res.status(200).json(managers)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Managers")
    }
}

export const updateManager = async (req, res) => {
    let {body, params} = req
    try{
        let updated = await Manager.findByIdAndUpdate(params.managerId, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Manager update Failed!")
    }
}

export const deleteManager = async (req, res) => {
    let {params} = req
    try{
        let deleted = await Manager.findByIdAndUpdate(params.managerId, {active: false}, {new: true})
        res.status(200).json(deleted)
    }catch(err){
        console.log(err)
        res.status(400).send("Manager Delete Failed!")
    }
}

// export const algoliaIndexing = async (req, res) => {
//     const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY)
//     const index = client.initIndex('switchoff')
//     try{
//         let properties = await Property.find({deleted: false})
//         .populate("tags")
//         .exec();
//         const objects = properties.map((p) => {return {
//             objectId: p._id,
//             name: p.nameLocation.name,
//             about: p.nameLocation.about,
//             address: p.nameLocation.address.fullAddress,
//             tags: p.tags && p.tags.length > 0 ? p.tags.map((t) => t.tag).join(" ") : '',
//             feature: p.nameLocation.xFactor,
//             budget: `budget under ${Math.round(p.pricingCalendar.pricePerNight/1000)*1000}`
//         }})
//         index.saveObjects(objects)
//         .then(({ objectIDs }) => {
//             console.log(objectIDs);
//         }).catch((err) => console.log(err))
//     }catch(err){
//         console.log(err)
//         res.status(400).send("Algolia: Indexing Failed!")
//     }
// }