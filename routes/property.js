import express from "express"
import { requireSignIn, propertyOwner, roomOwner } from "../middlewares"
import {
    getProperties, addProperty, updateProperty,
    getProperty, getRooms, addRoom, updateRoom, 
    getRoom, deleteProperty, deleteRoom, 
    updatePropertyStatus, handleRoomPrice, getCalendar
} from "../controllers/property"

const router = express.Router()

//property
router.get("/properties", getProperties)
router.get("/property/:propertyId", getProperty)
router.post("/properties/add", requireSignIn, addProperty)
router.put("/properties/update/:id", requireSignIn, propertyOwner, updateProperty)
router.put("/properties/status/:id", requireSignIn, propertyOwner, updatePropertyStatus)
router.put('/properties/delete/:id', requireSignIn, propertyOwner, deleteProperty)

//rooms
router.get("/properties/:propertyId/rooms", getRooms)
router.get("/properties/rooms/:roomId", getRoom)
router.post("/properties/rooms/add", requireSignIn, addRoom)
router.put("/properties/rooms/update/:roomId", requireSignIn, roomOwner, updateRoom)
router.delete("/properties/rooms/delete/:roomId", requireSignIn, roomOwner, deleteRoom)
router.get("/properties/calendar/:roomId", getCalendar)
router.post("/properties/calendar/update/:roomId", requireSignIn, roomOwner, handleRoomPrice)

module.exports = router