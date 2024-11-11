const { MongoOperation } = require('../services/mongo/mongo-operation')
const { expenseValidation } = require('../services/Validations/expense')

const mongoConnection = new MongoOperation('Bookkeeping')
let expenseIds = 100

const createExpense = async (expense) => {
    const valid = expenseValidation(expense)

    if (!valid.valid) {
        const errorMessages = valid.error.map(error => error.message);
        throw { errors: errorMessages };
    }

    expense.id = expenseIds++
    try {
        mongoConnection.Collection = 'expenses'
        const response = await mongoConnection.insertItem(expense)
        const { acknowledged } = response
        if (acknowledged)
            return expense
        else
            throw new Error(`expense was not saved`)
    }
    catch (error) {
        throw error
    }
}


module.exports = {
    createExpense
}