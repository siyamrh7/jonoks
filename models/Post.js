const mongoose = require('mongoose')

const postSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }
},{timestamps:true})

const Posts=mongoose.model('Posts',postSchema)

module.exports=Posts