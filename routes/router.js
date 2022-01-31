const router=require("express").Router()
const {registerCtrl, signinCtrl,getUser,buyCoin, changePassword, resetCode, verifyCode}=require("../controllers/AuthCtrl")
const {createPost,getPost,getSinglePost, deletePost} =require('../controllers/PostCtrl')
const {createJob,getJob, getSingleJob,ContactNow, deleteJob} =require('../controllers/JobCtrl')
const {upload,Authenticate}=require('../middleware/index')




router.get('/posts',Authenticate,getPost)
router.get('/buycoin',Authenticate,buyCoin)

router.get('/jobs',Authenticate,getJob)
router.get('/post/:id',Authenticate,getSinglePost)
router.get('/job/:id',Authenticate,getSingleJob)
router.delete('/post/:id',deletePost)
router.delete('/job/:id',deleteJob)
router.get('/user',Authenticate,getUser)
router.get('/contact',Authenticate,ContactNow)

router.post('/signup',registerCtrl)
router.post('/signin',signinCtrl)
router.post('/resetcode',resetCode)
router.post('/verifycode',verifyCode)

router.post('/changepassword',Authenticate,changePassword)

router.post('/posts',Authenticate,upload.single("image"),createPost)
router.post('/jobs',Authenticate,upload.single("image"),createJob)





module.exports=router