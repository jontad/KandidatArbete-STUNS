#!/usr/bin/env node
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');

const app = express();
const port = process.env.APP_PORT || 3000;
const hostname = require('ip').address();
const app_ver = process.env.APP_VERSION;

require('./db/mongoose');
const userRouter = require('./routers/user');
const smartMeterRouter = require('./routers/smartMeter');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(smartMeterRouter);
app.use(userRouter);

/* == Error Handler == */
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Something broke!')
});

/* == Start listening == */
app.listen(port, () => {
    console.info(`=== Smart Meter Backend v${app_ver} ===`)
    console.info(`Listening -> ${hostname}:${port}`);
});

