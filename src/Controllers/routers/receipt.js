const express = require('express')
const { getAllclients } = require('../../modules/users')

const router = express.Router()

router.get('/', (req, res, next)=>{
    res.status(200).json('welcome to receipt router')
    next()
})

router.get('/getAllClients', async (req, res, next) =>{
    const response = await getAllclients()

    res.status(200).json(response)
})

module.exports = router