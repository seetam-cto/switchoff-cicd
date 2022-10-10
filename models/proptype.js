import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const propertyTypeSchema = new Schema({
    title: {
        type: String,
        required: 'Property Type is required!'
    },
    icon: String,
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
    active: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

export default mongoose.model("PropertyType", propertyTypeSchema)