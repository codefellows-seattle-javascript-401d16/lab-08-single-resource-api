'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var storageOfRouters = {};

router.get('/api/pizza', (req,res) => {
  console.log('it hit /api/pizza');
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }
  if(!storageOfRouters[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('not found');
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storageOfRouters[req.url.query.id]));
  res.end();
});

router.post('/api/pizza', (req,res) => {
  console.log('it hit /api/pizza');
  if(!req.body.content){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }
  let pizza = {
    id:uuid.v4(),
    name: req.body.name,
    topping: req.body.topping,
    picture: req.body.picture,
  };
  storageOfRouters[pizza.id] = pizza;
  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(pizza));
  res.end();
});

router.put('/api/pizza', (req,res) => {
  console.log('it hit /api/pizza');
  if(!req.body.content){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('bad request');
    res.end();
    return;
  }
  res.writeHead(202, {
    'Content-Type': 'text/plain',
  });
  res.write(JSON.stringify(storageOfRouters[req.url.query.id]));
  res.end();
});

router.delete('/api/pizza', (req,res) => {
  console.log('it hit /api/pizza');
  if(!storageOfRouters[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('not found');
    res.end();
    return;
  }
  res.writeHead(204, {
    'Content-Type': 'text/plain',
  });
  res.write();
  res.end();
});
const server = module.exports = http.createServer(router.route);
