const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name : {
        type: String,
        required : [ true, "Category name required"],
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Category creator required"]
    }
})

module.exports = mongoose.model('Category', CategorySchema)