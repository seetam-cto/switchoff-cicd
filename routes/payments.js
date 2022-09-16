import express from "express"
import { initPayment, getPaymentStatus, confirmPayment } from "../controllers/payments"
import { requireSignIn } from "../middlewares"

const router = express.Router()

router.post("/payments/initiate", requireSignIn, initPayment)
router.get("/payments/status/:id", requireSignIn, getPaymentStatus)
router.post("/payments/confirm/:id", requireSignIn, confirmPayment)

module.exports = router