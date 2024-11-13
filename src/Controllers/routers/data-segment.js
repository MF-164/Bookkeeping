const express = require('express')
const { getExpensesByMonth, getReceiptsByMonth, getExpensesByYear, getReceiptsByYear, getReceiptsByDateRange, getExpensesByDateRange } = require('../handlers/data-segment')
const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).json('welcome to data segment router')
    next()
})

router.get('/getExpensesByMonth/:month', getExpensesByMonth)
router.get('/getReceiptsByMonth/:month', getReceiptsByMonth)
router.get('/getExpensesByYear/:year', getExpensesByYear)
router.get('/getReceiptsByYear/:year', getReceiptsByYear)
router.get('/getReceiptsByDateRange/:startDate/:endDate', getReceiptsByDateRange);
router.get('/getExpensesByDateRange/:startDate/:endDate', getExpensesByDateRange);

module.exports = router