const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./db')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// connect to database
connectDB()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// Routes
app.use('/api/users', require('./routes/users'))

// Error handling middleware
app.use((err,req,res,next)=>{
    if( res.statusCode == 200) res.status(400)
    res.json({
        error: {
            message: err.message
        }
    })
})

app.listen( PORT, () => console.log(`Server is running on port ${PORT}`))