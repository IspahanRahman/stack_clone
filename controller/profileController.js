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

exports.postProfileController=(req,res)=>{
    const profileValues={}
    profileValues.user=req.user.id
    if(req.body.username){
        profileValues.username=req.body.username
    }
    if(req.body.website){
        profileValues.website=req.body.website
    }
    if(req.body.country){
        profileValues.country=req.body.country
    }
    if(req.body.portfolio){
        profileValues.portfolio=req.body.portfolio
    }
    if(typeof req.body.languages!==undefined){
        profileValues.languages=req.body.languages.split(",")
    }
    profileValues.social={}
    if(req.body.linkedin){
        profileValues.social.linkedin=req.body.linkedin
    }
    if(req.body.instagram){
        profileValues.social.instagram=req.body.instagram
    }
    if(req.body.facebook){
        profileValues.social.facebook=req.body.facebook
    }

    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(profile){
            Profile.findOneAndUpdate(
                {user:req.body.user},
                {$set:profileValues},
                {new:true}
                ).then(profile=>res.json(profile))
                .catch(e=>console.log(`problem in update ${e}`))
        }
        else{
            Profile.findOne({username:profileValues.username})
            .then(profile=>{
                if(profile){
                    res.status(400).json({username:'Username already exists'})
                }
                new Profile(profileValues)
                .save()
                .then(profile=>{
                    res.json(profile)
                })
                .catch(e=>{
                    console.log(e)
                })
            })
            .catch(e=>console.log(`Problem in fetching profile ${e}`))
        }
    })
    .catch(e=>console.log('Problem in fetching profile '+e))
  
}

exports.getProfileUserNameController=(req,res)=>{
    Profile.findOne({username:req.params.username})
    .populate("user",["name","profilepic"])
    .then(profile=>{
        if(!profile){
            res.status(400).json({usernotfound:"User not found"})
        }
        res.json(profile)
    })
    .catch(e=>{
        console.log(e)
    })
}

exports.getEveryoneController=(req,res)=>{
    Profile.find()
    .populate("user",["name","profilepic"])
    .then(profiles=>{
        if(!profiles){
            res.status(400).json({usernotfound:"NO profiles were found"})
        }
        res.json(profiles)
    })
    .catch(e=>{
        console.log(e)
    })
}

exports.deleteController=(req,res)=>{
    Profile.findOne({user:req.user.id})
    Profile.findOneAndRemove({user:req.user.id})
    .then(()=>{
        Person.findOneAndRemove({_id:req.user.id})
        .then(()=>{
            res.json({success:"Deleted user successfully"})
        })
        .catch(e=>console.log(e))
    })
    .catch(e=>{
        console.log(e)
    })
}


exports.postMyworkController=(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            return res.json({failure:"Profile not found"})
        }
        const newWork={
            role:req.body.role,
            company:req.body.company,
            country:req.body.country,
            from:req.body.from,
            to:req.body.to,
            current:req.body.current,
            details:req.body.details

        }
        profile.workrole.push(newWork)
        profile
        .save()
        .then(profile=>res.json(profile))
        .catch(e=>console.log(e))

    })
    .catch(e=>{
        console.log(e)
    })
}

exports.deleteWorkroleController=(req,res)=>{
    Profile.findOne({user:req.user.id})
    .then(profile=>{
        if(!profile){
            return res.json({failure:'Profile not found'})
        }
        const removeWorkrole=profile.workrole
        .map(item=>item.id)
        .indexOf(req.params.w_id)
        profile.workrole.splice(removeWorkrole,1)
        profile.save().then(profile=>res.json(profile))
        .catch(e=>console.log(e))

    }).catch(e=>{
        console.log(e)
    })
}