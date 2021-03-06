const mongoose = require('mongoose')

module.exports = () =>{
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify : false
    })
    .then(() => console.log("Connected to database"))
    .catch( err =>{
        console.error(err.message)
        process.exit(1)
    })

}