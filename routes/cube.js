const env=process.env.NODE_ENV || 'development'

const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const config=require('../config/config')[env]
const Cube=require('../models/cube')
const {checkAuthentication,getUserStatus}=require('../controllers/user')
const {getCubeWithAccessories}=require('../controllers/cube')

router.patch('/edit/:id',checkAuthentication,getUserStatus, async (req,res)=>{
    const {
        name,
        description,
        imageUrl,
        difficulty
    }=req.body
    const id=req.param.id

    const newData={};

    name && (newData.name=name)
    description && (newData.description=description)
    difficulty && (newData.difficulty=difficulty)
    imageUrl && (newData.imageUrl=imageUrl)

    await Cube.findByIdAndUpdate(id,newData)

    res.status(200).json({
        message:'Update successfully'
    })
    res.render('editCubePage',
    { isLoggedIn:req.isLoggedIn},
    { message:'Update successfully'}
    )
})

 router.get('/delete/:id',checkAuthentication,getUserStatus,async(req,res)=>{
    const id=req.param.id;
console.log(id)
    await Cube.findByIdAndDelete(id)

   

  res.status(200).json({
        message:"Cubes is deleted successfully", 
    }) 
   
    res.redirect('/') 
}) 

/* router.delete('/delete',async(req,res)=>{
    const {id}=req.body
    console.log(id)
    await Cube.findByIdAndDelete(id)

    res.status(200).json({
        message:"Cubes is deleted successfully"
    })
})  */

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