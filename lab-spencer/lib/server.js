'use strict';

const http = require('http');
const Seahawk = require('../model/seahawk.js');
const router = require('./router.js');
const uuid = require('uuid');

let team = {
  players: {},
};

router.post('/api/seahawks', (req, res) => {
  let body = req.body;
  if(!body.name || !body.height || !body.weight || !body.position || !body.picture) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('Bad request!');
    res.end();
    return;
  }
  let playerID = uuid.v4();
  let player = new Seahawk(playerID, body.name, body.height, body.weight, body.position, body.picture);
  team.players[playerID] = player;

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(player));
  res.end();
  return;
});

router.get('/api/seahawks', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('Bad request!');
    res.end();
    return;
  }

  if(!team.players[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('Seahawk not found!');
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(team.players[req.url.query.id]));
  res.end();
  return;
});

module.exports = http.createServer(router.route);
