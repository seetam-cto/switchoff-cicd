import express from "express"
import { requireSignIn } from "../middlewares"
import { 
    getPropertyTypes, addPropertyType, updatePropertyType,
    getAmenities, addAmenity, updateAmenity,
    getExperiences, addExperience, updateExperience, deletePropertyType, deleteExperience, getTags, addTag
} from "../controllers/attributes"

const router = express.Router()

//property type
router.get("/attributes/property-type", getPropertyTypes)
router.post("/attributes/property-type/add", requireSignIn, addPropertyType)
router.put("/attributes/property-type/update/:id", requireSignIn, updatePropertyType)
router.delete("/attributes/property-type/:id", requireSignIn, deletePropertyType)

//experiences
router.get("/attributes/experience", getExperiences)
router.post("/attributes/experience/add", requireSignIn, addExperience)
router.put("/attributes/experience/update/:id", requireSignIn, updateExperience)
router.delete("/attributes/experience/delete/:id", requireSignIn, deleteExperience)

//amenities
router.get("/attributes/amenity", getAmenities)
router.post("/attributes/amenity/add", requireSignIn, addAmenity)
router.put("/attributes/amenity/update/:id", requireSignIn, updateAmenity)
// router.delete("/locations/delete/:id", requireSignIn, deleteLocation)

//tags
router.get("/attributes/tags", getTags)
router.post("/attributes/tags/add", requireSignIn, addTag)

module.exports = router