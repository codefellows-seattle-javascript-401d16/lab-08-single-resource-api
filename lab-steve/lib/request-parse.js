'use strict';

const url = require('url');
const querystring = require('querystring');

module.exports = (req, callback) => {
  //convert URL to object
  req.url = url.parse(req.url);
  //convert the querystring into an object
  req.url.query = querystring.parse(req.url.query);

  // parse the body: turn buffer to string to parse JSON to object
  if(req.method === 'POST' || req.method === 'PUT'){
    let text = '';
    req.on('data', (buf) => {
      text  += buf.toString();
    });

    req.on('end', () => {
      req.text = text;
      try {
        req.body = JSON.parse(text);
        callback(null);
      } catch (err) {
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
