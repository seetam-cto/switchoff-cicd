import mongoose from "mongoose";
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const paymentConfigSchema = new Schema({
    stripe: {
        apiKey: String,
        active: {
            type: Boolean,
            default: false
        }
    },
    ccavenue: {
        merchantId: String,
        workingKey: String,
        active: {
            type: Boolean,
            default: false
        }
    },
    razorpay: {
        secret: String,
        keyId: String,
        active: {
            type: Boolean,
            default: false
        }
    }
}, {timestamps: true})

export default mongoose.model("PaymentConfig", paymentConfigSchema)