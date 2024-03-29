import express from "express"
import { requireSignIn, propertyOwner, roomOwner, isAdmin } from "../middlewares"
import {
    getProperties, addProperty, updateProperty,
    getProperty, getRooms, addRoom, updateRoom,
    getRoom, deleteProperty, deleteRoom,
    updatePropertyStatus, handleRoomPrice, getCalendar, rate, 
    handleFavourites, getTrashProperties, restoreProperty, 
    deletePropertyFinal, updateHoteId, updateTripAdId, addManager, getManager, updateManager, deleteManager, getPropertyNames, getManagerProperties
} from "../controllers/property"

const router = express.Router()

//manager
router.get("/properties/managers/:property", requireSignIn, isAdmin, getManager)
router.post("/properties/managers", requireSignIn, isAdmin, addManager)
router.put("/properties/managers/:managerId", requireSignIn, isAdmin, updateManager)
router.delete("/properties/managers/:managerId", requireSignIn, isAdmin, deleteManager)

//property
router.get("/properties", getProperties)
router.get("/properties/managed/:managerId/:status", getManagerProperties)
router.get("/properties/names", getPropertyNames)
router.get("/properties/trashed", getTrashProperties)
router.get("/property/:propertyId", getProperty)
router.post("/properties/add", requireSignIn, addProperty)
router.put("/properties/update/:id", requireSignIn, propertyOwner, updateProperty)
router.put("/properties/status/:id", requireSignIn, propertyOwner, updatePropertyStatus)
router.put('/properties/delete/:id', requireSignIn, propertyOwner, deleteProperty)
router.put('/properties/deletefinal/:id', requireSignIn, propertyOwner, deletePropertyFinal)
router.put('/properties/restore/:id', requireSignIn, propertyOwner, restoreProperty)
router.post('/properties/rating/:id/:rate', requireSignIn, rate)
router.post('/properties/favourites', requireSignIn, handleFavourites)
// router.get('/properties/algolia/index', requireSignIn, algoliaIndexing)
router.post('/properties/hotels/:id', requireSignIn, updateHoteId)
router.post('/properties/tripad/:id', requireSignIn, updateTripAdId)

//rooms
router.get("/properties/:propertyId/rooms", getRooms)
router.get("/properties/rooms/:roomId", getRoom)
router.post("/properties/rooms/add", requireSignIn, addRoom)
router.put("/properties/rooms/update/:roomId", requireSignIn, roomOwner, updateRoom)
router.delete("/properties/rooms/delete/:roomId", requireSignIn, roomOwner, deleteRoom)
router.get("/properties/calendar/:roomId", getCalendar)
router.post("/properties/calendar/update/:roomId", requireSignIn, roomOwner, handleRoomPrice)

module.exports = router