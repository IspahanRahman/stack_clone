const passport = require('passport')

const router=require('express').Router()

const {
    getProfileController
}=require('../../controller/profileController')
//@type GET
//@route /api/profile
//@desc route for personal user profile
//@access Private
router.get('/',passport.authenticate("jwt",{session:false}),getProfileController)

module.exports=router