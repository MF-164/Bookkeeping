const { getClient } = require("./mongo-connection.js")


class MongoOperation {

    constructor(dbName) {
        this.databaseName = dbName        
    }

    set Collection(value) {
        this.myCollection = getClient().db(this.databaseName).collection(value)        
    }

    get Collection() {
        return this.myCollection.collectionName
    }

    async insertItem(document) {
        const resalt = await this.myCollection.insertOne(document)
        return resalt
    }

    async insertList(documents) {
        const resalt = await this.myCollection.insertMany(documents)
        return resalt
    }

    async find({ filter = {} } = {}) {
        const resalt = await this.myCollection.find(filter).toArray()
        return resalt
    }
}

module.exports = { MongoOperation }