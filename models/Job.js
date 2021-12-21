const mongoose = require('mongoose')

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    image:{
        type:Object,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
},{timestamps:true})

const Jobs=mongoose.model('Jobs',jobSchema)

module.exports=Jobs