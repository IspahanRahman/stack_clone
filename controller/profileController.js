const mongoose=require('mongoose')
const passport=require('passport')

const Person=require('../models/Person')
const Profile=require('../models/Profile')

exports.getProfileController=(req,res)=>{
    Profile.findOne({user:req.user.id}) 
    .then(profile=>{
        if(!profile){
            return res.json({profileError:"No Profile Exists"})
        }
        res.json(profile)

    })
    .catch(e=>console.log(`got some errors in profile ${e}`))
}