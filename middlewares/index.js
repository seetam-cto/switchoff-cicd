import {expressjwt} from "express-jwt"
import Property from "../models/property"
import Room from "../models/room"
import CMS from "../models/cms"
import User from "../models/user"

export const requireSignIn = expressjwt({
    //secret, expiryDate
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

export const propertyOwner = async (req, res, next) => {
    let property = await Property.findById(req.params.id).exec()
    let user = await User.findById(req.auth._id)
    let owner = property.createdBy.toString() == req.auth._id.toString() || user.user_type === "admin" || user.user_type === "editor"
    if(!owner){
        return res.status(403).send("Unauthorized!")
    }
    next()
}

export const isAdmin = async (req, res, next) => {
    let user = await User.findById(req.auth._id)
    if(!user.user_type === "admin"){
        return res.status(403).send("Unauthorized!")
    }
    next()
}

export const roomOwner = async (req, res, next) => {
    let room = await Room.findById(req.params.roomId).exec()
    let user = await User.findById(req.auth._id)
    let owner = room.createdBy.toString() == req.auth._id.toString() || user.user_type === "admin" || user.user_type === "editor"
    if(!owner){
        return res.status(403).send("Unauthorized!")
    }
    next()
}

export const allowedSettings = async (req, res, next) => {
    let owner = await User.findById(req.auth._id)
    if(owner.user_type !== "admin"){
        return res.status(403).send("Unauthorized!")
    }
    next()
}