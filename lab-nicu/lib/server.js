'use strict';

const http = require('http');
const Burger = require('../model/burger.js');
const router = require('./router.js');

const storage = {};

//Register routes

router.post('/api/burgers', (req, res) => {
  if ((!req.body.name && !req.body.location && !req.body.stars) || req.body === {} || !req.body) {
    res.writeHead(400, {
      'Content-Type': 'application/json',
    });
    res.end();
    return;
  }
  let burger = new Burger(req.body.name, req.body.location, req.body.stars);
  storage[burger.id] = burger;
  res.writeHead(201,{
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify({ Message: 'Burger Successfully Created', burger }));
  res.end();
});

router.get('/api/burgers', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(200,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: 'Burger IDs Available', ids: Object.keys(storage) }));
    res.end();
    return;
  }
  let burger = storage[req.url.query.id];
  if (burger) {
    res.writeHead(200,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(burger));
    res.end();
    return;
  }
  else {
    res.writeHead(404,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: `ID not found` }));
    res.end();
    return;
  }
});

router.delete('/api/burgers', (req, res) => {
  let burger = storage[req.url.query.id];
  if (burger) {
    try {
      delete storage[req.url.query.id];
      res.writeHead(204,{
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify({ Message: `Successfully Deleted`, id: req.url.query.id }));
      res.end();
      return;
    } catch (error) {
      res.writeHead(500,{
        'Content-Type': 'application/json',
      });
      res.end();
      return;
    }
  }
  else {
    res.writeHead(404,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: `ID not found` }));
    res.end();
    return;
  }
});

router.put('/api/burgers', (req, res) => {
  if (req.body === {} || !req.body) {
    res.writeHead(400,{
      'Content-Type': 'application/json',
    });
    res.end();
    return;
  }

  if (!storage[req.url.query.id]) {
    res.writeHead(404,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: `ID not found` }));
    res.end();
    return;
  } else {
    storage[req.url.query.id] = req.body;
    storage[req.url.query.id]['id'] = req.url.query.id;
    res.writeHead(202,{
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify({ Message: `Successfully updated`, UpdatedValues: req.body }));
    res.end();
    return;
  }
});

const server = module.exports = http.createServer(router.route);