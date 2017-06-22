'use strict';

const http = require('http');
const router = require('./router.js');
const Player = require('../model/player.js');

var storage = {};

router.post('/api/player', (req, res) => {
  if(!req.body.name){
    res.writeHead(400);
    res.end();
    return;
  }

  let newPlayer = new Player(req.body.name,req.body.team,req.body.position);
  storage[newPlayer.id] = newPlayer;
  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(newPlayer));
  res.end();
});

router.get('/api/player', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return;
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

router.put('/api/player', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return;
  }

  if (req.body.name) {
    storage[req.url.query.id].title = req.body.name;
  }

  if (req.body.team) {
    storage[req.url.query.id].artist = req.body.team;
  }

  if (req.body.position) {
    storage[req.url.query.id].artist = req.body.position;
  }

  res.writeHead(202, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/player', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(404);
    res.end();
    return;
  }
  delete storage[req.url.query.id];

  res.writeHead(204, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

const server = module.exports = http.createServer(router.route);
