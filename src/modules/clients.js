const { v4 } = require('uuid')

const { MongoOperation } = require('../services/mongo/mongo-operation')

const { clientValidation } = require('../services/Validations/client')

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
    const valid = clientValidation(client)

    if (!valid.valid) {
        const errorDetails = valid.error
        const errorMessage = generateErrorMessage(errorDetails)
        throw new Error(errorMessage)
    } if (await existClientEmail(client.email)) {
        throw new Error(`client email ${client.email} exist in db`)
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

const generateErrorMessage = (errorDetails) => {
    if (errorDetails.length > 0) {
        const error = errorDetails[0]
        const fieldName = error.path[0]
        const invalidValue = error.context.value

        let errorMessage = `The field "${fieldName}" with value "${invalidValue}" is not valid.`

        if (error.type === 'string.pattern.base') {
            errorMessage += ` It should only contain letters.`
        } else if (error.type === 'string.email') {
            errorMessage += ` The email address is invalid.`
        }

        return errorMessage
    }

    return 'An error occurred during validation.'
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