import express from "express"
import { requireSignIn, propertyOwner, roomOwner } from "../middlewares"
import { getProperties, addProperty, updateProperty, getProperty, getRooms, addRoom, updateRoom, getRoom } from "../controllers/property"

const router = express.Router()

//property
router.get("/properties", getProperties)
router.get("/property/:propertyId", getProperty)
router.post("/properties/add", requireSignIn, addProperty)
router.put("/properties/update/:id", requireSignIn, propertyOwner, updateProperty)

//rooms
router.get("/properties/:propertyId/rooms", getRooms)
router.get("/properties/rooms/:roomId", getRoom)
router.post("/properties/rooms/add", requireSignIn, addRoom)
router.put("/properties/rooms/update/:roomId", requireSignIn, roomOwner, updateRoom)

module.exports = router