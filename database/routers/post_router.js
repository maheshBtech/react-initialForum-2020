const express = require('express');
const router = express.Router();
const newpost = require('../models/post_module')

const multer = require('multer');
const upload = multer()
const fs = require('fs');
const {promisify} = require('util');
const pipeline = promisify(require('stream').pipeline)

router.post('/newpost',upload.single('pic'),async(req,res) =>
{
    try{
        const{file,body:{desc,username,date}}=req
        console.log(file)
       if(!file ) return res.send({"msg":"please select photo"});
        if(file.detectedFileExtension ===".mp4")
        {
            filename = Date.now()+'-'+file.originalName;
            await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../../public/uploadedposts/${filename}`))
            const rel = new newpost({
                username,
                vidPath:`/uploadedposts/${filename}`,
                desc,
                date
            })
            const newEvent = rel.save()

            if(!newEvent) return res.status(401).send({"msg":"data not saved"})

             return res.send(rel)
        }
        else{
            filename = Date.now()+'-'+file.originalName;
            await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../../public/uploadedposts/${filename}`))
            const rel = new newpost({
                username,
                picPath:`/uploadedposts/${filename}`,
                desc,
                date
            })
            const newEvent = rel.save()

            if(!newEvent) return res.status(401).send({"msg":"data not saved"})

             return res.send(rel)

        }
    }
    catch(err)
    {
        console.log(err)
    }
})

router.get('/fetchevent',async(req,res) =>
{
    try{
         const rel = await newpost.find({}).sort({_id:-1})
         if(!rel) return res.status(401).send({"msg":"unable to fech"});
         return res.send(rel)

    }
    catch(err)
    {
        comsole.log(err)
    }
})

module.exports = router;