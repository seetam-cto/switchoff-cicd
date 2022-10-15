import Property from "../models/property"

export const getProperties = async (req, res) => {
    try{
        let properties = await Property.find()
            .exec();
        if(!properties) return res.status(400).send("No Properties Found!")
        res.status(200).json(properties)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Properties")
    }
}

export const addProperty = async (req, res) => {
    let {auth, body} = req
    console.log(body)
    const propData = {
        ...body,
        createdBy: auth._id
    }
    const property = new Property(propData)
    try{
        await property.save()
        return res.status(200).json(property)
    }catch(err){
        console.log(err)
        if(err.code == 11000){
            res.status(400).send("Property Already Exists")
        }else{
            res.status(400).send("Couldn't add Property!")
        }
    }
}

export const updateProperty = async (req, res) => {
    let {body, params} = req
    console.log(body)
    try{
        let updated = await Property.findByIdAndUpdate(params.id, body, {new: true})
        res.status(200).json(updated)
    }catch(err){
        console.log(err)
        res.status(400).send("Property Update Failed!")
    }
}