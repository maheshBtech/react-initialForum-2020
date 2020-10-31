const mongoose = require('mongoose')
const newUser = mongoose.Schema({
    username:String,
    college:String,
    email:String,
    password:String,
    profilepath:String,
   
})
module.exports = user = mongoose.model('regester_candidate',newUser);