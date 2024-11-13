const { getClient, openConnection, closeConnection } = require('../../../services/mongo/mongo-connection')
const { isConnected } = require('./mongo-helpers')

require('dotenv').config()
const { TEST_MONGO_SERVER } = process.env || "mongodb://127.0.0.1:27017"

describe('GET_CLIENT', () => {
    it('client should be defined', () => {
        const client = getClient()
        expect(client).toBeDefined()
    })

    it('client should return null (no connection)', () => {
        const client = getClient()
        expect(client).toBeNull()
    })

})

describe('OPEN_CONNECTION', () => {
    it('client should not be null when the connection is open', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient()
        expect(client).not.toBeNull()
    })

    it('client should be connected to mongoserver when connection is open', async () => {
        await openConnection(TEST_MONGO_SERVER)
        const client = getClient()
        const response = await isConnected(client)
        expect(response).toBeTruthy()
    })

    afterEach(async () => {
        const client = getClient()
        await client.close()
    })

    describe('EXCEPTION', () => {
        it('should throw not defined error when server url is undefined', async () => {
            expect.assertions(3)
            try {
                await openConnection(undefined)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('server is not defined')
            }
        })

        it('should throw error when server url is not a string', async () => {
            expect.assertions(3)
            try {
                await openConnection(45)
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('server url must be of type string')
            }
        })

        it('should throw error when server url is not start with "mongodb://" or "mongodb+srv://"', async () => {
            expect.assertions(3)
            try {
                await openConnection("0204")
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('server url must start with "mongodb://" or "mongodb+srv://"')
            }
        })

        it('should throw the caught exception', async () => {    
            try {
                await openConnection('mongodb://localhost:27017');
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('Connection error');
            }
        });
    })
})

describe('CLOSE_CONNECTION', () => {
    it('client should be null after closing the connection', async () => {
        await openConnection(TEST_MONGO_SERVER)
        await closeConnection()
        const client = getClient()
        expect(client).toBeNull()
    })

    describe('EXCEPTION', () => {
        it('should throw an error if trying to close a non-existing connection', async () => {
            expect.assertions(3)
            try {
                await closeConnection()
            } catch (error) {
                expect(error).toBeDefined()
                expect(error).toBeInstanceOf(Error)
                expect(error.message).toBe('Cannot close connection. Client is not connected.')
            }
        })
    })
})

describe('IS_CONNECTED', () => {
    it('should return true if there is a connection with the database', async () => {
        // Mock the client object with a connection
        const mockClient = {
            db: jest.fn().mockReturnThis(),
            command: jest.fn().mockResolvedValue({ ping: 'pong' })
        }

        const result = await isConnected(mockClient)
        expect(result).toBe(true)
    })

    it('should return false if there is no connection with the database', async () => {
        // Mock the client object without a connection
        const mockClient = {
            db: jest.fn().mockReturnThis(),
            command: jest.fn().mockRejectedValue(new Error('Connection failed'))
        }

        const result = await isConnected(mockClient)
        expect(result).toBe(false)
    })
})
