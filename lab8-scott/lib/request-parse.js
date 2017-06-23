'use strict';

const url = require('url');
const querystring = require('querystring');

//take in the request to parse
module.exports = (req, callback) => {
  console.log('req url: ',req.url);
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('req url query: ', req.url.query);
  // need to parse the body
  if (req.method === `POST` || req.method === `PUT`) {
    let body = '';
    req.on('data', (buffer) =>{
      body += buffer.toString();
    });
    //try to parse the string if the header content type is application/json
    req.on('end', (err) => {
      req.text = body;
      console.log('req text: ',req.text);
      try {
        req.body = JSON.parse(body);
        console.log('req body: ',req.body);
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
