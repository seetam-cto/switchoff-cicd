import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const bannerSchema = new Schema({
    title: String,
    subTitle: String,
    background: String,
    card: String,
    link: String,
    location: {
        type: ObjectId,
        ref: "Location"
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Banner", bannerSchema)