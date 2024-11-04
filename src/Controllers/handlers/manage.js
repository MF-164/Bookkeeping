const { createClient, existClientEmail, getAllclients } = require('../../modules/users');

const handleCheckClientEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const exist = await existClientEmail(email);
        res.status(200).json({ exist });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const handleCheckClientEmailDefault = (req, res) => {
    const exist = false;
    res.status(200).json({ exist });
};

const handleCreateClient = async (req, res) => {
    try {
        const client = req.body;
        const newClient = await createClient(client);
        res.status(201).send(newClient);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const handleGetAllClients = async (req, res, next) => {
    const response = await getAllclients()

    res.status(200).json(response)
}

module.exports = {
    handleCheckClientEmail,
    handleCheckClientEmailDefault,
    handleCreateClient,
    handleGetAllClients
};
