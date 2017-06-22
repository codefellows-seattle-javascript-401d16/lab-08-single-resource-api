'use strict';
const http = require('http');
const router = require('./router.js');
const users = require('../model/users.js');

//create server
const server = module.exports = http.createServer(router.route);
