import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const amenitySchema = new Schema({
    title: {
        type: String
    },
    icon: {
        type: String 
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

amenitySchema.index({title: 1}, {unique: true})

export default mongoose.model("Amenity", amenitySchema)