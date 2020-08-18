const {Router}=require('express')
const { getAllCubes,getCube,updateCube,getCubeWithAccessories}=require('../controllers/cube')
const { getAccessories}=require('../controllers/accessories')
const Cube =require('../models/cube')
const Accessory=require('../models/accessory')
const { update } = require('../models/cube')


const router= new Router()

router.get('/',async (req,res)=>{
    const cubes=await getAllCubes()
        res.render('index',{
            title:'Cube workshop',
            cubes
    
    })
   
})

router.get('/about',(req,res)=>{
    res.render('about',{
        title:'About |Cube workshop '
    })
})


module.exports=router
    
  
   
