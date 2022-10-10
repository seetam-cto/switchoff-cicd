import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const amenitySchema = new Schema({
    title: {
        type: String
    },
    for: {
        type: String
    },
    exclusive: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String 
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

amenitySchema.index({name: 1, for: 1}, {unique: true})

export default mongoose.model("Amenity", amenitySchema)