'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const Insta = require('../model/insta.js');

var storage = {};

// register routes with router

router.post('/api/instas', (req, res) => {
  console.log('hit /api/instas');
  // logic for POST /lulwat
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
    console.log('no body provided or invalid body');
    res.writeHead(400);
    res.end();
    return;
  }
  if(!req.url.query.id) {
    console.log('no id');
    res.writeHead(400);
    res.end();
    return;
  }
  if(!storage[req.url.query.id]) {
    console.log('not found');
    res.writeHead(404);
    res.end();
    return;
  }

  console.log(storage[req.url.query.id]);

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(insta));
  res.end();
});

router.delete('/api/instas', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(204);
  }
})

// create server
const server = module.exports = http.createServer(router.route);
