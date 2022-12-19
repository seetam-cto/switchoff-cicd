import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const homepageSettingsSchema = new Schema({
    deals: {
        title: String,
        subTitle: String, 
        list: [],
        enabled: {
            type: Boolean,
            default: true
        }
    },
    locations: {
        title: String,
        subTitle: String,
        enabled: {
            type: Boolean,
            default: true
        },
        list: [{
            type: ObjectId,
            ref: "Location"
        }]
    },
    locationProps: {
        title: String,
        subTitle: String,
        list: [],
        enabled: {
            type: Boolean,
            default: true
        }
    },
    reviews: {
        title: String,
        list: [],
        enabled: {
            type: Boolean,
            default: true
        }
    },
    popularDestination: {
        title: String,
        subTitle: String,
        list: [],
        enabled: {
            type: Boolean,
            default: true
        }
    },
    experiences: {
        title: String,
        subTitle: String,
        list: [{
            type: ObjectId,
            ref: "Experience"
        }]
    },
    partners: {
        title: String,
        list: []
    }
}, {timestamps: true})

export default mongoose.model("SettingHomepage", homepageSettingsSchema)