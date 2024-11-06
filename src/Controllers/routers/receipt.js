const express = require('express')
const { handleCreateReceipt, handleGetAllReceiptsClient } = require('../handlers/receipt')

const router = express.Router()

router.use(express.json())

router.post('/create', handleCreateReceipt)

router.get('/getAllReceiptsClient/:clientEmail', handleGetAllReceiptsClient)

module.exports = router