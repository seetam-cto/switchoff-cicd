import mongoose from "mongoose"
const {Schema} = mongoose

const locationSchema = new Schema({
    name: {
        type: String
    },
    about: {
        type: String,
        maxlength: 200
    },
    icon: {
        type: String
    },
    cover_image: {
        type: String
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