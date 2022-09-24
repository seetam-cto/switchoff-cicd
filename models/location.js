import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const locationSchema = new Schema({
    name: {
        type: String
    },
    about: {
        type: String,
        maxlength: 200
    },
    icon: {
        type: ObjectId,
        ref: "Media"
    },
    cover_image: {
        type: ObjectId,
        ref: "Media"
    },
    parent: {
        type: ObjectId,
        ref: "Location"
    },
    location_type: {
        type: String,
        default: 'country'
    },
    lat_lon: {
        lat: String,
        lon: String
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Location", locationSchema)