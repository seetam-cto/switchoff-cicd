import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const roomSchema = new Schema({
    title: String,
    roomNo: String,
    roomtype: String,
    about: String,
    area: String,
    view: String,
    beds: {
        single: Number,
        double: Number,
        queen: Number,
        king: Number,
        bunk: Number,
        sofa: Number
    },
    capacity: {
        type: Number,
        default: 3,
    },
    extraBed: Boolean,
    specialNote: String,
    bathroom: {
        private: Boolean,
        items: [{
            type: String
        }]
    },
    amenities: [{
        category: String,
        title: String
    }],
    images: [{
        url: String,
        caption: String,
    }],
    policies: {
        cancellation: [{
            type: String
        }],
        refund: {
            type: String
        }
    },
    basePrice: {
        mrp: Number,
        sale: Number
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

roomSchema.index({roomNo: 1, propertyId: 1}, {unique: true})

export default mongoose.model("Room", roomSchema)