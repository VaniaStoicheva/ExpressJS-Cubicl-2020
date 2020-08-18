const express=require('express')

const router=express.Router()

router.get('/edit',(req,res)=>{
    res.render('editCubePage')
})

router.get('/delete',(req,res)=>{
    res.render('deleteCubePage')
})

router.get('/create',(req,res)=>{
    res.render('create',{
        title:'Create Cube | Cube workshop'
    })
})

router.post('/create',(req,res)=>{
    
    const {
        name,
        description,
        imageUrl,
        difficulty
    }=req.body

    const cube = new Cube({
        name, description, imageUrl,  difficulty
    })
    //console.log(cube)
    cube.save((err)=>{
        
        if(err){
            console.error(err)
            res.redirect('/create')
        }else{
            res.redirect('/')
        }
        
    })

})

router.get('/details/:id',async(req,res)=>{

    //const cube=await getCube(req.params.id)
    const cube=await getCubeWithAccessories(req.params.id)
    
        res.render('details',{
            title:'Details  Cube |Cube workshop ',
            ...cube,
            
        })  
})

module.exports=router