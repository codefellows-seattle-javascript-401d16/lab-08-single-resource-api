'use strict';

const url = require('url');
const querystring = require('querystring');

//take in the request to parse
module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  // need to parse the body
  if (req.method === `POST` || req.method === `PUT`) {
    let body = '';
    req.on('data', (buffer) =>{
      body += buffer.toString();
    });
    //try to parse the string if the header content type is application/json
    req.on('end', () => {
      req.text = body;
      try {
        req.body = JSON.parse(body);
        callback(null);
      } catch (err){
        callback(err);
      }
    });
    //if there's an error, callback the error and set the body/text to empty.
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
