'use strict';

const http = require('http');
const router = require('./router.js');
const ProfileConstructor = require('../model/profile-constructor.js');

let climberPool = {};

//start of the route for Create/Post. Start with create so we have something in the db to work with.
router.post('/api/climberprofile', (req, res)=>{
  if(!req.body.age && !req.body.type) {
    res.writeHead(400);
    res.write(`Please try this format {age: 27, type: trad}`);
    res.end();
    return;
  }
  //creating a new profile based on the parsed body from the post request
  let climberProfile = new ProfileConstructor(req.body.age, req.body.type);
  //putting the new profile id value as the key in the climberPool and set the new Profile as the value to that key id #
  climberPool[climberProfile.id] = climberProfile;
  //respond that we recieved the request
  res.writeHead(201, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(climberProfile));
  res.end();
  return;
});

//creating route for Read/Get
router.get('/api/climberprofile', (req, res) =>{
  console.log('server.js: hit the get req');
  if (!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.end();
    return;
  }
  if (!climberPool[req.url.query.id]) {
    console.log('breakpoint 1');
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    console.log('breakpoint 2');
    res.end();
    return;
  }
  console.log(`get router id: `, req.url.query.id);
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(climberPool[req.url.query.id]));
  res.end();
  return;
});

//creating route for DELETE
router.delete('/api/climberprofile', (req, res) =>{
  console.log('delete id: ', req.url.query.id);
  console.log('climberpool id: ', climberPool[req.url.query.id]);
  if (!climberPool[req.url.query.id]) {
    res.writeHead(404);
    // res.write(JSON.stringify(`No profile was found with that id`));
    res.end();
    return;
  }
  console.log('break point');
  //delete the profile with matching the id
  delete climberPool[req.url.query.id];
  res.writeHead(204, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(`You deleted profile ${req.url.query.id}`));
  res.end();
  return;
});

//creating route for Put
router.put(`/api/climberprofile`, (req, res) =>{
  if (!climberPool[req.url.query.id]) {
    res.writeHead(404);
    res.write(`No profile found with that id`);
    res.end();
    return;
  }
  if (!req.url.query.id) {
    res.writeHead(400);
    res.write(`Please input an id`);
    res.end();
    return;
  }
  //data is passed in the body request as stringified json. Set the new req body to the profile at that id.
  // climberPool[req.url.query.id] = req.body;
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(climberPool[req.url.query.id]));
  res.end();
  return;
});




const server = module.exports = http.createServer(router.route);
