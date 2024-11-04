// 'ping' -if have connection with database the function return 'pong'

const testConnection = async (client) => {
    await client.db('admin').command({ ping: 1 })
}

const isConnected = async (client) => {
    try {
        await testConnection(client)
        return true
    }
    catch {
        return false
    }
}
module.exports = { isConnected }