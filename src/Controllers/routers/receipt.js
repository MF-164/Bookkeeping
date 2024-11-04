const express = require('express')
const { handleCreateReceipt } = require('../handlers/receipt')

const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json('welcome to receipt router')
    next()
})

router.post('/create', express.json(), handleCreateReceipt)

module.exports = router