const Jobs=require('../models/Job')
const Users=require('../models/User')

const createJob=async(req,res)=>{
        const {title ,description,category,experience,gender,salary,address,city,country,number,coordinates}=req.body
if(!title||!description||!category||!experience||!gender||!salary||!address||!city||!country||!number || !coordinates){
    return res.json({status:false,msg:"Job details invalid"})

}
        const Job=new Jobs({
            title ,description,image:req.file,category,experience,gender,salary,address,city,country,number,user:req.id,location:{
                type:"Point",
                coordinates:JSON.parse(coordinates)
            }
        })

        const user=await Users.findById(req.id)
        if(user.coins >= 100){
        const job= await Job.save()

            await Users.findByIdAndUpdate(req.id,{
               $push:{jobs:job._id},
               coins:user.coins-100
            })
            
         return   res.json({status:true,msg:"Job Posted"})
        }
        res.json({status:false,msg:"Invalid creadentials"})
}


const getSingleJob=async(req,res)=>{
    const job=await Jobs.findById(req.params.id).populate("user")
    res.json({status:true,msg:job})
}


const getJob=async(req,res)=>{
if(!req.query.coordinates || !req.query.category){return res.json({msg:"Please use location to see nearest jobs",status:false})}
const data=JSON.parse(req.query.coordinates)
const jobs=await Jobs.find({category:{$regex:req.query.category,$options:"i"}, location : { $near :   {
    $geometry: { type: "Point",  coordinates: [data[0],data[1]] },
    $maxDistance: 500000
  } }
}).populate("user").limit(20)
    res.json({status:true,msg:jobs})
}


const ContactNow=async(req,res)=>{
    const user=await Users.findById(req.id)
    if(user.coins >= 100){
    await Users.findByIdAndUpdate(req.id,{
       coins:user.coins-100
    })
   return res.json({status:true,msg:user})
}
res.json({status:false,msg:"Invalid creadentials"})
}
module.exports={createJob,getJob,getSingleJob,ContactNow}