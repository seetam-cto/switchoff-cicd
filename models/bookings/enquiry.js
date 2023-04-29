import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const enquirySchema = new Schema({
    property: {
        type: ObjectId,
        ref: "Property"
    },
    duration: {
        from: String,
        to: String,
    },
    guests: {
        name: String,
        phone: String,
        email: String,
        count: Number,
        child: Number,
        pets: {
            type: Boolean,
            default: false
        }
    },
    message: {
        type: String,
    },
    enquiredBy: {
        type: ObjectId,
        ref: "User"
    },
}, {timestamps: true})

export default mongoose.model("Enquiry", enquirySchema)