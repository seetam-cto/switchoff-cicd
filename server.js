import express from "express"
import { readdirSync } from "fs"
import cors from "cors"
import mongoose from "mongoose"
const morgan = require("morgan")
require("dotenv").config()
const path = require('path')

const app = express()

//db connection
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err))

//middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

//route middlewares
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))
app.use('/', express.static(path.join(__dirname, '/frontend/build')))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))