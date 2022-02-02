const Users = require("../models/User")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const registerCtrl=async(req,res)=>{
    const {name,email,phone,address,password,role}=req.body
    if(!name || !email || !phone || !address || !password ){
        return res.json({success:false,data:"Invalid Creadentials"})
    }
    const check=await Users.findOne({email})
    if(check){return res.json({data:"User already exist",success:false})}

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


const buyCoin=async(req,res)=>{
    const user=await Users.findById(req.id)
    const coin=parseInt(req.query.coins)
    if(user){
    await Users.findByIdAndUpdate(req.id,{
       coins:user.coins+coin
    })}
    res.json({msg:"Coin added to your account",status:true})
}

const changePassword=async(req,res)=>{
    const {password,newpassword}=req.body
    if(!password || !newpassword){return res.json({msg:"Invalid data",status:false})}

   const user= await Users.findById(req.id)
   const check= await bcrypt.compare(password,user.password)
if(check){
    const hashpass=await bcrypt.hash(newpassword,10)
    user.password=hashpass
    await user.save()
    res.json({msg:"Password changed",status:true})
}else{
    res.json({msg:"Previous Password is incorrect",status:false})

}
}


const transporter = nodemailer.createTransport ({
    aliases: ["Outlook", "Outlook.com"],
    domains: [ "outlook.com"],
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: process.env. AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASS
    }
})
// testing nodemailer success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
     } else {
        console.log("Ready for messages");
        console.log(success);
    }
})

const resetCode=async(req,res)=>{
const {email}=req.body
if(!email){return res.json({msg:"Invalid data",status:false})}
const check=await Users.findOne({email})
if(!check){return res.json({msg:"User email not found",status:false})}

const code=Math.floor(Math.random() * 900000)
check.resetCode=code

    const mail0ptions= {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: "Jonoks password reset code",
        text: `Your code is ${code}`
    }
  const Res= await transporter.sendMail(mail0ptions)
    if(Res.accepted){
        await check.save()
        res.json({status:true,msg:"Verification code sent to your mail"})
    }else{
        res.json({status:false,msg:"Something Went Wrong"})
    }

}

const verifyCode=async(req,res)=>{
    const {code, newpassword}=req.body
    if(!code || !newpassword){return res.json({msg:"Invalid data",status:false})}
 const check=await Users.findOne({resetCode:code})
 if(!check){return res.json({msg:"Invalid Code",status:false})}
 check.password=await bcrypt.hash(newpassword,10)
 check.resetCode=null
 const Res=await check.save()
 if(Res){return res.json({msg:"Password Reset Successfully",status:true})}
}

module.exports={registerCtrl,signinCtrl,getUser,buyCoin,changePassword,resetCode,verifyCode}