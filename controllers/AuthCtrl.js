const Users = require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const registerCtrl=async(req,res)=>{
    const {name,email,phone,address,password,role}=req.body
    if(!name || !email || !phone || !address || !password ){
        return res.json({success:false,data:"Invalid Creadentials"})
    }
    const pass=await bcrypt.hash(password,10)
    const user= new Users({
        name,email,phone,address,password:pass,role
    })
    const use=await user.save()
    const token=await jwt.sign({user:use},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.json({success:true,data:token})
}

const signinCtrl=async(req,res)=>{
      const {email,password}=req.body
      if(!email || !password){
          return res.json({success:false,data:"Invalid Creadentials"})
      }
      const user= await Users.findOne({email})
      if(!user){return res.json({success:false,data:"User doesn't exist"})}
     const check= await bcrypt.compare(password,user.password)
     if(!check){return res.json({success:false,data:"Password is incorrect"})}
     const token=await jwt.sign({user:user},process.env.JWT_SECRET,{expiresIn:"7d"})
    res.json({success:true,data:token})
}


const getUser=async(req,res)=>{
    const user=await Users.findById(req.id).populate("posts").populate("jobs")
    res.json({success:true,msg:user})
}
module.exports={registerCtrl,signinCtrl,getUser}