'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid/v1');

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
    res.end();Error;

    return;
  }
  if(!database[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.write(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(database[req.url.query.id]));
  res.end();
});


const server = module.exports = http.createServer(router.route);
