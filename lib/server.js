'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

let database = {};

router.post('/api/heros', (req, res) => {
  if(!req.body.hero && !req.body.score) {
    res.writeHead(400);
    res.end();
    return;
  }
  let heroScore = {
    id: uuid.v1(),
    hero: req.body.hero,
    score: req.body.score,
  };
  database[heroScore.id] = heroScore;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(heroScore));
  res.end();
});

router.get('/api/heros', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }
  if(!database[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(database[req.url.query.id]));
  res.end();
});

router.put('/api/heros', (req, res) => {
  if(!req.url.query.id || !req.body.hero || !req.body.score) {
    res.writeHead(400);
    res.end();
    return;
  }
  if(!database[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  database[req.url.query.id].hero = req.body.hero;
  database[req.url.query.id].score = req.body.score;
  res.write(JSON.stringify(database[req.url.query.id]));
  res.end();
});

router.delete('/api/heros', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(204, {
    'Content-Type': 'application/json',
  });
  database[req.url.query.id].hero = undefined;
  database[req.url.query.id].score = undefined;
  res.end();
});


const server = module.exports = http.createServer(router.route);
