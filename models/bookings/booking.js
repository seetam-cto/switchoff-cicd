import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const bookingSchema = new Schema({
    roomId: {
        type: ObjectId,
        ref: "Room"
    },
    checkin: {
        type: Date,
        required: "Date is required"
    },
    checkout: {
        type: Date,
        required: "Date is required"
    },
    bookedBy: {
        type: ObjectId,
        ref: "user"
    },
    bookedOn: {
        type: Date,
        required: "Date is required"
    },
    paymentStatus: {
        type: String,
        default: "Pending"
    },
    bookingStatus: {
        type: String,
        default: "Pending"
    },
    paymentID: {
        type: ObjectId,
        ref: "Payment"
    },
}, {timestamps: true})

bookingSchema.index({bookedBy: 1, bookedFor: 1}, {unique: true})

export default mongoose.model("Booking", bookingSchema)