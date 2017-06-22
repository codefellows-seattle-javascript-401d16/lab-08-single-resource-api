'use strict';

const http = require('http');
const router = require('./router.js');
const Profileconstructor = require('../model/profile-constructor.js');

let climberPool = {};

router.post(`/api/climbers`, (req, res)=>{
  if(!req.body.age && !req.body.style) {
    res.writeHead(400);
    res.end();
    return;
  }
  //creating a new profile based on the parsed body from the post request
  let newClimberProfile = new Profileconstructor(req.body.age, req.body.style);
  //putting the new profile id value as the key in the climberPool and set the new Profile as the value to that key id #
  climberPool[newClimberProfile.id] = newClimberProfile;
  //respond that we recieved the request
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(newClimberProfile));
  res.end();
  return;
});

//creating routes for Create/Post Read/Get and Delete/delete
router.post(`/api/climberprofile`, (req, res) =>{
  res.writeHead(200, {
    /////continue on
  });
});




const server = module.exports = http.createServer((req, res) =>{

});
