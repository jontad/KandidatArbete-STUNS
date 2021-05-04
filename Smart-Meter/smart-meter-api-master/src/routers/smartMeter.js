const express = require('express');
const HttpStatus = require('http-status-codes');
const SmartMeter = require('../models/smartMeter');
const router = new express.Router();

/* Settings */
let omitFields = '-_id -__v'

/**
 * === API Endpoint for POST ===
 * Endpoint for which to receive data from a Meter.
 * 
 * Should be of JSON type,
 * Required fields:
 * - See smartMeterData Model.
 * 
 */
router.post('/api', async (req, res) => {
    console.debug("POST/api - Request received", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */

    const data = new SmartMeter(req.body);

    try {
        await data.save();
        res.status(HttpStatus.CREATED).send(data);
    } catch (error) {
        console.debug("POST/Error", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */
        console.error('Error:', error);

        res.status(HttpStatus.BAD_REQUEST).send(error);
    }
});

/**
 * === API Endpoint for GET - DEBUG ===
 * Request all datapoints for any and all meters.
 * 
 */
router.get('/api', async (req, res) => {
    console.debug("GET/api - Request received", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */

    try {
        const data = await SmartMeter.find({}, omitFields);
        res.status(HttpStatus.OK).send(data);
    } catch (error) {
        console.error('Error:', error);

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(); 
    }
});

/**
 * === API Endpoint for GET - All ===
 * Request for data by specific MeterID.
 * Returns all datapoints for a Meter.
 * 
 * MeterId: Unique string specific for a Smart Meter.
 */
router.get('/api/:meterId', async (req, res) => {
    console.info("GET/api/:meterId - Request received", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */
    
    const meterId = req.params.meterId;
    console.info("\tMeterID = " + meterId);

    try {
        const data = await SmartMeter.find({ MeterID: meterId }, omitFields);

        if (!data) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }

        res.status(HttpStatus.OK).send(data);
    } catch (error) {
        console.error('Error:', error);

        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

/**
 * === API Endpoint for GET - Latest ===
 * Request for data by specific MeterID.
 * Returns the latest entry.
 * 
 * MeterId: Unique string specific for a Smart Meter.
 */
router.get('/api/:meterId/latest', async (req, res) => {
    console.info("GET/api/:meterId/latest - Request received", req.headers['x-forwarded-for'] || req.connection.remoteAddress); /* DEBUG */
    const meterId = req.params.meterId;
    console.info("\tMeterID = " + meterId);

    try {
        const data = await SmartMeter.findOne({ MeterID: meterId }, omitFields, { sort: { '_id': -1 } });

        if (!data) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }

        res.status(HttpStatus.OK).send(data);
    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

/**
 * === API Endpoint for GET - Date ===
 * Request for data by specific MeterID and Date.
 * Returns all datapoints for a Meter since supplied date.
 * 
 * MeterId: Unique string specific for a Smart Meter.
 * Date: An ISO date string formatted as YYYY-MM-DD
 */
router.get('/api/:meterId/since/:date', async (req, res) => {
    console.info('GET/api/:meterId/since/:date', req.headers['x-forwarded-for'] || req.connection.remoteAddress);
    const meterId = req.params.meterId;
    const date = req.params.date;

    try {
        const data = await SmartMeter.find({ MeterID: meterId, Timestamp: { $gte: date } }, omitFields);

        if (!data) {
            return res.status(HttpStatus.NOT_FOUND).send();
        }

        res.status(HttpStatus.OK).send(data);

    } catch (error) {
        console.error(error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
});

module.exports = router;