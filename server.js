
require('dotenv/config')
const express = require('express')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/index")
const cors = require('cors');
const app = express();

app.use(bodyParser.json())
app.use(cors());

const mongodbUrl = process.env.DB_CONNECTION
mongoose.connect(mongodbUrl)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//Routes
app.use('/todos',router) 

app.get('/', async (req,res)=> {
    res.send("api running...")
})  

app.listen("3001",()=>{
    console.log("server is running...")
})
