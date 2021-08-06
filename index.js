const express=require('express')
const mongoose=require('mongoose')

//require routes
const auth=require('./routes/api/auth')
const profile=require('./routes/api/profile')
const questions=require('./routes/api/questions')

const port =process.env.PORT || 8080
const app=express()

//middleware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//mongodb database configuration
const db=require('./config_database/database').mongoURL

//connect to the mongodb database
mongoose
.connect(db,{useUnifiedTopology:true,useCreateIndex:true,useNewUrlParser:true})
.then(()=>{
    console.log('Connected to the datbase')
})
.catch(e=>{
    console.log(e)
})


app.get('/',(req,res)=>{
    res.send('Hey buddy this is stackoverflow')
})
app.use('/api/auth',auth)
app.use('/api/profile',profile)
app.use('/api/questions',questions)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})