const login = require('../middleware/login.js');
const express = require('express');
const router = express.Router();

router.post('/login', login);

module.exports = router;
