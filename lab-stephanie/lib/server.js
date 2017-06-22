'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');
const FBPost = require('../model/model.js');

const server = module.exports = http.createServer(router.route);

var storage = {};

router.get('/hello', (req, res) =>{
  res.write('hello');
  res.end();
});

router.post('/api/posts', (req, res) => {

  if(!req.body.content) {
    res.write(400);
    res.end();
    return;
  }

  let post = new FBPost(req.body.userName, req.body.content);
  storage[post.id] = post;
  res.writeHead(201, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(post));
  res.end();
});

router.put('/api/posts', (req, res) => {

  if(!req.body.userName) {
    console.log('400 running on put userName');
    res.write(400);
    res.end();
    return;
  }

  if(!req.body.content) {

    res.write(400);
    res.end();
    return;
  }
  if(!req.url.query.id) {

    res.write(400);
    res.end();
    return;
  }

  if (req.body.content) storage[req.url.query.id].content = req.body.content;
  if (req.body.userName) storage[req.url.query.id].userName = req.body.userName;

  res.writeHead(202, {
    'Content-Type' : 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.get('/api/posts', (req, res) =>{
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
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/posts', (req, res) =>{
  if(!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(204, {
    'Content-Type' : 'application/json',
  });

  delete storage[req.url.query.id];
  res.end();
});
