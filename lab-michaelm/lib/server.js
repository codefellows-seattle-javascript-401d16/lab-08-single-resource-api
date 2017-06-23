'use strict';

const http = require('http');
const router = require('./router.js');
const OptIn = require('../model/opt-in.js');
const responseHelpers = require('./responseHelpers.js');
var storage = {};

router.post('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.body.name || !req.body.age){
    return res.sendStatus(400);
  }
  let optIn = new OptIn(req.body.name, req.body.age);
  storage[optIn.id] = optIn;
  res.sendJSON(201, optIn);
});

router.put('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.body.name || !req.body.age){
    return res.sendStatus(400);
  }
  if(!storage[req.body.id]){
    return res.sendStatus(404);
  }
  if(req.body.name) storage[req.body.id].name = req.body.name;
  if(req.body.age) storage[req.body.id].age = req.body.age;
  return res.sendJSON(202, storage[req.body.id]);
});

router.get('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.url.query.id){
    return res.sendStatus(400);
  }
  if(!storage[req.url.query.id]){
    return res.sendStatus(404);
  }
  return res.sendJSON(200, storage[req.url.query.id]);
});


router.delete('/api/opt', (req, res) => {
  responseHelpers(res);
  if(!req.url.query.id) {
    return res.sendStatus(400);
  }
  if(!storage[req.url.query.id]) {
    return res.sendStatus(404);
  }
  delete storage[req.url.query.id];
  return res.sendText(202, 'User deleted.');
});

module.exports = http.createServer(router.route);
