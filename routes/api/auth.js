const router=require('express').Router()
const Person=require('../../models/Person')


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

router.post('/register',(req,res)=>{
    Person.findOne({email:req.body.email})
    .then(person=>{
        if(person){
            return res.status(400).json({emailError:'Email is already registered in our system'})
        }
        else{
            const newRegister=new Person({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            bcrypt.genSalt(10,(err, salt)=> {
                bcrypt.hash(newRegister.password, salt, (err, hash)=> {
                    if(err){
                        throw err
                    }
                    newRegister.password=hash
                    newRegister
                    .save()
                    .then(person=>{
                        res.json(person)
                    })
                    .catch(e=>{
                        console.log(e)
                    })

                });
            });

        }

    })
    .catch(e=>{
        console.log(e)
    })
})

module.exports=router
