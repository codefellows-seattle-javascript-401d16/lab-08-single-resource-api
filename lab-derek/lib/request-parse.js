'use strict';

const url = require('url');
const querystring = require('querystring');

//TODO*DONE: Create a body parser to parse the json in the body of POST and PUT requests
//TODO*DONE: Create a url parser that uses nodes url and querystring modules parse the request url

module.exports = (req, callback) => {

  //TODO*DONE: Create a url parser that uses nodes url and querystring modules parse the request url

  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  //TODO*DONE: Create a body parser to parse the json in the body of POST and PUT requests

  if (req.method === 'POST' || req.method === 'PUT'){
    let text = '';
    req.on('data', (buf) => {
      text += buf.toString();
    });
    req.on('end', (err) => {
      req.text = text;
      try{
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
    req.body = {};
    req.text = '';
    callback(null);
  }
};
