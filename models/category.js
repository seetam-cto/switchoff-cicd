import mongoose from "mongoose"
const {Schema} = mongoose

const categorySchema = new Schema({
    name: {
        type: String
    },
    about: {
        type: String,
        maxlength: 300
    },
    icon: {
        type: String
    },
    cover_image: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model("Category", categorySchema)