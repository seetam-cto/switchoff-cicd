import express from "express"
import { requireSignIn, allowedSettings } from "../middlewares"
import { getSettings, addSettings,updateSettings, getBanners, addBanner, updateBanner, deleteBanner } from "../controllers/cms"

const router = express.Router()

//property
router.get("/settings", getSettings)
router.post("/settings/add", requireSignIn, addSettings)
router.put("/settings/update/:id", requireSignIn, allowedSettings, updateSettings)

//banners
router.get("/settings/banners", getBanners)
router.post("/settings/banners/add", requireSignIn, addBanner)
router.put("/settings/banners/update/:id", requireSignIn, updateBanner)
router.delete("/settings/banners/delete/:id", requireSignIn, deleteBanner)

module.exports = router