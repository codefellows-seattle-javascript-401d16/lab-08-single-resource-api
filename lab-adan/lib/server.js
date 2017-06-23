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
  let games = new GameScore(body.name, body.score, gameId);
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
    res.writeHead(400);
    res.end();
    return;
  }

  if(!scoreBoard.games[req.url.query.id]) {
    res.writeHead(404);
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
  if(!body.gameName || !body.score || !body.id) {
    res.write(400);
    res.end();
    return;
  }
  let games = scoreBoard.games[req.body.id];
  let gameUpdate = Object.assign(games, body);
  scoreBoard.games[body.id] = gameUpdate;

  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(gameUpdate));
  res.end();
  return;
});

module.exports = http.createServer(router.route);
