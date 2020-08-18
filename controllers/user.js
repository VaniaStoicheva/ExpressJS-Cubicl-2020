const User=require('../models/user')
const bcrypt=require('bcrypt')
const  jwt  = require('jsonwebtoken')
const privateKey='PRIVATE-KEY11';

const saveUser=async(req,res)=>{
    const{
        username,
        password
    }=req.body
    
    //hashing
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
   
    const user=new User({
               username,
               password:hashedPassword
           })
   
    const userObject= await user.save()
    
    const token= jwt.sign({
        userId:userObject._id,
        username:userObject.username
    }, privateKey)

    res.cookie('authid',token)

    return true       
}

const verifyUser= async(req,res)=>{

    const{
        username,
        password
    }=req.body

    const user=await User.findOne({ username })

    const status=await bcrypt.compare(password,user.password)

    console.log(status)

    if(status){
        const token= jwt.sign({
            userId:user._id,
            username:user.username
        }, privateKey)
    
        res.cookie('authid',token)
    }
    
    

    return status
}

module.exports={
    saveUser,
    verifyUser
}