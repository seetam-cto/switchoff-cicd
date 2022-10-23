import express from "express"
import { requireSignIn } from "../middlewares"
import { getLocations, getAllLocations, addLocation, updateLocation, deleteLocation } from "../controllers/locations"

const router = express.Router()

router.get("/locations/", getAllLocations)
router.get("/locations/:type", getLocations)
router.post("/locations/add", requireSignIn, addLocation)
router.put("/locations/update/:id", requireSignIn, updateLocation)
router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

module.exports = router