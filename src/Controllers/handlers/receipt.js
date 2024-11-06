const { createReceipt, getAllReceiptsClient } = require('../../modules/receipt')

const handleCreateReceipt = async (req, res) => {
    try {
        const receipt = req.body;
        const newReciept = await createReceipt(receipt)

        res.status(200).json(newReciept)
    } catch (exception) {
        res.status(500).send(exception.message)
    }
}

const handleGetAllReceiptsClient = async (req, res) => {
    try {
        const { clientEmail } = req.params;
        
        const response = await getAllReceiptsClient(clientEmail)

        res.status(200).json(response)
    } catch (exception) {
        res.status(500).send(exception.message)
    }
}
module.exports = {
    handleCreateReceipt,
    handleGetAllReceiptsClient
}