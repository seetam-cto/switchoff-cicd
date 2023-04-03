import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const calendarSchema = new Schema({
    date: {
        type: Date,
        required: "Date is required"
    },
    price: {
        mrp: String,
        sale: String
    },
    roomId: {
        type: ObjectId,
        ref: "Room"
    },
    available: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

calendarSchema.index({date: 1, roomId: 1}, {unique: true})

export default mongoose.model("Calendar", calendarSchema)