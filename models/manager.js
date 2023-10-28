import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const managerSchema = new Schema({
    property: {
        type: ObjectId,
        ref: "Property"
    },
    current_manager: {
        type: ObjectId,
        ref: "User"
    },
    past_managers: [{
        type: ObjectId,
        ref: "User"
    }],
    designation: {
        type: String
    },
    access: [String],
    active: {
        type: Boolean,
        default: true
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Manager", managerSchema)