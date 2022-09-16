import User from "../models/user"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    // console.log(req.body)
    const {name, email, password} = req.body
    //validation
    if(!email) return res.status(400).send('Email is required!')
    if(!password || password.length < 8) return res.status(400).send('Password is required and should be 8 characters long!')
    
    let userExists = await User.findOne({email: email})
    if(userExists) return res.status(400).send('Account already exists')

    //register
    const user = new User(req.body)
    try{
        await user.save()
        console.log('USER CREATED', user)
        return res.status(200).json({ok: true})
    }catch(err){
        console.log('CREATE USER FAILED: ', err)
        return res.status(400).send('Error. Try Again.')
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        //check if email exists
        let user = await User.findOne({email: email}).exec()
        // console.log('User Exists', user)
        if(!user) res.status(400).send(`User with email ${email} not found!`)
        // Compare password
        user.comparePassword(password, (err, match) => {
            console.log('COMPARE PASSWORD IN LOGIN ERR', err)
            if(!match || err) return res.status(400).send('Password doesn\'t match!')
            let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.status(200).json({ token, user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            } })
        })
        
    }catch(err){
        console.log('Login Error: ', err)
        res.status(400).send("Signin Failed!")
    }
}

//Password Management - Initiate Password Change Request
export const changePassword = async (req, res) => {
    // request for email otp
    res.status(200).send("You have received an OTP on email!")
}

//Password Management - Confirm Passcode
export const confirmPasscode = async (req, res) => {
    //code to compare and confirm passcode and return JWT\
    res.status(200).send("Passcode Confirmed!")
}

//Password Management - Update Password
export const updatePassword = async (req, res) => {
    res.status(200).send("Password Updated")
}

//User Profile Management - Update Profile
export const updateUser = async (req, res) => {
    res.status(200).send("User Updated")
}

//User Profile Management - Deactivate Profile
export const deactivateUser = async (req, res) => {
    res.status(200).send("User Deactivated")
}

//Premium Features - Verify Profile
export const verifyUser = async (req, res) => {
    res.status(200).send("User Deactivated")
}