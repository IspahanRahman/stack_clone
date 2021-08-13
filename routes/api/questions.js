const router=require('express').Router()
const passport=require('passport')
const {
    getQuestionController,
    postQuestionController,
    postAnswerController,
    postUpvoteController
}=require('../../controller/questionController')

//@type GET
//@route /api/questions/
//@desc route for showing all questions
//@access public
router.get('/',getQuestionController)

//@type POST
//@route /api/questions/
//@desc route for submitting questions
//@access Private

router.post('/',passport.authenticate("jwt",{session:false}),postQuestionController)


//@type POST
//@route /api/questions/answer/:id
//@desc route for submitting answer
//@access Private

router.post('/answer/:id',passport.authenticate("jwt",{session:false}),postAnswerController)

//@type POST
//@route /api/questions/upvote/:id
//@desc route for submitting upvote
//@access Private
router.post('/upvote/:id',passport.authenticate("jwt",{session:false}),postUpvoteController)

module.exports=router