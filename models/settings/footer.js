import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const footerSettingsSchema = new Schema({
    logo: String,
    link1: {
        title: String,
        list: []
    },
    link2: {
        title: String,
        list: []
    },
    link3: {
        title: String,
        list: []
    }
}, {timestamps: true})

export default mongoose.model("SettingFooter", footerSettingsSchema)