const multer=require('multer')
const path=require('path')
const jwt=require('jsonwebtoken')
const Users=require('../models/User')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
})



const Authenticate=async(req,res,next)=>{
try {
    const token=req.headers.authorization

if(!token){return res.json({status:false,msg:"Authentication Error"})}
const {user}=await jwt.verify(token,process.env.JWT_SECRET)
const User=await Users.findById(user._id)
if(!User){return res.json({status:false,msg:"User doesn't exist"})}
req.user=User
req.id=User._id
next()
} catch (error) {
    return res.json({status:false,msg:error.message})
}
}


module.exports={Authenticate,upload}