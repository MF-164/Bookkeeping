const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

const manage_router = require('./routers/manage')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome' })
})

app.use(cors())
app.use('/manage',manage_router)

module.exports = app