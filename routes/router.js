const router=require("express").Router()
const {registerCtrl, signinCtrl,getUser,buyCoin}=require("../controllers/AuthCtrl")
const {createPost,getPost,getSinglePost} =require('../controllers/PostCtrl')
const {createJob,getJob, getSingleJob,ContactNow} =require('../controllers/JobCtrl')
const {upload,Authenticate}=require('../middleware/index')




router.get('/posts',Authenticate,getPost)
router.get('/buycoin',Authenticate,buyCoin)

router.get('/jobs',Authenticate,getJob)
router.get('/post/:id',Authenticate,getSinglePost)
router.get('/job/:id',Authenticate,getSingleJob)
router.get('/user',Authenticate,getUser)
router.get('/contact',Authenticate,ContactNow)

router.post('/signup',registerCtrl)
router.post('/signin',signinCtrl)
router.post('/posts',Authenticate,upload.single("image"),createPost)
router.post('/jobs',Authenticate,upload.single("image"),createJob)





module.exports=router