const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const router = require('./router/userrouter')
app.use(router)
app.use(express.static('public'))

app.listen(process.env.PORT, () => {
    console.log("port listened at " + process.env.PORT)
})