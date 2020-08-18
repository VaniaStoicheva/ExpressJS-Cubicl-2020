const { Router } = require('express')
const { getAllCubes, getCube, updateCube, getCubeWithAccessories } = require('../controllers/cube')
const { getAccessories } = require('../controllers/accessories')
const {getUserStatus}=require('../controllers/user')
const Cube = require('../models/cube')
const Accessory = require('../models/accessory')
const { update } = require('../models/cube')


const router = new Router()

router.get('/',getUserStatus, async (req, res) => {
    const cubes = await getAllCubes()

    res.render('index', {
        title: 'Cube workshop',
        cubes,
        isLoggedIn:req.isLoggedIn

    })

})

router.get('/about', getUserStatus, (req, res) => {
    res.render('about', {
        title: 'About |Cube workshop '
    })
})


module.exports = router



