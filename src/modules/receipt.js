const { v4 } = require('uuid')
const { MongoOperation } = require('../services/mongo/mongo-operation')

const mongoConnection = new MongoOperation('Bookkeeping')

const createReceipt = async (receipt) =>{
    //TODO: check receipt details

    const id = v4()
    receipt.id = id
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

module.exports = {
    createReceipt
}