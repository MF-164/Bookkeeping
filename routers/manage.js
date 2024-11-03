const express = require('express')
const { createUser, existuserName } = require('../modules/users')

const router = express.Router()

router.get('/checkusername/:username', async (req, res) => {
    try {
        const { username } = req.params
        const exist = await existuserName(username)
        res.status(200).json({ exist })
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/checkusername/', (req, res) => {
    const exist = false
    res.status(200).json({ exist })
})


router.post('/create', express.json(), async (req, res) => {
    try {
        const user = req.body        
        const newUser = await createUser(user)
        res.status(201).send(newUser)
    }
    catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router