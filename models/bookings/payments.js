import mongoose from "mongoose";
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const paymentSchema = new Schema({
    paymentMethod: String,
    paymentDetails: {},
}, {timestamps: true})

export default mongoose.model("Payment", paymentSchema)