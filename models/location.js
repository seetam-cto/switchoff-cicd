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
    icon: {
        type: String
    },
    cover_image: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: "Location"
    },
    location_type: {
        type: String,
        default: 'country'
    },
    code: {
        type: String,
    },
    isd: {
        type: String
    },
    cur: {
        type: String,
    },
    cur_symbol: {
        type: String
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

locationSchema.index({name: 1, lat_lon: {lat: 1, lon: 1}}, {unique: true})

export default mongoose.model("Location", locationSchema)