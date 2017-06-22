'use strict';

const url = require('url');
const querystring = require('querystring');


module.exports = (req, callback) =>{
  
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  if(req.method === 'PUT' || req.method === 'POST'){
    let bodyStr = '';

    req.on('data', (buff)=>{
      bodyStr += buff.toString();
    });

    req.on('end', (err) =>{
      if(err){
        callback(err);
        return;
      }
      try {
        req.body = JSON.parse(bodyStr);
        callback(null);
      } catch (error) {
        callback(err);
      }
    });

    req.on('error', (err) =>{
      req.body = {};
      callback(err);
    });
  }else{
    req.body = {};
    callback(null);
  }
};
