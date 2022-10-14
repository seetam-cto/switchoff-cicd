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
                type: String
            },
            country: {
                type: String
            },
            state: {
                type: String
            },
            full_address: {
                type: String
            },
            pincode: String,
            map: {
                lat: String,
                lng: String
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
    gallery: {
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
        pets: Boolean,
        extra_charges: Number
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
    step: {
        type: Number
    },
    status: Boolean,
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

propertySchema.index({basic_info: 1}, {unique: true})

export default mongoose.model("Property", propertySchema)