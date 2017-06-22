'use strict';

const http = require('http');
const router = require('./router.js');
const Feelings = require('../model/feelings.js');

let storage = {};

router.post('/api/feelings', (req, res) => {

  if(!req.body.name){
    res.write(400);
    res.end();
    return;
  }

  let feeling = new Feelings(req.body.name, req.body.age, req.body.feeling);
  storage[feeling.id] = feeling;

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(feeling));
  res.end();
});

router.get('/api/feelings', (req, res) => {
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

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();

});

router.put('/api/feelings', (req, res) => {
  // if(!req.url.query.id) {
  //   res.writeHead(400);
  //   res.end();
  //   return;
  // }
  if(!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }
  if(!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (req.body.name) storage[req.url.query.id].name = req.body.name;

  if (req.body.age) storage[req.url.query.id].age = req.body.age;

  if (req.body.feeling) storage[req.url.query.id].feeling = req.body.feeling;

  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/feelings', (req, res) => {
  if(!req.url.query.id) {
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
