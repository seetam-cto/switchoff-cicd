import express from "express"
import { requireSignIn, isAdmin } from "../middlewares"
import { 
    getSettings, addSettings,updateSettings,
    getBanners, addBanner, updateBanner, deleteBanner
} from "../controllers/cms"

const router = express.Router()

//property
router.get("/settings/:type", getSettings)
router.post("/settings/add/:type", requireSignIn, isAdmin, addSettings)
router.put("/settings/update/:type/:id", requireSignIn, isAdmin, updateSettings)

//banners
router.get("/banners", getBanners)
router.post("/banners/add", requireSignIn, addBanner)
router.put("/banners/update/:id", requireSignIn, updateBanner)
router.delete("/banners/delete/:id", requireSignIn, deleteBanner)

module.exports = router