const express = require('express')
const cors = require('cors')

const app = express()

require('dotenv').config()

const manage_router = require('./src/Controllers/routers/manage')
const expense_router = require('./src/Controllers/routers/expense')

app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome' })
})

app.use(cors())
app.use('/manage',manage_router)

app.use('/expense', expense_router)

module.exports = app