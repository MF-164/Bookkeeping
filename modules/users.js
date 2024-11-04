const { v4 } = require('uuid')

const { MongoOperation } = require('../services/mongo/mongo-operation')

const mongoConnection = new MongoOperation('Bookkeeping')

const existClientEmail = async (clientEmail) => {
    try {
        mongoConnection.Collection = 'clients'

        const response = await mongoConnection.find({ filter: { email: clientEmail } })

        if (response.length > 0) {
            return true
        }
        else {
            return false
        }
    }
    catch (error) {
        throw error
    }
}

const createClient = async (client) => {
    //TODO: check client data    
    if (await existClientEmail(client.email)) {
        throw new Error(`clientEmail ${client.email} exist in db`)
    }
    const id = v4()
    client.id = id
    try {
        mongoConnection.Collection = 'clients'
        const response = await mongoConnection.insertItem(client)
        const { acknowledged } = response
        if (acknowledged)
            return client
        else
            throw new Error(`client was not saved`)
    }
    catch (error) {
        throw error
    }
}

const getAllclients = async () => {
    try {
        mongoConnection.Collection = 'clients'

        const response = await mongoConnection.find()

        return response
    } catch (exception) {
        throw exception
    }
}

module.exports = {
    createClient,
    getAllclients,
    existClientEmail
}