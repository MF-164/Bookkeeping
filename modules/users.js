const { v4 } = require('uuid')

const { MongoOperation } = require('../services/mongo/mongo-operation')

const mongoConnection = new MongoOperation('Bookkeeping')

const existuserName = async (username) => {
    try {
        mongoConnection.Collection = 'users'
        
        const response = await mongoConnection.find({ filter: { username } })

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

const createUser = async (user) => {
    //TODO: check user data    
    if (await existuserName(user.username)) {
        throw new Error(`userName ${user.username} exist in db`)
    }
    const id = v4()
    user.id = id
    try {
        mongoConnection.Collection = 'users'
        console.log('create collection `user`')
        const response = await mongoConnection.insertItem(user)
        const { acknowledged } = response
        if (acknowledged)
            return user
        else
            throw new Error(`user was not saved`)
    }
    catch (error) {
        throw error
    }
}

module.exports = {
    createUser,
    existuserName
}