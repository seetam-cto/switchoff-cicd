import express from "express"
import { requireSignIn, allowedSettings } from "../middlewares"
import { getSettings, addSettings,updateSettings } from "../controllers/cms"

const router = express.Router()

//property
router.get("/settings", getSettings)
router.post("/settings/add", requireSignIn, addSettings)
router.put("/settings/update/:id", requireSignIn, allowedSettings, updateSettings)

module.exports = router