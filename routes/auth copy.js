const express = require('express')
const { saveUser, verifyUser, guestAccess, getUserStatus, checkAuthentication } = require('../controllers/user')
const router = express.Router()
const jwt = require('jsonwebtoken')


router.get('/login', guestAccess, getUserStatus, (req, res) => {
    res.render('loginPage', { isLoggedIn: req.isLoggedIn })
})

router.get('/signup', guestAccess, getUserStatus, (req, res) => {
    const error=req.query.error ? 'Username or password is not valid' : null;
    console.log(error)
    res.render('registerPage', { isLoggedIn: req.isLoggedIn, error})
})          

router.post('/signup', checkAuthentication, async (req, res) => {
    const { password } = req.body
    
    if (!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)) {
       res.redirect('/signup?error=true')
    }
    
    const { error } = await saveUser(req, res)
    
    if (error) {
        return res.redirect('/signup?error=true')
    }
    res.redirect('/')
})

router.post('/login', checkAuthentication, async (req, res) => {
    const status = await verifyUser(req, res)
    if (status) {
        return res.redirect('/')
    }
    res.redirect('/')
})

module.exports = router