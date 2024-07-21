const express = require('express')
const db= require('./config/db.js')
const app= express()
require('dotenv').config()
const PORT = process.env.PORT || 8000
app.use(express.json())

const userRoute= require('./routes/userRoutes.js')
app.use('/api/users', userRoute)

const inventoryRoute= require('./routes/inventoryRoutes.js')
app.use('/api/inventory', inventoryRoute)

app.listen(PORT, ()=>{
    console.log(`Server Listening at port:${PORT}`)
})