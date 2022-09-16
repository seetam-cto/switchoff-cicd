import mongoose from "mongoose"
const {Schema} = mongoose

const permissionSchema = new Schema({
    user_type: {
        type: String
    },
    permissions: {
        user: {
            type: Boolean,
            default: false
        }
    }
}, {timestamps: true})

export default mongoose.model("Permission", permissionSchema)