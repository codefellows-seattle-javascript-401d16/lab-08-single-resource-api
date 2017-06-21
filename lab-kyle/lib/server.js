'use strict';

const http = require('http');
const router = require('./router.js');

const Waypoint = require('../model/Waypoint.js');

var storage = {};

router.post('/api/waypoints', (req, res) => {

  if(!req.body.content){
    res.write(400);
    res.end();
    return;
  }
  // TODO: verify the body has lat, long, desc
  let waypoint = new Waypoint(req.body.name, req.body.lat, req.body.long, req.body.desc);

  storage[waypoint.id] = waypoint;
  res.writeHead(200, {
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

  if(req.url.query.name) storage[req.url.query.id].name = req.url.query.name;
  if(req.url.query.lat) storage[req.url.query.id].latitude = req.url.query.lat;
  if(req.url.query.long) storage[req.url.query.id].longitude = req.url.query.long;
  if(req.url.query.desc) storage[req.url.query.id].description = req.url.query.description;
});

router.delete('/api/waypoints', (req, res) => {

});

const server = module.exports = http.createServer(router.route);
