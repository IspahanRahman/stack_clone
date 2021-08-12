const {Schema, model}=require('mongoose')

const QuestionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Person'
    },
    textone:{
        type:String,
        required:true
    },texttwo:{
        type:String,
        required:true

    },
    neme:{
        type:String
    }
    ,
    upvotes:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:"Person"
            }
        }
    ],
    answers:[
        {
            user:{
                type:Schema.Types.ObjectId,
                ref:'Person'
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }
})

const Question=model('Question',QuestionSchema)

module.exports=Question