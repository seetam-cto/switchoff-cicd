import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const blogSchema = new Schema({
    title: String,
    slug: {
        type: String,
        unique: true
    },
    content: [{
        version: Number,
        data: {},
        editedOn: Date,
    }],
    seo: {
        description: String,
        tags: [],
        cover: String,
    },
    properties: [{
        type: ObjectId,
        ref: "Property"
    }],
    experiences: [{
        type: ObjectId,
        ref: "Experience"
    }],
    published: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Blog", blogSchema)