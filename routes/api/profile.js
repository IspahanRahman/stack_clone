const passport = require('passport')

const router=require('express').Router()

const {
    getProfileController,
    postProfileController,
    getProfileUserNameController
}=require('../../controller/profileController')
//@type GET
//@route /api/profile
//@desc route for personal user profile
//@access Private
router.get('/',passport.authenticate("jwt",{session:false}),getProfileController)

//@type Post
//@route /api/profile
//@desc route for personal user profile
//@access Private
router.post('/',passport.authenticate("jwt",{session:false}),postProfileController)

//@type GET
//@route /api/profile/:username
//@desc route for profile username
//@access Private
router.get('/:username',getProfileUserNameController)

module.exports=router