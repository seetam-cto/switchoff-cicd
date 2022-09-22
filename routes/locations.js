import express from "express"
import { requireSignIn } from "../middlewares"
import { getLocations, addLocation, updateLocation, deleteLocation } from "../controllers/locations"

const router = express.Router()

router.get("/locations", getLocations)
router.post("/locations/add", requireSignIn, addLocation)
router.put("/locations/update/:id", requireSignIn, updateLocation)
router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

module.exports = router