'use strict';

const http = require('http');
const router = require('./router.js');
const GameScore = require('../model/gamescore.js');
const uuid = require('uuid');

var scoreBoard = {
  games: {},
};


router.post('/api/gamescore', (req, res) => {
  let body = req.body;
  if(!body.name || !body.score) {
    res.write(400);
    res.end();
    return;
  }
  let gameId = uuid.v4();
  let games = new GameScore(gameId, body.name, body.score);
  scoreBoard.games[gameId] = games;

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(games));
  res.end();
  return;
});

router.get('/api/gamescore', (req, res) => {
  if(!req.url.query.id) {
    res.write(400);
    res.end();
    return;
  }

  if(!scoreBoard.games[req.url.query.id]) {
    res.write(404);
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(scoreBoard.games[req.url.query.id]));
  res.end();
  return;
});

router.put('/api/gamescore', (req, res) => {
  let body = req.body;
  if(!body.id || !body.name || !body.score) {
    res.write(400);
    res.end();
    return;
  }

  let games = new GameScore(gameId, body.name, body.score);
  scoreBoard.games[body.id] = games;

  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(games));
  res.end();
  return;
});

const server = module.exports = http.createServer(router.route);
