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