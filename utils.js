const jwt = require('jsonwebtoken')
const User = require('./models/User')

// @desc        
    // verify users Bearer Token auth
    // set verified user to req.user
module.exports.verifyUser = (req,res,next) =>{
    let authorization = req.headers.authorization
    if(!authorization) {
        res.status(401)
        throw new Error("Unauthorize")
    }
    
    try {
        let token = authorization.slice(7,authorization.length)
        let decoded = jwt.verify(token, process.env.SECRET)
        
        console.log(decoded)
        User.findById(decoded.userId).select({password: 0})
        .then( user => {
            if(!user) {
                res.status(401)
                next(new Error("Unauthorize"))
            } else {
                req.user = user
                next()
            }
        })
    } catch{
        res.status(401)
        next(new Error("Unauthorize"))
    }

}