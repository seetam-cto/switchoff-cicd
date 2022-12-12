import mongoose from "mongoose"
const {Schema} = mongoose
import bcrypt from "bcrypt"

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required!'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        unique: true,
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    email_verified_at: {
        type: Date
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 64
    },
    phone_number: {
        type: String
    },
    description: {
        type: String,
        max: 100
    },
    profile_image: {
        type: String
    },
    passchange: {
        type: Boolean,
        default: false
    },
    passcode: {
        type: String,
    },
    user_type: {
        type: String
    },
    active : {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

userSchema.pre('save', function(next) {
    let user = this
    console.log("HASH UPDATE")
    if(user.isModified('password')){
        return bcrypt.hash(user.password, 12, function(err, hash){
            if(err){
                console.log("BCRYPT HASH ERR: ", err)
                return next(err)
            }
            user.password = hash
            return next()
        })
    } else if(user.isModified('passcode')){
        return bcrypt.hash(user.passcode, 12, function(err, hash){
            if(err){
                console.log("BCRYPT HASH ERR: ", err)
                return next(err)
            }
            user.passcode = hash
            return next()
        })
    } else {
        return next()
    }
    
})

userSchema.methods.comparePassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, match) {
        if(err){
            console.log('COMPARE PASSWORD ERROR', err)
            return next(err, false)
        }
        //if no error, we get null
        console.log("MATCH PASSWORD", match)
        return next(null, match)
    })
}

userSchema.methods.comparePasscode = function (passcode, next) {
    bcrypt.compare(passcode, this.passcode, function (err, match) {
        if(err){
            console.log('COMPARE PASSCODE ERROR', err)
            return next(err, false)
        }
        //if no error, we get null
        console.log("MATCH PASSCODE", match)
        return next(null, match)
    })
}

export default mongoose.model("User", userSchema)