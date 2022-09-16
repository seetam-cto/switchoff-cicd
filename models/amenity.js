import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const amenitySchema = new Schema({
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
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Amenity", amenitySchema)