import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const roomSchema = new Schema({
    name: String,
    roomType: String,
    beds: {
        single: Number,
        double: Number,
        queen: Number,
        king: Number,
        bunk: Number,
        sofabed: Boolean,
        extra: Boolean
    },
    privateBathroom: Boolean,
    capacity: {
        type: Number,
        default: 3,
    },
    roomSize: String,
    amenities: [],
    images: [],
    basePrice: {
        mrp: Number,
        sale: Number
    },
    status: Number,
    wpId: {
        type: String
    },
    propertyId: {
        type: ObjectId,
        ref: "Property"
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

roomSchema.index({wpId: 1, propertyId: 1}, {unique: true})

export default mongoose.model("Room", roomSchema)