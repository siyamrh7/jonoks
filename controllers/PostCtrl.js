const Posts=require('../models/Post')
const Users=require('../models/User')


const createPost=async(req,res)=>{
        const {title ,description}=req.body
        if(!title||!description){
            return res.json({status:false,msg:"Post has invalid Creadentials"})
        }
        const Post=new Posts({
            title,description,image:req.file,user:req.id
        })
        const user=await Users.findById(req.id)
        if(user.coins >= 100){

      const post= await Post.save()
       await Users.findByIdAndUpdate(req.id,{
        $push:{posts:post._id},
        coins:user.coins-100

    })
   return res.json({status:true,msg:"Post Created"})
}
res.json({status:false,msg:"Invalid creadentials"})
}



const getSinglePost=async(req,res)=>{
    const post=await Posts.findById(req.params.id).populate("user")
    res.json({status:true,msg:post})
}





const getPost=async(req,res)=>{
const {search}=req.query
if(search !=="undefined"){
    const posts=await Posts.find({ title: { $regex: search, $options: "i" } } ).populate("user").limit(20)
    return res.json({status:true,msg:posts})
}else {
    const posts=await Posts.find({}).populate("user").limit(20)
     res.json({status:true,msg:posts})
}
}
const deletePost=async(req,res)=>{
await Posts.findByIdAndDelete(req.params.id)
res.json({msg:"Post Deleted Successfully"})
}

module.exports={createPost,getPost,getSinglePost,deletePost}