const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

const manage_router = require('./src/Controllers/routers/manage')
const receipt_router = require('./src/Controllers/routers/receipt')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome' })
})

app.use(cors())

app.use('/manage',manage_router)

app.use('/receipt', receipt_router)

module.exports = app