const env=process.env.NODE_ENV || 'development'

const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const config=require('../config/config')[env]
const Cube=require('../models/cube')
const {checkAuthentication,getUserStatus}=require('../controllers/user')
const {getCubeWithAccessories}=require('../controllers/cube')

router.get('/edit',checkAuthentication,getUserStatus,(req,res)=>{
    res.render('editCubePage',{ isLoggedIn:req.isLoggedIn})
})

router.get('/delete',checkAuthentication,getUserStatus,(req,res)=>{
    res.render('deleteCubePage',{ isLoggedIn:req.isLoggedIn})
})

router.get('/create',checkAuthentication,getUserStatus,(req,res)=>{
    res.render('create',{
        title:'Create Cube | Cube workshop',
        isLoggedIn:req.isLoggedIn
    })
})

router.post('/create',checkAuthentication,async(req,res)=>{
    
    const {
        name,
        description,
        imageUrl,
        difficulty
    }=req.body

    const token=req.cookies['authid']
    const decodedObject=jwt.verify(token,config.privateKey)
    //console.log(decodedObject)
    
    const cube = new Cube({
        name:name.trim(), 
        description:description.trim(), 
        imageUrl,  
        difficulty, 
        creatorId:decodedObject.userId
    })
    //console.log(cube)

    try{
        await cube.save()
        res.render('create',{
            isLoggedIn:true,
        })
    }catch(err){
        res.render('create',{
            title:'Create Cube | Cube workshop',
            isLoggedIn:true,
            error:"Cube details are not valid"
        })
    }
   
})

router.get('/details/:id',checkAuthentication,getUserStatus, async(req,res)=>{

    //const cube=await getCube(req.params.id)
    const cube=await getCubeWithAccessories(req.params.id)
    
        res.render('details',{
            title:'Details  Cube |Cube workshop ',
            ...cube,
            isLoggedIn:req.isLoggedIn
        })  
})

module.exports=router