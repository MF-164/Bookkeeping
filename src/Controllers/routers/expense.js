const express = require('express');
const { handleCreateExpense } = require('../handlers/expense');

const router = express.Router();

router.get('/', (req, res) =>{
    res.status(200).send('wellcome to expense router')
})

router.post('/create', express.json(), handleCreateExpense)

module.exports = router
