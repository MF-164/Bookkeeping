const { createExpense } = require('../../modules/expense')

const handleCreateExpense = async (req, res) => {
    try {
        const expense = req.body

        const response = await createExpense(expense)

        res.status(200).json(response)
    } catch (exception) {        
        console.log({exception});
        res.status(500).send(exception.errors)
    }
}

module.exports = {
    handleCreateExpense
}