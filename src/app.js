const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");
const router = require("./routes/todo.route");

const app = express()

app.use(bodyParser.json());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use("/api/v1", router)

module.exports = app