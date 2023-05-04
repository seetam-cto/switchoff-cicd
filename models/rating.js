import mongoose from "mongoose";
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const ratingSchema = new Schema({
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
    property: {
        type: ObjectId,
        ref: "Property"
    },
    rating: {
        type: Number,
        max: 5,
        min: 1,
        require: "Rating is required"
    }
}, {timestamps: true})

ratingSchema.index({createdBy: 1, property: 1}, {unique: true})

export default mongoose.model("Rating", ratingSchema)