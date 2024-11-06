const { MongoOperation } = require('../services/mongo/mongo-operation')
const { receiptValidation } = require('../services/Valadtions/receipt')
const { existClientEmail } = require('./users')

const mongoConnection = new MongoOperation('Bookkeeping')
let receiptIds = 100

const createReceipt = async (receipt) => {
    const valid = receiptValidation(receipt)

    if (!valid.valid) {
        const errorMessages = valid.error.map(error => error.message);
        throw { errors: errorMessages };
    }
    if (existReceiptDate(receipt.date))
        throw new Error(`receipt date ${receipt.date} exist in db`)

    receipt.id = receiptIds++
    try {
        mongoConnection.Collection = 'receipts'
        const response = await mongoConnection.insertItem(receipt)
        const { acknowledged } = response

        if (acknowledged)
            return receipt
        else
            throw new Error(`receipt was not saved`)
    }
    catch (error) {
        throw error
    }

}

const existReceiptDate = async (date) => {
    try {
        mongoConnection.Collection = 'receipts'

        const response = await mongoConnection.find({ filter: { date } })

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

const getAllReceiptsClient = async (clientEmail) => {
    try {
        if (!existClientEmail)
            throw new Error(`client email ${clientEmail} is not exist in db`)

        const response = await mongoConnection.find({ filter: { clientEmail } })

        if (response.length > 0)
            return response
        else
            throw new Error(`this client dont have receipts`)
    } catch (error) {
        throw error
    }
}

module.exports = {
    createReceipt,
    existReceiptDate,
    getAllReceiptsClient
}