const e = require('express');
const { query } = require('express');
const express =require('express');
const connection=require('../connection');
const router=express.Router();

const jwt=require('jsonwebtoken');

require('dotenv').config();

router.post('/signup',(req,res)=>{
    let user=req.body;
    var query="select email,password,role,status from user where email=?"
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0){
                query="insert into user (name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
                connection.query(query,[user.name,user.contactNumber,user.email,user.password ],(err,results)=>{
                    if(!err){
                        return res.status(200).json({message:"Successfully Registered"});
                    }else{
                        return res.status(500).json(err);
                    }
                });
            }else{
                return res.status(400).json({message:"Email Already Exists."});
            }
        }else{
            return res.status(500).json(err);
        }
    })
    
})

router.post('/login',(req,res)=>{
    const user=req.body;
    var query="select email,password,role,status from user email=?";
    connection.query(query,[user.email],(err,results)=>{
        if(!err){
            if(results.length<=0 || results[0].password!=user.password){
                return res.status(401).json({message:"Incorrect Username or Password"});
            }else if(results[0].status==='false'){
                return res.status(401).json({message:"Wait for Admin Approval"});
            }else if(results[0].password=user.password){
                //generate jwt token
                const response={ }
            }else{
                return res.status(400).json({message:"Something went wrong. Please try again later"});
            }
        }else{
            return res.status(500).json(err);
        }
    });
})


module.exports=router;  