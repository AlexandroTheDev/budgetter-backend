const Category = require('../models/Category')
const Record = require('../models/Record')
const { verifyUser } = require('../utils')

const router = require('express').Router()

// @path        /api/categories
// @method      POST
// @desc        Create new category
router.post('/', verifyUser, (req,res,next) =>{
    Category.create({
        name: req.body.name,
        user: req.user._id
    })
    .then( category =>{
        res.send(category)
    })
    .catch( err =>{
        if(err.name === "ValidationError"){
            next(new Error("Please check input fields"))
        } else {
            next(err)
        }
    })
})

// @path        /api/categories
// @method      GET
// @desc        Retrieve all category belong to user
router.get('/', verifyUser, (req,res,next) => {
    Category.find({
        user : req.user.id,
    })
    .then( categories => {
        res.send(categories)
    })
    .catch(next)
})

// @path        /api/categories/:id
// @method      GET
// @desc        Retrieve single category belong to user
router.get('/:id', verifyUser, (req,res,next) => {
    Category.findOne({
        user : req.user.id,
        _id : req.params.id
    })
    .then( category => {
        if(category){
            res.send(category)
        } else{
            res.status(404)
            next(new Error("Not Found"))
        }
    })
    .catch(next)
})

// @path        /api/categories/:id
// @method      PUT
// @desc        Update single category belong to user
router.put('/:id', verifyUser, (req,res,next) => {
    Category.findOneAndUpdate({
        user : req.user.id,
        _id : req.params.id
    }, req.body, {new:true})
    .then( category => {
        if(category){
            res.send(category)
        } else{
            res.status(404)
            next(new Error("Not Found"))
        }
    })
    .catch(next)
})

// @path        /api/categories/:id
// @method      Delete
// @desc        Remove single category belong to user
router.delete('/:id', verifyUser, (req,res,next) => {
    Record.deleteMany({ category : req.params.id})
    .then( records => {

        return Category.findOneAndDelete({
            user : req.user.id,
            _id : req.params.id
        })
    })
    .then( category => {
        if(category){
            res.send(category)
        } else{
            res.status(404)
            next(new Error("Not Found"))
        }
    })
    .catch(next)
})
module.exports = router