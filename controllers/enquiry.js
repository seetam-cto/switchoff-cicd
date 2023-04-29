import Enquiry from "../models/bookings/enquiry"

export const getAllEnquiries = async (req, res) => {
    try{
        let enqs = await Enquiry.find()
        .populate("property")
        .populate("enquiredBy")
        .exec()
        if(enqs.length === 0) return res.status(400).send("No Enquiries Found!")
        res.status(200).json(enqs)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching enquiries!")
    }
}

export const getUserEnquiries = async (req, res) => {
    let {auth} = req
    try{
        let enqs = await Enquiry.find({enquiredBy: auth._id})
        .populate("property")
        .populate("enquiredBy")
        .exec()
        if(enqs.length === 0) return res.status(400).send("No Enquiries Found For the user!")
        res.status(200).json(enqs)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching enquiries!")
    }
}

//helper function for date
const getDate = (date) => {
    return new Date(date).getDate()
}

export const addEnquiry = async (req, res) => {
    let {auth, body} = req
    const data = {
        ...body,
        enquiredBy: auth._id
    }

    //check if enquiry exists
    try{
        let enqs = await Enquiry.find({enquiredBy: auth._id, property: data.property}).exec()
        let newEnqs = enqs.filter((q) => getDate(q.duration.from) >= getDate(data.duration.from) && getDate(q.duration.to) <= getDate(data.duration.from))
        if(newEnqs.length > 0){
            return res.status(400).send("Enquiry Already Exists!")
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Error in fetching enquiries!")
    }
    
    const enquiry = new Enquiry(data)
    try{
        await enquiry.save()
        return res.status(200).json(enquiry)
    }catch(err){
        console.log(err)
        res.status(400).send("Error in adding Enquiry!")
    }

}