const mailer = require('nodemailer');
const express = require('express');
const Router = express.Router();



Router.post('/mail',async(req,res) =>
{
    try{
      
         const{text,subject,email} = req.body;
         if(!text || !subject || !email) return res.status(401).send({"msg":"fill all the labels"})
      sendMail(email,subject,text,(err,data) =>
         {
             if(err)
             {
                 return res.status(500).send({"msg":"email not sent"})
             }
             else{

                return res.send({"msg":"email sent"})
             }
         })
       
     }
    catch(err)
    {
        console.log(err)
    }
})


const transport = mailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.email,
        pass:process.env.pass
    }
})

const sendMail = (email,subject,text,cb) =>
{
    const opt = {
        from:email,
        to:"maheshbtech1999@gmail.com",
        subject,
        text
    }
    
    transport.sendMail(opt,(err,rel) =>
    {
        if(err)
        {
            cb(err,null)
        }
        else{
            cb(null,rel)
        }
    })

}




module.exports = Router