'use strict';

const http = require('http');
const router = require('./router.js');
const Record = require('../model/record.js');
const uuid = require('uuid');

require('../routes/records-routes.js');

const server = module.exports = http.createServer(router.route);
