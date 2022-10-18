import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const policySchema = new Schema({
    policyType: {
        type: String,
        unique: true
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Policy", policySchema)