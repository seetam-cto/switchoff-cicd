import mongoose from "mongoose";
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const plannerSchema = new Schema({
    questions: []
}, {timestamps: true})

export default mongoose.model("Planner", plannerSchema)