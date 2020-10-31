const express = require('express');
const Router = express.Router();
const multer = require('multer');
const user = require('../models/register')
const upload = multer()
const fs = require('fs');
const{promisify} = require('util');
const router = require('./fetch_data');
const pipeline = promisify(require('stream').pipeline)


Router.post('/uploadprofile',upload.single('pic'),async(req,res) =>
{
    try{
        const {file,body:{name}} = req;
        if(!file) return res.status(401).send({"msg":"please select image"});
       if(file.detectedFileExtension === ".jpg")
       {
        const filename = Date.now()+"-"+file.originalName;
        await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../../public/uploadprofile/${filename}`));
        const rel = await user.findOneAndUpdate({username:name},{$set:{profilepath:`/uploadprofile/${filename}`}});
        if(!rel) return res.status(401).send({"msg":"profilepic was not updataed"});
        return res.send(filename)
       }
        
    }
    catch(err)
    {
       console.log(err)

    }
})

Router.post('/fetchuserdata',async(req,res) =>
{
   try{
    const{name} = req.body;
    const rel = await user.findOne({username:name})
    if(!rel) return res.status(401).send({"msg":"username was not found"});
    const{username,college,profilepath}=rel
    return res.send({
       username,
       college,
       profilepath
    })
   

   }
   catch(err)
   {
       console.log(err)

   }

})

Router.post('/updateregister',async(req,res) =>
{
    try{
        const {username,email,college} = req.body;
        if(!username || !email || !college) return res.status(401).send({"msg":"fill all the labels"});
      
        const rel = await user.findOneAndUpdate({username:username},{$set:{email:email,college:college}});
        if(!rel) return res.status(401).send({"msg":"unable to update"});
        return res.send({"msg":"done"})

    }
    catch(err)
    {
        console.log(err)

    }
})

module.exports = Router;