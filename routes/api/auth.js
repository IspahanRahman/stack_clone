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


module.exports=router
