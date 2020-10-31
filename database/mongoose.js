const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/revision_react',{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false})
.then(() => console.log("database is connected..."))
.catch((err) => console.log(err) )

module.exports = mongoose