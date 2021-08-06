const {Schema, Mongoose}=require('mongoose')

const PersonSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String
    },
    profilepic:{
        type:String

    },
    date:{
        type:String,
        default:Date.now
    }

})

const Person=mongoose.model('Person',PersonSchema)

module.exports=Person