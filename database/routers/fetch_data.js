const express = require('express');
const router = express();
const user = require('../models/register')

router.post('/fetchdata',async(req,res) =>
{
    try{
        const{name}=req.body
        const rel =await user.findOne({username:name});
        if(!rel) return res.status(401).send({"msg":"usernot found"});
         const {username,college,email} = rel
         return res.send({
             username,
             college,
             email
         })
    }
    catch(err)
    {
        console.log(err)
    }
})

module.exports = router;