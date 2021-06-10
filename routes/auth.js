const User = require('../models/User')

const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @path        /api/auth/
// @method      POST
// @desc        Authenticate user
router.post('/',(req,res,next) =>{
    User.findOne({email: req.body.email})
    .then( user => {
        if (!user) next(new Error("Invalid Credentials"))
        return user
    })
    .then( user => {
        req.user = user
        return bcrypt.compare(req.body.password, user.password)
    })
    .then( isMatched =>{
        if (!isMatched) {
            next(new Error("Invalid Credentials"))
        } else {
            let token = jwt.sign({userId: req.user._id}, process.env.SECRET)
            req.user.password = undefined
            res.json({
                user : req.user,
                token
            })
        }
    })
    .catch(next)
})

module.exports = router