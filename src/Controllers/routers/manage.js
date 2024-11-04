const express = require('express');
const { handleCheckClientEmail, handleCheckClientEmailDefault, handleCreateClient, handleGetAllClients } = require('../handlers/manage');

const router = express.Router();

router.get('/checkClientEmail/:email', handleCheckClientEmail);
router.get('/checkClientEmail/', handleCheckClientEmailDefault);
router.post('/create', express.json(), handleCreateClient);
router.get('/getAllClients', handleGetAllClients)

module.exports = router;
