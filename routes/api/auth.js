const router=require('express').Router()
const passport=require('passport')


const {
    postRegisterController,
    postLoginController
}=require('../../controller/authcontroller')

//@type GET
//@route /api/auth
//@desc it is for testing
//@access Public

router.get('/',(req,res)=>{
    res.json({
        test:'Access is being  tested'
    })
})

//@type POST
//@route /api/auth/register
//@desc it is for register of the user
//@access Public

router.post('/register',postRegisterController)


//@type POST
//@route /api/auth/login
//@desc it is for login of the user
//@access Public

router.post('/login',postLoginController)

//@type GET
//@route /api/auth/profile
//@desc it is for profile of the user
//@access Public
router.get('/profile',passport.authenticate("jwt",{session:false}),(req,res)=>{
    // console.log(req.user.email)
    res.json({
        name:req.user.name,
        email:req.user.email,
        username:req.user.username
    })
})

module.exports=router
