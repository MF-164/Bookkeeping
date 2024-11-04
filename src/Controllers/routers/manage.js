const express = require('express');
const {checkClientEmail, checkClientEmailDefault, createClientHandler} = require('../handlers/manage');

const router = express.Router();

router.get('/checkClientEmail/:email', checkClientEmail);
router.get('/checkClientEmail/', checkClientEmailDefault);
router.post('/create', express.json(), createClientHandler);

module.exports = router;
