import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const roomSchema = new Schema({
    title: String,
    about: String,
    area: String,
    view: String,
    beds: String,
    extraBed: Boolean,
    specialNote: String,
    amenities: [{
        type: ObjectId,
        ref: "Amenity"
    }],
    images: [{
        url: String,
        caption: String,
    }],
    policies: {
        cancellation: [{
            type: String
        }],
        refundable: {
            type: Boolean,
            default: true
        }
    },
    basePrice: {
        mrp: String,
        sale: String
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

roomSchema.index({date: 1, roomId: 1}, {unique: true})

export default mongoose.model("Room", roomSchema)