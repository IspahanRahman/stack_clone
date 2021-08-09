const mongoose=require('mongoose')
const {Schema}=require('mongoose')

const ProfileSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'Person'
    },
    username:{
        type:String,
        required:true,
        max:50
    },
    website:{
        type:String
    },
    country:{
        type:String
    },
    languages:{
        type:[String],
        required:true

    },
    portfolio:{
        type:String
    },
    workrole:[
        {
            role:{
                type:String,
                required:true
            },
            company:{
                type:String,
            },
            from:{
                type:Date,
                required:true
            },
            to:{
                type:Date
            },
            current:{
                type:Boolean,
                default:false
            },
            details:{
                type:String
            }
        }
    ],
    social:{
        linkedin:{
            type:String

        },
        facebook:{
            type:String

        },
        instagram:{
            type:String

        }
    }

})

const Profile=mongoose.model('Profile',ProfileSchema)

module.exports=Profile