const mongoose = require('mongoose')

const RecordSchema = new mongoose.Schema({
    category : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required : [ true, "Record category required"],
    },
    amount : {
        type: Number,
        required : [ true, "Records amount required"],
        min: 0
    },
    type: {
        type: String,
        required: [true, "Record type required"],
        enum: ["income","expense"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Record creator required"]
    },
    date: {
        type: Date,
        default: new Date()
    }
},{ timestamps: true })

module.exports = mongoose.model('Record', RecordSchema)