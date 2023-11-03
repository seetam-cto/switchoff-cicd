import mongoose from "mongoose";
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const channelManagerLogSchema = new Schema({
    channelManagerId: {
        type: ObjectId,
        ref: "ChannelManager"
    },
    accessType: {
        type: String
    },
    underPlan: {
        type: String
    },
    apiEndPoint: {
        type: String
    },
    headers: {
        type: Schema.Types.Mixed
    },
    log: {
        type: Schema.Types.Mixed
    }
},{timestamps: true})

export default mongoose.model("ChannelManagerLog", channelManagerLogSchema)

