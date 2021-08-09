require('dotenv').config()
const secret=process.env.SECRET_KEY
module.exports={
    mongoURL:"mongodb+srv://ispahan:sharmin@cluster0.d2fg3.mongodb.net/test?retryWrites=true&w=majority",
    secret:secret
}