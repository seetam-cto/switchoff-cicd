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
        banner: [{
            background: String,
            card: String
        }],
        propCount: [Number],
        deals: {
            title: String,
            subTitle: String,
            list: [{
                    type: ObjectId,
                    ref: "Property"
                }],
            dealTitle: [String],
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
            }
        },
        advanceBooking: {
            title: String,
            subTitle: String,
            image: String,
            list: [{
                icon: String,
                title: String,
                subTitle: String
            }],
            link: String,
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
        questions: {
            title: String,
            subTitle: String,
            image: String,
            enabled: {
                type: Boolean,
                default: true
            }
        },
    },
    footer: {
        logo: String,
        quickLinks: [{
            link: String,
            text: String
        }]
    },
    allowed: [{
        type: ObjectId,
        ref: "User"
    }],
}, {timestamps: true})

export default mongoose.model("CMS", cmsSchema)