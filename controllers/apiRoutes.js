/***************|
|* DEPENDECIES *| 
|***************/
/* GENERAL */
// Utilities for working with file and directory paths
const path = require('path');
// Load enviroment variables from .env into process.env
const envDir = path.join(__dirname, '../');
require('dotenv').config({ path: envDir });

/* WEB FRAMEWORKS */
// lightweight web framework for node server
const express = require('express');
// create instance of express router
const router = express.Router();

/* EMAIL SENDER */
// Sends email from GMAIL with Node.js
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'Gmail',
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
    tls: {
        rejectUnauthorized: false
    },
});

/* WEB SCRAPERS */
// tool for making HTTP calls
// Integrates Bluebird' promise library with request
const request = Promise.promisifyAll(require('request'));
// scraper that implements jQuery
const cheerio = require('cheerio');

/* WEB SCRAPERS */
// tool for making HTTP calls
const request = require('request');
// scraper that implements jQuery
const cheerio = require('cheerio');

/* DATABASE TOOLS*/
// Loads ObjectId class to search by ObjectId
const ObjectId = require('mongoose').Types.ObjectId;

/******************|
|* INITIALIZATION *| 
|******************/
/* SET UP FOLDER PATHS */
const mongoModelDir = path.join(__dirname, '..', 'db', 'models', 'mongoose-models');

/* TALK TO MODELS */
const collectionName = require(path.join(mongoModelDir, 'ExSchema.js'));

/*****************|
|* SET UP ROUTER *| 
|*****************/
/* SET ROUTES */
router.get('/', (req, res) => {
    collectionName.find({})
        .exec((error, data) => {
            res.json(data);
        })
});

router.post('/', (req, res) => {
});

router.delete('/', (req, res) => {
});

router.put('/', (req, res) => {
});

router.post('/email', (req, res) => {
    var testMail = {
        from: 'doesntshow@blah.com',
        to: process.env.USER,
        subject: 'this is the subject2',
        text: 'this sends if not html property',
        html: '<h1>this sends yup yup it does<h1>'
    }
    transporter.sendMail(testMail, (err, info) => {
        if (err) {
            console.log(err);
            res.send({ status: 404, text: 'FAIL' });
        }
        else {
            res.send({ status: 200, text: 'WIN' });
        }
        transporter.close();
    });
});

router.post('/scrap', (req, res) => {
    request
        .getAsync('http://website.com')
        .then((response) => {
            if (response.statusCode != 200) {
                console.log(`Exiting request: Page returned status code: ' ${response.statusCode}`);
            }
            return response.body;
        })
        .then((body) => {
            var $ = cheerio.load(body);
            res.end();
        })
        .catch((err) => {
            res.json(err);
        })
})

/***********|
|* EXPORTS *| 
|***********/
// Export instance of express router
module.exports = router;