const express = require('express')
const { createClient, existClientEmail } = require('../modules/users')

const router = express.Router()

router.get('/checkClientEmail/:email', async (req, res) => {
    try {
        const { email } = req.params
        const exist = await existClientEmail(email)
        res.status(200).json({ exist })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/checkClientEmail/', (req, res) => {
    const exist = false
    res.status(200).json({ exist })
})


router.post('/create', express.json(), async (req, res) => {
    try {
        const client = req.body        
        const newClient = await createClient(client)
        res.status(201).send(newClient)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router