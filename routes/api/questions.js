const router=require('express').Router()

router.get('/',(req,res)=>{
    res.json({
        test:'questions is successfully uploaded'
    })
})

module.exports=router