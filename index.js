const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

// OUR files
const router = require('./src/api/v1/Router/Routers');
// const {router} = require('./src/api/v1/Router/Routers');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: true}));


// ROUTERS
let apiVersion = '/api/v1';
app.use(`${apiVersion}`, router);

app.listen(process.env.APP_PORT, ()=>console.log(`server running on ${process.env.APP_PORT}`));











