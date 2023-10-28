import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const managerSchema = new Schema({
    properties: [{
        type: ObjectId,
        ref: "Property"
    }],
    current_manager: {
        type: ObjectId,
        ref: "User",
        unique: true
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

managerSchema.index({ current_manager: 1}, { unique: true });

export default mongoose.model("Manager", managerSchema)