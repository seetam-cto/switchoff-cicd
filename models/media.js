import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const mediaSchema = new Schema({
    title: {
        type: String,
        required: 'Media Title is Required'
    },
    alt: {
        type: String,
    },
    url: {
        type: String,
        require: 'Media URL is required'
    },
    media_type: {
        type: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Media", mediaSchema)