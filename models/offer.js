import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const voucherSchema = new Schema({
    title: {
        type: String,
        required: 'Offer/Voucher Title is Required'
    },
    code: String,
    balance: {
        type: String,
        default: '1000'
    },
    validity: {
        from: Date,
        to: Date
    },
    isEnabled: {
        type: Boolean,
        default: true
    },
    usedBy: [{
        type: ObjectId,
        ref: "User"
    }],
    createdBy: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export default mongoose.model("Voucher", voucherSchema)