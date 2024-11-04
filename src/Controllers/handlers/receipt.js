const { createReceipt } = require('../../modules/receipt')

const handleCreateReceipt = async (req, res) =>{
    try{
        const receipt = req.body;
        const newReciept = await createReceipt(receipt)

        res.status(200).json(newReciept)
    }catch(exception){
        res.status(500).send(error.massage)
    }
}

module.exports = {
    handleCreateReceipt
}