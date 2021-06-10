const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))



app.listen( PORT, () => console.log(`Server is running on port ${PORT}`))