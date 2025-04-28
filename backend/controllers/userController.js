const express = require("express");
const userModel= require("../models/userModel")
const bcrypt= require("bcrypt")

// create user register user
exports.registerController = async(req,res) => {
  try{
   const {username,email,password}= req.body
   if(!username || !email || !password){
      return res.status(400).json({"message":"Please fill all fields"})
   }
   //existing user
   const existingUser = await userModel.findOne({email})
   if(existingUser){
    return res.status(400).json({"message":"User already exist"});
   }
  const hashpassowrd= await bcrypt.hash(password,10)

  //  after all if email does not matched up 
  const user = new userModel({username,email,password:hashpassowrd});
  await user.save();
  return res.status(201).json({"message":"New user created",user});

  }catch(error){
    console.log(error);
    return res.status(500).send({
      message:"Error in register  callback",
      success: false,
      error
    })
    
  }
};


// get all users
exports.getAllUsers = async(req,res) => {
   try{
   const alluser= await userModel.find({});
   if(!alluser){
    return res.status(500).status({"message":"No data is present"});
   } 
   return res.status(200).json({userCount:alluser.length,alluser});
   }catch(error){
    console.log(error,"error in the GetallUsers");
    
   }
};

//login
exports.loginController = async(req,res) => {
  try{
  const {email,password}= req.body;
  if(!email || !password){
    return res.status(400).json({"message":"Please provide all the fields"})
  } 
  const user=  await userModel.findOne({email})
  if(!user){
    return res.status(404).json({"message":"Invalid Credentials"})
  }
  const ismatch= await bcrypt.compare(password,user.password);
  if(ismatch){
    return res.status(200).json({"message":"Login succesfully",user})
  }else{
    return res.status(400).json({"message":"Invalid Credentials"})
  }
  
  
  }catch(error){
  return res.status(401).json({"message":"Server error",error})
   
  }
};
