import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const generalSettingsSchema = new Schema({
    logo: String,
    menu: [{
        title: String,
        url: String,
        submenu: [{
            title: String,
            url: String
        }]
    }],
    colours: {
        primary: String,
        secondary: String,
        accent: String,
        text: String
    },
    social: {
        facebook: String,
        instagram: String,
        twitter: String,
        youtube: String,
        koo: String,
        linkedIn: String,
        tripadvisor: String
    },
    contact: {
        email: String,
        phone: String
    }
}, {timestamps: true})

export default mongoose.model("SettingGeneral", generalSettingsSchema)