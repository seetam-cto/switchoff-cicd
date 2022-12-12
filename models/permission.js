import mongoose from "mongoose"
const {Schema} = mongoose

const permissionSchema = new Schema({
    user_type: String,
    permissions: []
}, {timestamps: true})

export default mongoose.model("Permission", permissionSchema)