'use strict';

const url = require('url')
const querystring = require('querystring');

// this modudle will parse the url into an object
// and it will parse the data sent by a post or put request 
// and add the text sent to the to the request object 
// and add the parsed JSON to the body of the request

//req.url is now an object
//req.text is the text send by the client (unparsed json)
//req.body is the parsed json send by the client

// callback signature is (err) => undefined
module.exports = (req, callback) => {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);

  // parse the body 
  if(req.method === 'POST' || req.method === 'PUT'){
    let text = ''
    req.on('data', (buf) => {
      text  += buf.toString()
    })

    req.on('end', (err) => {
      // try and parse the string if its header.content-type === application json
      req.text = text;
      try {
        req.body = JSON.parse(text);
        callback(null)
      } catch (err){
        callback(err);
      }
    })

    req.on('err', (err) => {
      req.body = {}
      req.text = ''
      callback(err)
    })
  } else {
    req.text = ''
    req.body = {};
    callback(null)
  }
}


