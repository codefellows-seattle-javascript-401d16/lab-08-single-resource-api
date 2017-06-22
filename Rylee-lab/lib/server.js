'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var storageOfRouters = {};


router.post('/api/pizza', (req,res) => {
  console.log('it hit /api/note');
  if(!req.body.content){
    res.write(400);
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
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(pizza));
  res.end();
});

router.get('/api/pizza', (req,res) => {
  console.log('it hit /api/pizza');
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return;
  }
  if(!storageOfRouters[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storageOfRouters[req.url.query.id]));
  res.end();
});

const server = module.exports = http.createServer(router.route);
