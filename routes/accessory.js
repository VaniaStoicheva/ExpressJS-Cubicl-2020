const express = require('express')
const router = express.Router()
const { checkAuthentication, getUserStatus } = require('../controllers/user')
const { getCube, updateCube } = require('../controllers/cube')
const { getAccessories } = require('../controllers/accessories')

router.get('/create/accessory', checkAuthentication, getUserStatus, (req, res) => {
    res.render('createAccessory', {
        title: 'Create accessory',
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/create/accessory',checkAuthentication, async (req, res) => {
    const {
        name,
        description,
        imageUrl
    } = req.body

    const accessory = new Accessory({
        name,
        description,
        imageUrl
    })

    await accessory.save()

    res.redirect('/create/accessory')
})

router.get('/attach/accessory/:id', checkAuthentication, getUserStatus, async (req, res) => {
    const cube = await getCube(req.params.id)
    const accessories = await getAccessories()

    const notAttachedAccessories = accessories.filter(acc => {
        return !cube.accessories.includes(acc._id)
    })

    res.render('attachAccessory', {
        title: 'Attach accessory',
        ...cube,
        accessories, notAttachedAccessories,
        isFullyAttached: cube.accessories.lenght === accessories.length,
        isLoggedIn: req.isLoggedIn
    })
})

router.post('/attach/accessory/:id',checkAuthentication, async (req, res) => {
    const {
        accessory
    } = req.body

    await updateCube(req.params.id, accessory)
    res.redirect(`/details/${req.params.id}`)
})


module.exports = router