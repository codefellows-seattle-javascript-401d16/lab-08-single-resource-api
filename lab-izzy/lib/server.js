'use strict';

const http = require('http');
const router = require('./router.js');
const Insta = require('../model/insta.js');

let storage = {};

router.post('/api/instas', (req, res) => {
  console.log('hit /api/instas');
  if(!req.body.content){
    res.write(400);
    res.end();
    return;
  }

  let insta = new Insta(req.body.image, req.body.content);
  storage[insta.id] = insta;
  console.log(storage);

  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(insta));
  res.end();
});

router.get('/api/instas', (req, res) => {
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

router.put('/api/instas', (req, res) => {
  if(!req.body.content) {
    res.writeHead(400);
    res.end();
    return;
  }
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

  if (req.body.content) storage[req.url.query.id].content = req.body.content;

  if (req.body.image) storage[req.url.query.id].image = req.body.image;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/instas', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(404);
    res.end();
    return;
  }

  delete storage[req.url.query.id].content;

  res.writeHead(204, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

const server = module.exports = http.createServer(router.route);
