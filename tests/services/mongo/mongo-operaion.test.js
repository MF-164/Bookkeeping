const { MongoClient } = require('mongodb')
const { MongoOperation } = require('../../../services/mongo/mongo-operation')
const { openConnection, closeConnection } = require('../../../services/mongo/mongo-connection')

require('dotenv').config()
const { TEST_MONGO_SERVER, TEST_MONGO_COLLECTION, TEST_MONGO_DB } = process.env || "mongodb://127.0.0.1:27017"

describe('MongoOperation', () => {
    let mongoOperation
    let connectionClosed = false
    let initialData = null

    beforeAll(async () => {
        await openConnection(TEST_MONGO_SERVER)
        mongoOperation = new MongoOperation(TEST_MONGO_DB)
        mongoOperation.Collection = TEST_MONGO_COLLECTION
    })

    beforeEach(async () => {
        // Store the initial data before each test
        initialData = await mongoOperation.myCollection.find().toArray()
    })

    afterEach(async () => {
        // Reset the collection to the initial state after each test
        await mongoOperation.myCollection.deleteMany({})
        if (initialData && initialData.length > 0) {
            await mongoOperation.myCollection.insertMany(initialData)
        }
    })

    it('should set the collection correctly', () => {
        expect(mongoOperation.Collection).toBe(TEST_MONGO_COLLECTION)
    })

    it('should insert a single item', async () => {
        await mongoOperation.insertItem({ name: 'item1' })
        const insertedItem = await mongoOperation.myCollection.findOne({ name: 'item1' })

        expect(insertedItem.name).toEqual('item1')
    })

    it('should insert a list of items', async () => {
        const expectedItems = [{ name: 'item1' }, { name: 'item2' }]

        await mongoOperation.insertList(expectedItems)

        const insertedItems = await mongoOperation.myCollection.find().toArray()

        expect(insertedItems.some(item => item.name === 'item1')).toBe(true)
        expect(insertedItems.some(item => item.name === 'item2')).toBe(true)
    })

    it('should find documents based on filter', async () => {
        // Insert the document into the collection
        await mongoOperation.insertItem({ category: 'tech' })

        // Query the collection for documents with category 'tech'
        const result = await mongoOperation.find({ filter: { category: 'tech' } })

        // Expect the result to contain the inserted document
        expect(result.some(item => item.category === 'tech')).toBe(true)
    })

    afterAll(async () => {
        if (!connectionClosed) {
            await closeConnection()
            connectionClosed = true
        }
    })
})
