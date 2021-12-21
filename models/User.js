const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    posts:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Posts'}
    ],
    jobs:[
        {type:mongoose.Schema.Types.ObjectId,ref:'Jobs'}
    ],
    coins:{
        type:Number,
        default:300

    }
},{timestamps:true})

const Users= mongoose.model("Users",userSchema)

module.exports=Users
