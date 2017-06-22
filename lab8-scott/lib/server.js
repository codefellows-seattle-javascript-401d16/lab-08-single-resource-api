'use strict';

const http = require('http');
const router = require('./router.js');
const ProfileConstructor = require('../model/profile-constructor.js');

let climberPool = {};

//start of the route for Create/Post. Start with create so we have something in the db to work with.
router.post(`/api/climberprofile`, (req, res)=>{
  if(!req.body.age && !req.body.style) {
    res.writeHead(400);
    res.write(`Please try this format {age: 27, style: trad}`);
    res.end();
    return;
  }
  console.log('server.js: ', climberProfile);
  //creating a new profile based on the parsed body from the post request
  let climberProfile = new ProfileConstructor(req.body.age, req.body.style);
  //putting the new profile id value as the key in the climberPool and set the new Profile as the value to that key id #
  climberPool[climberProfile.id] = climberProfile;
  //respond that we recieved the request
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(climberProfile));
  res.end();
  return;
});

//creating route for Read/Get
router.get(`/api/climberprofile`, (req, res) =>{
  if (!climberPool[req.url.query]) {
    res.writeHead(404);
    res.write(`No profile found with that id`);
    res.end();
    return;
  }
  if (!req.url.query) {
    res.writeHead(400);
    res.write(`Please input an id`);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(`Here is the requested profile\n ${climberPool[req.url.query]}`);
  res.end();
  return;
});

//creating route for DELETE
router.delete(`/api/climberprofile`, (req, res) =>{
  if (!climberPool[req.url.query]) {
    res.writeHead(404);
    res.write(`No profile was found with that id`);
    res.end();
    return;
  }
  //delete the profile with matching the id
  delete climberPool[req.url.query];
  res.writeHead(204, {
    'Content-Type' : 'application/json',
  });
  res.write(`You deleted profile ${req.url.query}`);
  res.end();
  return;
});

//creating route for Put
router.get(`/api/climberprofile`, (req, res) =>{
  if (!climberPool[req.url.query]) {
    res.writeHead(404);
    res.write(`No profile found with that id`);
    res.end();
    return;
  }
  if (!req.url.query) {
    res.writeHead(400);
    res.write(`Please input an id`);
    res.end();
    return;
  }
  //data is passed in the body request as stringified json. Set the new req body to the profile at that id.
  climberPool[req.url.query] = req.body;
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(climberPool[req.url.query]);
  res.end();
  return;
});




const server = module.exports = http.createServer(router.route);
