import express from "express"
import { requireSignIn, propertyOwner } from "../middlewares"
import { getProperties, addProperty, updateProperty } from "../controllers/property"

const router = express.Router()

router.get("/properties", getProperties)
router.post("/properties/add", requireSignIn, addProperty)
router.put("/properties/update/:id", requireSignIn, propertyOwner, updateProperty)

module.exports = router