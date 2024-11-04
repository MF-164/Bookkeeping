const { createClient, existClientEmail } = require('../../modules/clients') 

const checkClientEmail = async (req, res) => {
    try {
        const { email } = req.params 
        const exist = await existClientEmail(email) 
        res.status(200).json({ exist }) 
    } catch (error) {
        res.status(500).send(error.message) 
    }
} 

const checkClientEmailDefault = (req, res) => {
    const exist = false 
    res.status(200).json({ exist }) 
} 

const createClientHandler = async (req, res) => {
    try {
        const client = req.body
        
        const newClient = await createClient(client)

        res.status(201).send(newClient) 
    } catch (error) {
        res.status(500).send(error.message) 
    }
}

module.exports = {
    checkClientEmail,
    checkClientEmailDefault,
    createClientHandler,
} 
