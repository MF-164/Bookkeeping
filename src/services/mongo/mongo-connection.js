const { MongoClient } = require('mongodb')

let client = null

async function openConnection(server) {
    if (server === undefined || server === null) {
        throw new Error('server is not defined')
    }
    if (typeof server !== 'string') {
        throw new Error('server url must be of type string')
    }
    // trim - פונקציה שמורידה רווחים מיותרים במשפט בהתחלה ובסוף
    if (!server.trim().startsWith('mongodb://') && !server.trim().startsWith('mongodb+srv://')) {
        throw new Error('server url must start with "mongodb://" or "mongodb+srv://"')
    }
    try {
        client = new MongoClient(server)
        await client.connect()        
    }
    catch (exception) {
        throw exception
    }
}

async function closeConnection() {
    await client.close()
}

const getClient = () => client

module.exports = { openConnection, closeConnection, getClient }