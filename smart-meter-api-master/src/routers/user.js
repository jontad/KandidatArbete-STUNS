const express = require('express');
const HttpStatus = require('http-status-codes');
const User = require('../models/user');
const router = new express.Router();

/* Settings */
let omitFields = '-_id -__v'

router.post('/api/register', async (req, res) => {
    console.debug("POST/api - Request received", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */

    res.status(HttpStatus.OK).send("OK");
});

module.exports = router;