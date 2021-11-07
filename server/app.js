const express = require('express')
const app = express()
const connectToDB = require('./utils/db-connection')
var cors = require('cors')
const PORT = process.env.PORT || 3005

// Connecting to database
connectToDB()

// Middleware
app.use(express.json({ extended: false }))
app.use(cors())

// Routing
app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/auth/google', require('./routes/google-auth'))

// Starting server
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
