const express=require('express')

const router=express.Router()

router.get('/create/accessory',(req,res)=>{
    res.render('createAccessory',{
        title:'Create accessory'
    })
})

router.post('/create/accessory',async(req,res)=>{
    const{
        name,
        description,
        imageUrl
    }=req.body

    const accessory=new Accessory({
            name,
            description,
            imageUrl
        })

    await accessory.save()

    res.redirect('/create/accessory')
})

router.get('/attach/accessory/:id',async (req,res)=>{

    const cube=await getCube(req.params.id)
    const accessories= await getAccessories()

    const notAttachedAccessories=accessories.filter(acc=>{
       return !cube.accessories.includes(acc._id)
    })

    res.render('attachAccessory',{
        title:'Attach accessory',
        ...cube,
        accessories, notAttachedAccessories,
        isFullyAttached:cube.accessories.lenght===accessories.length
    })
})

router.post('/attach/accessory/:id',async (req,res)=>{

    const{
        accessory
    }=req.body

    await updateCube(req.params.id,accessory)
    res.redirect(`/details/${req.params.id}`)
})


module.exports=router