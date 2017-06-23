'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  if(req.method === 'POST' || req.method === 'PUT') {
    let text = '';
    req.on('data', (buf) => {
      text += buf.toString();
    });
    req.on('end', (err) => {
      req.text = text;
      try {
        req.body = JSON.parse(text);
        callback(null);
      } catch (err){
        callback(err);
      }
    });
    req.on('err', (err) => {
      req.body = {};
      req.text = '';
      callback(err);
    });
  } else {
    req.text = '';
    req.body = {};
    callback(null);
  }
};
