import mongoose from "mongoose"
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const calendarSchema = new Schema({
    date: {
      type: Date,
      required: "Date is required"
    },
    price: {
      mrp: String,
      sale: String
    },
    weekendPrice: {
      mrp: String,
      sale: String
    },
    specialDayPrice: {
      mrp: String,
      sale: String,
      dayNote: String,
    },
    roomId: {
      type: ObjectId,
      ref: "Room"
    },
    propertyId: {
        type: ObjectId,
        ref: "Property"
    },
    available: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: ObjectId,
      ref: "User"
    }
  }, { timestamps: true });
  
  calendarSchema.index({ date: 1, roomId: 1 }, { unique: true })
  
  export default mongoose.model("Calendar", calendarSchema)