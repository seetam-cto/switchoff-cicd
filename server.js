import express from "express"
import { readdirSync } from "fs"
import cors from "cors"
import mongoose from "mongoose"
const morgan = require("morgan")
require("dotenv").config()
const path = require('path')
var bodyParser = require('body-parser');
const app = express()

//db connection
mongoose
    .connect(process.env.DATABASE, {})
    .then(() => console.log("DB Connected"))
    .catch((err) => console.log("DB Connection Error: ", err))

//middlewares
app.use(express.static(path.join(__dirname, '/frontend/build')))
app.use('/media',express.static(path.join(__dirname, 'media')))
app.use(cors({origin: ['https://admin.switchoff.in', 'https://switchoff.in', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://localhost:5173' ]}))
app.use(morgan("dev"))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//route middlewares
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)))

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on port ${port}`))