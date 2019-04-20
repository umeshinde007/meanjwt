const express=require('express');
const router=express.Router();

const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const User= require('./Model/user');
 const db='mongodb://localhost:27017/angularauth';
 mongoose.connect(db,err =>{
     if(err){
         console.log('not connected');
         }
         else{
             console.log('connect successfully');
         }
     })

router.get('/',(req,res)=>{
    res.send('sucess');
})

router.post('/register',(req,res)=>{
         let userData=req.body;
         let user=new User(userData);
         user.save((error,registeruser)=>{
             if(error){
                 console.log(error);
             }
             else{
                 let payload={subject: registeruser._id}
                 let token=jwt.sign(payload,'secret-key');
                 res.status(200).send({token});
             }
         })
    })  
router.post('/login',(req,res)=>{

    let userData=req.body;
    User.findOne({email:userData.email},(error,user)=>{
        if(error){
            console.log(error);
        }
        else if(!user){
            res.status(401).send('invalid email');
        }
        else if(user.password !=userData.password){
            res.status(401).send('Invalid password');
        }
        else{
            let payload={subject:user._id}
            let token =jwt.sign(payload,'secret-key')
            res.status(200).send({token});
        }
    })
})  

router.get('/event',(req,res)=>{
    let events=[
        {
            "id": "1",
            "name": "demo ",
            "place": "pune",
            "date":"12/25/2018"
           
        },
        {
            "id": "3",
            "name": "king ",
            "place": "talegan",
            "date":"12/25/2018"
           
        },
        {
            "id": "2",
            "name": "umesh ",
            "place": "maharshtra",
            "date":"12/25/2018"
           
        }
    ];
    res.json(events);
})

router.get('/special',verifyToken,(req,res)=>{
    let events=[
        {
            "id": "1",
            "name": "demo ",
            "place": "pune",
           
        },
        {
            "id": "1",
            "name": "demo ",
            "place": "pune",
           
        },
        {
            "id": "1",
            "name": "demo ",
            "place": "pune",
           
        }
    ];
    res.json(events);
})

function verifyToken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('unauthrorized Access');
    }
    let token=req.headers.authorization.split(' ')[1];
    if(token==="null"){
        return res.status(401).send('Unauthrozed aceess');
    }
    let payload=jwt.verify(token,'secret-key');
    if(!payload){
        return res.status(401).send('Authorized Request');
    }
    req.userId=payload.subject;
    next();
}
module.exports=router;
