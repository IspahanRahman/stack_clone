const passport = require('passport')

const router=require('express').Router()

const {
    getProfileController,
    postProfileController,
    getProfileUserNameController,
    getEveryoneController,
    deleteController,
    postMyworkController,
    deleteWorkroleController
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

//@type GET
//@route /api/profile/find/everyone
//@desc route for getting user profile of everyone
//@access public

router.get('/find/everyone',getEveryoneController)

//@type DELETE
//@route /api/profile/
//@desc route for deleting user profile
//@access Private
router.delete('/',passport.authenticate("jwt",{session:false}),deleteController)

//@type POST
//@route /api/profile/workrole
//@desc route for adding workrole of a person
//@access Private

router.post('/workrole',passport.authenticate("jwt",{session:false}),postMyworkController)

//@type DELETE
//@route /api/profile/workrole/:id
//@desc route for delteting workrole of a person
//@access Private

router.delete('/workrole/:w_id',passport.authenticate("jwt",{session:false}),deleteWorkroleController)

module.exports=router