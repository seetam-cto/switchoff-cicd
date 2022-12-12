import User from "../models/user"
import jwt from "jsonwebtoken"
const sgMail = require('@sendgrid/mail')
import crypto from "crypto"
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

export const adminLogin = async (req, res) => {
    const {email, password} = req.body
    try{
        //check if email exists
        let user = await User.findOne({email: email, user_type: {$in: ["admin","editor"]}}).exec()
        // console.log('User Exists', user)
        if(!user) return res.status(400).send(`Admin/Editor with email ${email} not found!`)
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
                phone_number: user.phone_number,
                profile_image: user.profile_image,
                user_type: user.user_type,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            } })
        })
        
    }catch(err){
        console.log('Login Error: ', err)
        res.status(400).send("Signin Failed!")
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
                phone_number: user.phone_number,
                profile_image: user.profile_image,
                user_type: user.user_type,
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
    let {body} = req
    let {email} = body
    if(!email) return res.status(400).send('Email is required!')
    let randomString = crypto.randomBytes(8).toString("hex");
    let userExists = await User.findOne({email: email})
    if(!userExists) return res.status(400).send("User Email doesn\'t exist")
    const msg = {
        to: email, // Change to your recipient
        from: 'no-reply@switchoff.in', // Change to your verified sender
        subject: 'SwitchOff Password Reset - Confirmation Code',
        text: 'Hi, \n' +
            'Please verify your email with the provided code below to reset password.\n' +
            `${randomString.toUpperCase()}\n` +
            '\n \nRegards, \nTeam SwitchOff',
        html: 'Hi, <br>' +
              'Please verify your email with the provided code below to reset password.' +
              `<div style="width: 100%;text-align: center;font-size: 30px;font-weight: bold;">${randomString.toUpperCase()}</div>` +
              '<br><br>Regards, <br>Team SwitchOff',
    }
    try{
        await User.findByIdAndUpdate(userExists._id, {passcode: randomString.toLowerCase(), passchange: true})
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
            res.status(200).send("You have received an OTP on email!")
        })
        .catch((error) => {
            console.error(error)
            res.status(400).send("Sendgrid Unsuccessful!")
        })
    }catch(err){
        console.log(err)
        res.status(400).send("Unsuccessful!")
    }
}

//Password Management - Confirm Passcode
export const confirmPasscode = async (req, res) => {
    let {body} = req
    let {email, passcode} = body
    try{
        let passUser = await User.findOne({email: email})
        if(passUser.passcode === passcode){
            let token = jwt.sign({_id: passUser._id}, process.env.JWT_SECRET, {
                expiresIn: '600s'
            })
            res.status(200).json({ token })
        }else{
            return res.status(400).json(false)
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Unsuccessful!")
    }
}

//Password Management - Update Password
export const updatePassword = async (req, res) => {
    let {body, auth} = req
    let {password} = body
    try{
        await User.findByIdAndUpdate(auth._id, {password: password, passchange: false, passcode: ''})
        res.status(200).send("Password Updated!")
    }catch(err){
        console.log(err)
        res.status(400).send("Password Update Unsuccessful!")
    }
}

//User Profile Management - Update Profile
export const updateUser = async (req, res) => {
    // console.log(req.body)
    const {id, name, email, password, profile_image, user_type} = req.body
    //validation
    if(!email) return res.status(400).send('Email is required!')
    if(!password || password.length < 8) return res.status(400).send('Password is required and should be 8 characters long!')

    const newData = {
        name,
        email,
        password,
        profile_image,
        user_type
    }

    try{
        let updated = await User.findByIdAndUpdate(id, newData, {new:true})
        return res.status(200).json(updated)
    }catch(err){
        console.log('UPDATE USER FAILED: ', err)
        return res.status(400).send('Update Failed!')
    }
}

//User Profile Management - Deactivate Profile
export const deactivateUser = async (req, res) => {
    res.status(200).send("User Deactivated")
}

//Premium Features - Verify Profile
export const verifyUser = async (req, res) => {
    res.status(200).send("User Deactivated")
}