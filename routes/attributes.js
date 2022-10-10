import express from "express"
import { requireSignIn } from "../middlewares"
import { 
    getPropertyTypes, addPropertyType,
    getAmenities, addAmenity, 
    getExperiences, addExperience,
} from "../controllers/attributes"

const router = express.Router()

//property type
router.get("/attributes/property-type", getPropertyTypes)
router.post("/attributes/property-type/add", requireSignIn, addPropertyType)
// router.put("/locations/update/:id", requireSignIn, updateLocation)
// router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

//experiences
router.get("/attributes/experience", getExperiences)
router.post("/attributes/experience/add", requireSignIn, addExperience)
// router.put("/locations/update/:id", requireSignIn, updateLocation)
// router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

//amenities
router.get("/attributes/amenity", getAmenities)
router.post("/attributes/amenity/add", requireSignIn, addAmenity)
// router.put("/locations/update/:id", requireSignIn, updateLocation)
// router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

module.exports = router