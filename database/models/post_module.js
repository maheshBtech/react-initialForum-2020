const mongoose = require('mongoose');
const newPost = mongoose.Schema({
    
    username:String,
    picPath:String,
    vidPath:String,
    desc:String,
    comments:String,
    date:String
})

module.exports = newpost = mongoose.model('newpost',newPost);