const Person=require('../models/Person')
const key=require('../config_database/database')
const bcrypt=require('bcryptjs')
const jsonwt=require('jsonwebtoken')
const passport=require('passport')

exports.postRegisterController=async (req,res)=>{
    try{
        let email=req.body.email
        await Person.findOne({email},async(err,docs)=>{
            if(err){
                console.log(e)
            }
            if(docs){
            return res.status(400).json({emailError:'Email is already registered in our system'})
        }
        else{
            let{name,password,username}=req.body
            let hashpassword=await bcrypt.hash(password,11)
            let newRegister=new Person({
                name,
                email,
                password:hashpassword,
                username,
                profilepic:'',
                date:Date.now()
            })
            await newRegister.save()
            .then(person=>{
                res.json(person)
            })
            .catch(e=>{
                console.log(e)
            })
        }
    })
    
    }
    catch(e){
        console.log(e)
    }
    
}

exports.postLoginController=(req,res)=>{
    const email=req.body.email
    const password=req.body.password

    Person.findOne({email})
    .then(person=>{
        if(!person){
            return res.status(400).json({emailError:'Email is not found'})
        }
        bcrypt.compare(password,person.password)
        .then(isPassword=>{
            if(isPassword){
                // res.json({passwordSuccess:'User successfully logged in'})
                //use payload and create token for user
                const payload={
                    id:person._id,
                    name:person.name,
                    email:person.email
                }
               jsonwt.sign(
                   payload,
                   key.secret,
                   {expiresIn:3600}
               ,(err,token)=>{
                   if(err){
                       console.log(err)
                   }
                   else{
                       res.json({
                       success:true,
                       token:"Bearer "+token
                    })
                   }
               })     
            } 
            else{
                res.json({passwordError:'Password is not correct'})
            }
        })
    })
    .catch(e=>{
        console.log(e)
    })

}