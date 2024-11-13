const { MongoClient } = require('mongodb')

let client = null

async function openConnection(server) {
    if (server === undefined || server === null) {
        throw new Error('server is not defined')
    }
    if (typeof server !== 'string') {
        throw new Error('server url must be of type string')
    }
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
    try {
        if (client === null) {
            throw new Error('Cannot close connection. Client is not connected.');
        }
        
        await client.close();
        client = null; // Reset the client after closing the connection
    } catch (error) {
        throw error;
    }
}


const getClient = () => client

module.exports = { openConnection, closeConnection, getClient }