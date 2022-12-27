import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const commentSchema = new Schema({
    parent: {
        type: ObjectId,
        ref: "Comment"
    },
    commentBy: {
        type: ObjectId,
        ref: "User"
    },
    blog: {
        type: ObjectId,
        ref: "Blog"
    },
    comment: String,
    likes: [],
}, {timestamps: true})

export default mongoose.model("Comment", commentSchema)