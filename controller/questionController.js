const Profile=require('../models/Profile')
const Person=require('../models/Person')
const Question=require('../models/Question')
const passport=require('passport')


exports.getQuestionController=(req,res)=>{
    Question.find()
    .sort({date:'desc'})
    .then(questions=>{
        res.json(questions)
    })
    .catch(e=>console.log(e))
}
exports.postQuestionController=(req,res)=>{
    const newQuestion=new Question({
        textone:req.body.textone,
        texttwo:req.body.texttwo,
        user:req.user.id,
        name:req.body.name
    }) 
    newQuestion.
    save()
    .then(question=>{
        res.json(question)
    }).catch(e=>console.log(e))
}

exports.postAnswerController=(req,res)=>{
    Question.findById(req.params.id)
    .then(question=>{
        const answer={
            user:req.user.id,
            name:req.body.name,
            text:req.body.text
        }
        question.answers.unshift(answer)
        question.save()
        .then(question=>res.json(question))
        .catch(e=>console.log(e))
    }).catch(e=>console.log(e))
}

exports.postUpvoteController=(req,res)=>{
    Profile.findOne({user:req.user.id})
    then(profile=>{
        Question.findById(req.params.id)
        .then(question=>{
            if(question.upvotes.filter(
                upvote=>upvote.user.toString()===req.user.id.toString()).length>0){
                    return res.status(400).json({})
            }
            question.upvotes.unshift({user:req.user.id})
            question.save()
            .then(question=>res.json(question))
            .catch(e=>{
                console.log(e)
            })
        }).catch(e=>console.log(e))
    }).catch(e=>{
        console.log(e)
    })

}