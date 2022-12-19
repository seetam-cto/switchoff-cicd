import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const cmsSchema = new Schema({
    general: {
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
    },
    homepage: {
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
    },
    footer: {
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
        },
    },
    allowed: [{
        type: ObjectId,
        ref: "User"
    }],
}, {timestamps: true})

export default mongoose.model("CMS", cmsSchema)