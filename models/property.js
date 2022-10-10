import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const propertySchema = new Schema({
    basic_info: {
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: 'Content is required!',
            maxlength: 10000
        },
        address: {
            region: {
                type: ObjectId,
                ref: "Location"
            },
            country: {
                type: ObjectId,
                ref: "Location"
            },
            state: {
                type: ObjectId,
                ref: "Location"
            },
            full_address: {
                type: String
            },
            pincode: String,
            map: {
                lat: String,
                lon: String
            }
        },
        property_type: {
            type: ObjectId,
            ref: "PropType"
        },
        experience_tags: [{
            type: ObjectId,
            ref: "Experience"
        }],
        poc_info: {
            name: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        },
    },
    amenities: [{
        type: ObjectId,
        ref: "Amenity"
    }],
    gallary: {
        cover_image: {
            type: String
        },
        images: [{
            type: String
        }],
        external_video: {
            type: String
        },
        videos: [{
            type: String
        }]
    },
    policies: {
        cancellation: [{
            type: String
        }],
        check_time: {
            check_in: String,
            check_out: String
        },
        extras: [{
            policy_name: String,
            charges: {
                type: String,
                default: 0
            }
        }],
    },
    documents: {
        gst_info: {
            gst_no: String,
            gst_proof: {
                type: String
            },
            verified: {
                type: Boolean,
                default: false
            }
        },
        poc_id: {
            id_type: String,
            id_no: String,
            id_proof: {
                type: String,
            },
            verified: {
                type: Boolean,
                default: false
            }
        },
        contract: {
            contract_id: String,
            contract_pdf: {
                type: String
            }
        },
        comment: String,
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Property", propertySchema)