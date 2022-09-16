import express from "express"

const router = express.Router()

router.get("/:testMessage", (req, res) => {
    res.status(200).send(`Here is your message: ${req.params.testMessage}`)
})

module.exports = router