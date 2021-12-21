require('dotenv').config()
const express = require("express");
const cors = require('cors')
const mongoose =require('mongoose')
const router=require('./routes/router')

mongoose.connect('mongodb+srv://siyam:siyam123789654@cluster0.3xxfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>console.log("Database is connected")).catch(err=>console.log(err))

const app=express()

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('./uploads'))
app.use('/',router)

app.listen(process.env.PORT,()=>
{
console.log("Server is Running")
})