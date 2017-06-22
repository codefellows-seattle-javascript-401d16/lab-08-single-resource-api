'use strict';

const http = require('http');
const router = require('./router.js');

const Waypoint = require('../model/Waypoint.js');

var storage = {};

router.post('/api/waypoints', (req, res) => {

  if(!req.body.name && !req.body.lat && !req.body.long && !req.body.desc){
    res.write(400);
    res.end();
    return;
  }
  // TODO: verify the body has lat, long, desc
  let waypoint = new Waypoint(req.body.name, req.body.lat, req.body.long, req.body.desc);

  storage[waypoint.id] = waypoint;
  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(waypoint));
  res.end();
});

router.get('/api/waypoints', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return ;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();

});

router.put('/api/waypoints', (req, res) => {

  if(!storage[req.body.id]){
    res.writeHead(500);
    res.end();
    return ;
  }
  
  if(req.body.name) storage[req.body.id].name = req.body.name;
  if(req.body.lat) storage[req.body.id].latitude = req.body.lat;
  if(req.body.long) storage[req.body.id].longitude = req.body.long;
  if(req.body.desc) storage[req.body.id].description = req.body.desc;
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.body.id]));
  res.end();
});

router.delete('/api/waypoints', (req, res) => {

  if(storage[req.url.query.id]){

    storage[req.url.query.id] = undefined;
    res.writeHead(204, {
      'Content-Type': 'text/data',
    });
    res.write(JSON.stringify(storage[req.url.query.id]));
    res.end();
  }

  res.writeHead(404);
  res.end();
  return ;
});

const server = module.exports = http.createServer(router.route);
