'use strict';

const http = require('http');
const router = require('./router.js');
const Record = require('../model/record.js');

let storage = {};

router.post('/api/records', (req, res) => {
  console.log('got api');

  let {title, artist, id} = req.body;
  let newRecord = new Record(title, artist);
  storage[newRecord.id] = newRecord;

  if(!req.body){
    res.write(400);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(newRecord));
  res.end();
});

router.get('/api/records', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write(JSON.stringify(storage));
    res.end();
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return ;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.put('/api/records', (req, res) => {
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

  if (req.body.title) {
    storage[req.url.query.id].title = req.body.title;
  }

  if (req.body.artist) {
    storage[req.url.query.id].artist = req.body.artist;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/records', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(404);
    res.end();
    return;
  }
  delete storage[req.url.query.id];

  res.writeHead(204, {
    'Content-Type': 'application/json',
  });

  res.write('{}');
  res.end();
});

const server = module.exports = http.createServer(router.route);
