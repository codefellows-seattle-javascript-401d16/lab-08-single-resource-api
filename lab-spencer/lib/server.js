'use strict'

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var db = {};

router.post('/api/seahawks', (req, res) => {
  console.log('hit /api/seahawks');
  if(!req.body.name || !req.body.position || !req.body.picture) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('Bad request!');
    res.end();
    return;
  }

  let seahawk = {
    id: uuid.v4(),
    name: req.body.name,
    position: req.body.position,
    picture: req.body.picture,
  };

  db[seahawk.id] = seahawk;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(seahawk));
  res.end();
  return;
});

router.get('/api/seahawks', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.write('Bad request!');
    res.end()
    return;
  }

  if(!db[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type': 'text/plain',
    });
    res.write('Seahawk not found!');
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(db[req.url.query.id]));
  res.end();
  return;
});

const server = module.exports = http.createServer(router.route);
