const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt  = require('jsonwebtoken')
const user = require('../models/register')

const mailer = require('nodemailer')

// const mailgun = require("mailgun-js");
// const DOMAIN = 'sandbox4ecaf0de0d304c5387ba80bd427a7f1b.mailgun.org';
// const mg = mailgun({apiKey:process.env.ApiKey, domain: DOMAIN});




//router to register the new candidate
Router.post('/register',async(req,res) =>
{
    try{
        const{username,email,password,college} = req.body;
        if(!username || !email || !password || !college) return res.status(401).send({"msg":"please fill all the labels..."})
        if(password.length < 5) return res.status(401).send({"msg":"Password contain atleast five characters"});
        const checkusername = await user.findOne({username:username}); if(checkusername) return res.status(401).send({"msg":"user-name already exists please use another one"});
        const check = await user.findOne({email:email}); if(check) return res.status(401).send({"msg":"email already exists"});
        const hashpassword = await bcrypt.hash(password,10);
         
        const payload = {email:email}

        const token = jwt.sign(payload,process.env.ApiKey,{expiresIn:"10m"})

        const send = mailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.email,
                pass:process.env.pass    
            }
        })

        const status = await send.sendMail({     
            from:'maheshbtech1999@gmail.com',
            to:email,
            subject:"Activation process",
            html:`
            <p> thanks for registering in to our website... there is just one step to go...</p>
            <p> click the below link to activate</P>
            <a href = "http://localhost:3000/auth/${token}">Activate</a>
            `
        }) 
        if(!status) return (
          
            res.status(401).send({"msg":"something went wrong"})
            
        )
        res.send({"rel":"activation link send to your email account"})
       

    
        // const data = {
        //     from: 'Noreply@jashin.com',
        //     to: email,
        //     subject: 'Activation process',
        //     html:`
            // <p> thanks for registering in to our website... there is just one step to go...</p>
            // <p> click the below link to activate</P>
            // <a href = "http://localhost:3000/reg/Activation/:${token}">Activate</a>
            // `
        // };

        // mg.messages().send(data, function (error, body) {
        //     // console.log(body);
        //     if(error) return (
        //         res.status(401).send({"msg":"something went wrong"}),
        //         console.log(error)
        //     )
        //     return res.send({"rel":"Activate your account by clicking the link sent to your mail"})
        // });

        const newuser = await new user({
            username,
            email,
            password:hashpassword,
            college

        })
        const rel = await newuser.save();
        if(!rel) return res.status(401).send({"msg":"your data was not saved in database"});
        return res.send({"rel":"You have registered successfully..."})
    }
    catch(err)
    {
        return res.status(500).send({"msg":err})

    }
})

Router.post('/login',async(req,res) =>
{
    try{
        const {password,email} = req.body;
        if(!email || !password) return res.status(401).send({"msg":"fill all the labels"})
        const checkemail = await user.findOne({email:email}); if(!checkemail) return res.status(401).send({"msg":" This email_id does not exists please register before Sign_In"});
        const checkpass = await bcrypt.compare(password,checkemail.password); if(!checkpass) return res.status(401).send({"msg":"Password Incorrect"});
        const payload = {id:checkemail._id};
        const token = jwt.sign(payload,process.env.key,{expiresIn:"1h"});
        return res.send({
            Token:token,
            name:checkemail.username

        })
    }
    catch(err)
    {
        res.status(500).send({"msg":"internal server error"})
        console.log(err)
        
    }
})
 
Router.post('/validate',async(req,res) =>
{
    try{
       const{token} = req.body;
       if(!token) return res.status(401).send({"msg":"token undeclared"});
    //    console.log("token")
    //    res.send({"token":token})
    const verify = jwt.verify(token,process.env.ApiKey,(err,user)=>
    {
        if(err) return res.status(401).send({"msg":"request denied invalid token"});
     
        res.send({"email":user.email})
    })
    }
    catch(err)
    {
        console.log(err)
    }
})


module.exports = Router