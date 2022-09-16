import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const propertySchema = new Schema({
    title: {
        type: String,
        require: "Title is required!"
    },
    content: {
        type: String,
        required: 'Content is required!',
        maxlength: 10000
    },
    country: {
        type: ObjectId,
        ref: "Location"
    },
    state: {
        type: ObjectId,
        ref: "Location"
    },
    city: {
        type: ObjectId,
        ref: "Location"
    },
    price: {
        type: Number,
        required: 'Price is required',
        trim: true
    },
    image: {
        type: Array
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
})

export default mongoose.model("Property", propertySchema)