'use strict';

const http = require('http');
const uuid = require('uuid');
const router = require('./router.js');

const server = module.exports = {};

server.bodyparse = (req, callback) => {
  if(req.method === 'POST' || req.method === 'PUT') {
    let body = '';
    req.on('data', (buf) => {
      body += buf.toString();
    });
    req.on('end', () => callback(null, body));
    req.on('error', (err) => callback(err));
  } else {
    callback(null, '{}');
  }
};
