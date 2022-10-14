import {expressjwt} from "express-jwt"
import Property from "../models/property"

export const requireSignIn = expressjwt({
    //secret, expiryDate
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
})

export const propertyOwner = async (req, res, next) => {
    let property = await Property.findById(req.params.id).exec()
    let owner = property.createdBy.toString() == req.auth._id.toString()
    if(!owner){
        return res.status(403).send("Unauthorized!")
    }
    next()
}