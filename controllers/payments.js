import PaymentConfig from "../models/bookings/paymentConfig"

export const initPayment = async (req, res) => {
    //write code to initiate payment
    res.status(200).send("Payment Initiated!")
}

export const getPaymentStatus = async (req, res) => {
    //write code to get payment status
    res.status(200).send(`Payment of ${req.params.id} Pending!`)
}

export const confirmPayment = async (req, res) => {
    //write code to confirm status
    res.status(200).send("Payment Successful")
}

export const getPaymentMethods = async (req, res) => {
    try{
        let result = await PaymentConfig.find()
        if(!result) return res.status(400).send("No Payment Config Found!")
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(200).send("Error in Fetching Payment Config!")
    }
}

export const handlePaymentConfig = async (req, res) => {
    let {body} = req
    try{
        let result = await PaymentConfig.find()
        if(!result){
            let sampleData = body
            const initPayConfig = new PaymentConfig(sampleData)
            try{
                await initPayConfig.save()
                res.status(200).json(initPayConfig)
            }catch(err){
                console.log(err)
                res.status(400).send("Payment Initialization Failed!")
            }
        }else{
            let updated = await PaymentConfig.findByIdAndUpdate(result[0]._id, body, {new: true})
            return res.status(200).json(updated)
        }
    }catch(err){
        console.log(err)
        res.status(400).send("Payment Details Fetching Failed!")
    }
}