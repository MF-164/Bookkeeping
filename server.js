require('dotenv').config()

const http = require('http')
const app = require('./app')

const { openConnection, closeConnection } = require('./src/services/mongo/mongo-connection')

const { HOST, PORT, TEST_MONGO_SERVER } = process.env

openConnection(TEST_MONGO_SERVER).then(_ => {
    app.listen(PORT || 3000, HOST || "127.0.0.1", () => {
        console.log(`http://${HOST}:${PORT}`)
    })

    const server = http.createServer(app)
}).catch(ex => {
    console.log(ex);
})

