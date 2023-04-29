import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const propertySchema = new Schema({
    nameLocation: {
        name: {
            type: String,
            required: "Name is required"
        },
        about: {
            type: String
        },
        propertyType: {
            type: ObjectId,
            ref: "PropertyType"
        },
        address: {
            fullAddress: String,
            state: String,
            country: String,
            pincode: String,
            locality: String,
            map: {
                lat: String,
                lng: String
            }
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    propertySetup: {
        amenities: [],
        xFactor: {
            type: String
        },
        rules: {
            breakfast: {
                type: Boolean,
                default: false
            },
            parking: {
                allowed: {
                    type: Boolean, 
                    default: false
                },
                private: {
                    type: Boolean, 
                    default: false
                },
                free: Boolean
            },
            events: {
                allowed: {
                    type: Boolean,
                    default: false
                }
            },
            checkin: {
                from: {type: Date, default: new Date()},
                to: {type: Date, default: new Date()}
            },
            checkout: {
                from: {type: Date, default: new Date()},
                to: {type: Date, default: new Date()}
            },
            smoking: {
                type: Boolean,
                default: false
            },
            children: {
                type: Boolean,
                default: false
            },
            pets: {
                allowed: {
                    type: Boolean, 
                    default: false
                },
                free: Boolean
            }
        },
        details: {
            area: String,
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    gallery: 
    {
        photos: [],
        status: {
            type: Boolean,
            default: false
        }
    },
    tags: {
        type: ObjectId,
        ref: "Tag"
    },
    pricingCalendar: {
        pricePerNight: {
            type: Number
        },
        policies: {
            all: [{
                policyType: String,
                policy: String,
            }],
            others: [{
                type: String
            }],
        },
        availability: {
            startfrom: Date,
            sync: {
                type: Boolean,
                default: true
            }
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    legal: {
        licence: {
            type: String
        },
        poc: {
            fullName: String,
            fullAddress: String,
            businessAddress: String,
            zip: String,
            city: String,
            Country: String,
            alias: String
        },
        gst: {
            tradeName: String,
            gstin: String,
            pan: String,
            verified: {
                type: Boolean,
                default: false
            }
        },
        status: {
            type: Boolean,
            default: false
        }
    },
    verified: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    status: String,
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

propertySchema.index({nameLocation : {name: 1, address: { map : { lat: 1, lng: 1}}}}, {unique: true})

export default mongoose.model("Property", propertySchema)