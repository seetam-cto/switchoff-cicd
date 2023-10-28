import User from "../models/user"
import Vendor from "../models/vendor"
import jwt from "jsonwebtoken"
const sgMail = require('@sendgrid/mail')
import crypto from "crypto"
import bcrypt from "bcrypt"
import {OAuth2Client} from 'google-auth-library'
const client = new OAuth2Client(process.env.CLIENT_ID);

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const getAllUsers = async (req, res) => {
    try{
        let users = await User.find({user_type: {$in: ["admin", "editor"]}})
        .select("-password")
        .select("-passcode")
        .select("-passchange")
        .exec()
        if(!users) return res.status(400).send("No Users Found!")
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Users!")
    }
}

export const getManagerUsers = async (req, res) => {
    try{
        let users = await User.find({user_type: {$in: ["manager", "vendor"]}})
        .select("-password")
        .select("-passcode")
        .select("-passchange")
        .exec()
        if(!users) return res.status(400).send("No Managers Found!")
        res.status(200).json(users)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching Managers!")
    }
}

export const adminRegister = async (req, res) => {
    // console.log(req.body)
    const {name, email, user_type} = req.body
    //validation
    if(!email) return res.status(400).send('Email is required!')

    let userExists = await User.findOne({email: email})
    if(userExists) return res.status(400).send('Account already exists')

    let randomString = crypto.randomBytes(12).toString("hex");

    //register
    const user = new User({...req.body, password: randomString})
    try{
        await user.save()
        const msg = {
            to: email, // Change to your recipient
            from: 'no-reply@switchoff.in', // Change to your verified sender
            subject: `Team SwitchOff - Invited you with ${user_type.toUpperCase()} access.`,
            text:   `Hi, ${name}\n` +
                    'Please use the following details to login on SwitchOff.\n' +
                    'Login at https://admin.switchoff.in'+
                    `Username: ${email}\n` +
                    `Password: ${randomString}\n` +
                    '\n \nRegards, \nTeam SwitchOff',
            html:   `Hi, ${name}<br>` +
                    'Please use the following details to login on SwitchOff.<br>' +
                    'Login at <a href="https://admin.switchoff.in">https://admin.switchoff.in</a><br>'+
                    `<strong>Username: </strong> ${email}<br>` +
                    `<strong>Password: </strong> ${randomString}<br>` +
                    '<br><br>Regards, <br>Team SwitchOff'
        }

        sgMail
        .send(msg)
        .then(() => {
            console.log('Invite Sent')
        })
        .catch((error) => {
            console.error(error)
        })

        console.log('USER CREATED', user)
        return res.status(200).json({ok: true, user: {_id: user._id}})
    }catch(err){
        console.log('CREATE USER FAILED: ', err)
        return res.status(400).send('Error. Try Again.')
    }
}

export const register = async (req, res) => {
    // console.log(req.body)
    const {email, password} = req.body
    //validation
    if(!email) return res.status(400).send('Email is required!')
    if(!password || password.length < 8) return res.status(400).send('Password is required and should be 8 characters long!')
    
    let userExists = await User.findOne({email: email})
    if(userExists) return res.status(400).send('ACCOUNT_EXISTS')

    //register
    const user = new User({...req.body, user_type: "customer"})
    try{
        await user.save()
        console.log('USER CREATED', user)
        let token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return res.status(200).json({token, user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profile_image: user.profile_image,
            phone_number: user.phone_number,
            user_type: user.user_type,
            favourites: user.favourites
        }})
    }catch(err){
        console.log('CREATE USER FAILED: ', err)
        return res.status(400).send('ERROR_REGISTER')
    }
}

export const adminLogin = async (req, res) => {
    const {email, password} = req.body
    try{
        //check if email exists
        let user = await User.findOne({email: email, user_type: {$in: ["admin","editor","manager","vendor"]}}).exec()
        // console.log('User Exists', user)
        if(!user) return res.status(400).send(`User with email ${email} not found!`)
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

export const socialAuth = async (req, res) => {
    const {email, name, profile_image} = req.body
    try{
        let user = await User.find({email: email}).exec()
        if(!user.length){
            console.log("Registering User")
            const usr = new User({email, password: "switchoff", user_type: "customer", name, profile_image})
            await usr.save()
            let token = jwt.sign({_id: usr._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            return res.status(200).json({token, user: {
                _id: usr._id,
                name: usr.name,
                email: usr.email,
                profile_image: usr.profile_image,
                phone_number: usr.phone_number,
                user_type: usr.user_type,
                favourites: usr.favourites
            }})
        }else{
            let updated = user[0]
            if(!user.profile_image){
                updated = await User.findByIdAndUpdate(user[0]._id, {profile_image}).exec()
            }
            let token = jwt.sign({_id: updated._id}, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            res.status(200).json({ token, user: {
                _id: updated._id,
                name: updated.name,
                email: updated.email,
                profile_image: updated.profile_image,
                phone_number: updated.phone_number,
                user_type: updated.user_type,
                favourites: updated.favourites
            }})
        }
    }catch(err){
        console.log(err)
        res.status(400).send("ERROR_SOCIAL")
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        //check if email exists
        let user = await User.findOne({email: email}).exec()
        // console.log('User Exists', user)
        if(!user) return res.status(400).send("NO_ACCOUNT")
        //check active
        if(!user.active) return res.status(400).send("DEACTIVATED_ACCOUNT")
        // Compare password
        user.comparePassword(password, (err, match) => {
            console.log('COMPARE PASSWORD IN LOGIN ERR', err)
            if(!match || err) return res.status(400).send('WRONG_PASS')
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
                favourites: user.favourites,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            } })
        })
        
    }catch(err){
        console.log('Login Error: ', err)
        res.status(400).send("ERROR_LOGIN")
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

    bcrypt.hash(randomString.toLowerCase(), 12, async function(err, hash) {
        if(err){
            console.log("BCRYPT HASH ERR: ", err)
        }
        try{
            await User.findByIdAndUpdate(userExists._id, {passcode: hash, passchange: true})
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

    })
}

//Password Management - Confirm Passcode
export const confirmPasscode = async (req, res) => {
    let {body} = req
    let {email, passcode} = body
    try{
        let passUser = await User.findOne({email: email})
        if(!passUser) res.status(400).send(`User with email ${email} not found!`)
        passUser.comparePasscode(passcode.toLowerCase(), (err, match) => {
            console.log('CONFIRM PASSCODE ERR', err)
            if(!match || err) return res.status(400).send('Passcode doesn\'t match!')
            let token = jwt.sign({_id: passUser._id}, process.env.JWT_SECRET, {
                expiresIn: '600s'
            })
            res.status(200).json({ token })
        })
    }catch(err){
        console.log(err)
        res.status(400).send("Passcode Confirm Unsuccessful!")
    }
}

//Password Management - Update Password
export const updatePassword = async (req, res) => {
    let {body, auth} = req
    let {password} = body
    bcrypt.hash(password, 12, async function(err, hash) {
        if(err){
            console.log("BCRYPT HASH ERR: ", err)
        }
        try{
            await User.findByIdAndUpdate(auth._id, {password: hash, passchange: false, passcode: ''}, {new: true})
            res.status(200).send("Password Updated!")
        }catch(err){
            console.log(err)
            res.status(400).send("Password Update Unsuccessful!")
        }
    })
}

//User Profile Management - Update Profile
export const updateUser = async (req, res) => {
    const {body} = req
    try{
        let updated = await User.findByIdAndUpdate(req.params.id, body, {new:true})
        return res.status(200).json(updated)
    }catch(err){
        console.log('UPDATE USER FAILED: ', err)
        return res.status(400).send('Update Failed!')
    }
}

//User Profile Management - Deactivate Profile
export const deactivateUser = async (req, res) => {
    try{
        let updated = await User.findByIdAndUpdate(req.params.id, {active: false}, {new: true})
        return res.status(200).json(updated)
    }catch(err){
        console.log('DEACTIVATE USER FAILED: ', err)
        return res.status(400).send('Deactivate User Failed!')
    }
}

//Premium Features - Verify Profile
export const verifyUser = async (req, res) => {
    res.status(200).send("User Deactivated")
}

//Vendor Registration
export const vendorRegister = async (req, res) => {
    const {email, password} = req.body
    //validation
    if(!email) return res.status(400).send('Email is required!')
    if(!password || password.length < 8) return res.status(400).send('Password is required and should be 8 characters long!')

    let userExists = await Vendor.findOne({email: email})
    if(userExists) return res.status(400).send('Account already exists')

    //register
    const user = new Vendor({...req.body, user_type: "vendor"})
    try{
        await user.save()
        console.log('USER CREATED', user)
        return res.status(200).json({ok: true})
    }catch(err){
        console.log('CREATE USER FAILED: ', err)
        return res.status(400).send('Error. Try Again.')
    }
}

//Vendor Login
export const vendorLogin = async (req, res) => {
    const {email, password} = req.body
    try{
        //check if email exists
        let user = await Vendor.findOne({email: email}).exec()
        // console.log('User Exists', user)
        if(!user) res.status(400).send(`User with email ${email} not found!`)
        //check active
        if(!user.active) res.status(400).send("Your Account has been deactivated!")
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
