const Record = require('../models/Record')
const { verifyUser } = require('../utils')

const router = require('express').Router()

// @path        /api/records
// @method      POST
// @desc        Create new record
router.post('/', verifyUser, (req,res,next)=>{

    Record.create({
        user: req.user._id,
        ...req.body
    })
    .then( record => {
        return Record.findById(record._id).populate("category")
    })
    .then( record => {
        res.send(record)
    })
    .catch( err => {
        console.log(err)
        if(err.name === "ValidationError"){
            next(new Error("Please check input fields"))
        } else if( err.name === "MongoError") {
            next(new Error("Email address already in use"))
        } else {
            next(err)
        }
    })
})

// @path        /api/records
// @method      GET
// @desc        Get all record
router.get('/', verifyUser, (req,res,next) =>{

    Record.find({user: req.user._id})
    .sort({date: 'desc',createdAt: 'desc'})
    .populate('category')
    .then( records => {
        res.send(records)
    })
    .catch(next)

})

// @path        /api/records/:id
// @method      GET
// @desc        Get all record
router.get('/:id', verifyUser, (req,res,next) =>{

    Record.findOne({user: req.user._id})
    .sort('-createdAt')
    .populate('category')
    .then( records => {
        res.send(records)
    })
    .catch(next)

})

// @path        /api/records/:id
// @method      PUT
// @desc        Update single record belongs to user
router.put('/:id', verifyUser, (req,res,next) =>{

    Record.findOneAndUpdate({
        user: req.user._id,
        _id: req.params.id
    },req.body, {new:true})
    .then( record => {
        if(record) {
            return Record.findById(record._id)
        }else{
            res.status(404)
            next(new Error("Not Found"))
        }
    })
    .then( record => res.send())
    .catch(next)

})

// @path        /api/records/:id
// @method      Delete
// @desc        Delete single record belongs to user
router.delete('/:id', verifyUser, (req,res,next) =>{

    Record.findOneAndDelete({
        user: req.user._id,
        _id: req.params.id
    })
    .then( record => {
        if(record) {
            res.send(record)
        }else{
            res.status(404)
            next(new Error("Not Found"))
        }
    })
    .catch(next)

})
module.exports = router