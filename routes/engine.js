import express from "express"
import { requireSignIn } from "../middlewares"
import { fetchInventory } from "../controllers/engine"

const router = express.Router()

//POST ENDPOINTS

//Fetch Inventory
router.post("/engine/inventory", fetchInventory)

module.exports = router