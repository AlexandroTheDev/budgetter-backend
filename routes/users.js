const router = require('express').Router()
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// @path        /api/users
// @method      POST
// @desc        Register user
router.post('/', (req,res,next)=>{
    let { password, confirmPassword } = req.body
    if (password.length < 8) throw new Error("Password must be atleast 8 characters")
    if (password !== confirmPassword) throw new Error("Passwords should matched")

    bcrypt.hash(password, parseInt(process.env.SALTROUNDS))
    .then( hashedPassword =>{
        req.body.password = hashedPassword
        return User.create(req.body)
    })
    .then( user => {
        let token = jwt.sign({userId: user._id}, process.env.SECRET)
        user.password = undefined
        res.json({
            token
        })
    })
    .catch( err => {
        console.log(err.name)
        if(err.name === "ValidationError"){
            next(new Error("Please check input fields"))
        } else if( err.name === "MongoError") {
            next(new Error("Email address already in use"))
        } else {
            next(err)
        }
    })
})

module.exports = router;