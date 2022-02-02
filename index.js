require('dotenv').config()
const express = require("express");
const cors = require('cors')
const mongoose =require('mongoose')
const router=require('./routes/router')


const app=express()

mongoose.connect("mongodb://localhost/jonoks",{ useNewUrlParser: true, useUnifiedTopology: true})
.then(res=>console.log("Database is connected")).catch(err=>console.log(err))

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('./uploads'))
app.use('/',router)

app.listen(process.env.PORT,()=>
{
console.log("Server is Running")
})