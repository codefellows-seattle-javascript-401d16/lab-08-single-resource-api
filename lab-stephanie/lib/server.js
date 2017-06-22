'use strict';

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');
const FBPost = require('../model/model.js');

var storage = {};

router.get('/hello', (req, res) =>{
  res.write('hello');
  res.end();
});

router.post('/api/posts', (req, res) => {
  console.log('hit /api/posts');

  if(!req.body.content) {
    res.write(400);
    res.end();
    return;
  }

  let post = new FBPost('post',uuid());

  storage[this.id] = post.id;
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(post));
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

const server = module.exports = http.createServer(router.route);
