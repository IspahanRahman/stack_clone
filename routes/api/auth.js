const router=require('express').Router()

router.get('/',(req,res)=>{
    res.json({
        test:'Access is successfull'
    })
})

module.exports=router
