import mongoose, { mongo } from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const channelManagerSchema = new Schema({
    poc: {
        type: ObjectId,
        ref: "User"
    },
    company: {
        type: String
    },
    planSelected: {
        type: String,
        default: 'default'
    },
    accessKey: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    },
},{timestamps: true})

channelManagerSchema.index(
    { poc: 1, company: 1, start: 1, end: 1 },
    { unique: true }
);

export default mongoose.model("ChannelManager", channelManagerSchema)