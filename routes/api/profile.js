const router=require('express').Router()

router.get('/',(req,res)=>{
    res.json({
        test:'Profile is successfully uploaded'
    })
})

module.exports=router