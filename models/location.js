import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const locationSchema = new Schema({
    name: {
        type: String,
    },
    about: {
        type: String,
        maxlength: 500
    },
    cover_image: {
        type: String
    },
    lat_lng: {
        lat: String,
        lng: String
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

locationSchema.index({name: 1, lat_lon: {lat: 1, lon: 1}}, {unique: true})

export default mongoose.model("Location", locationSchema)