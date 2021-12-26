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
    },
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'] // 'location.type' must be 'Point'
         
        },
        coordinates: {
          type: [Number],
        },
      }
},{timestamps:true})

jobSchema.index({location: '2dsphere'});

const Jobs=mongoose.model('Jobs',jobSchema)

module.exports=Jobs