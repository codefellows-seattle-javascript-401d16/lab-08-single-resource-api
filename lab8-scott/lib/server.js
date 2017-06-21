'use strict';

const http = require('http');
const uuid = require('uuid');

let climberPool = {};

router.post(`/api/climbers`, (req, res)=>{
  if(!req.body.age && !req.body.style) {
    res.writeHead(400);
    res.end();
    return;
  }
  //start of my object constructor on POST requests
  let climberProfile = {
    id: uuid.v1(),
    age: req.body.age,
    style: req.body.style,
  };
  //putting the new profile object from the POST request in to the climberpool object
  climberPool[climberProfile] = climberProfile;
  //respond that we recieved the request
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(climberProfile));
  res.end();
  return;
});






const server = module.exports = http.createServer((req, res) =>{

});
