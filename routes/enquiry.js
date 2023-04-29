import express from "express"
import { requireSignIn, isAuthor } from "../middlewares"
import { addEnquiry, getAllEnquiries, getUserEnquiries } from "../controllers/enquiry"

//configure router
const router = express.Router()

//routes
router.get("/enquiry", requireSignIn, getAllEnquiries)
router.get("/user/enquiry", requireSignIn, getUserEnquiries)
router.post("/enquiry/add", requireSignIn, addEnquiry)

//export router
module.exports = router