const user= require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const key=process.env.secretOrKey;

exports.registerUser = async (req,res)=>{
    const saltRounds = 10;
    const hashpass = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new user({
        name:req.body.name,
        email:req.body.email,
        password:hashpass
    })
    const emailExists=await user.findOne({email:req.body.email});
    if(emailExists){
        res.status(400).json({message:"Email already exists"});
        return;
    }
    else{
        await newUser.save();
        res.status(200).json({message:"User registered successfully"});
    }
}

exports.loginUser = async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const emailValid = await user.findOne({email:email});
    if(emailValid){
        bcrypt.compare(password, emailValid.password, function(err, result) {
            if(result){
                const payload={
                    id:emailValid._id,
                    email:emailValid.email
                }
                const token=jwt.sign(payload,key,{expiresIn:3600});
                const data={
                    token:token,
                    name:emailValid.name,
                    email:emailValid.email
                }
                res.send(data);
                
            }
            else{
                res.status(400).json({message:"Password incorrect"});
            }
        });
    }
    else{
        res.status(400).json({message:"Email not found"});
    }
}

exports.getAllUsers = async (req,res)=>{
    const allUsers=await user.find();
    res.send(allUsers);
}
