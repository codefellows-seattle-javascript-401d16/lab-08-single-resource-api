'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

const Character = require('./character.js');

var storage = {};


// npm modules
// app modules
// module logic

// register routes with router
router.get('/hello', (req, res) => {
  res.write('Why, hello to you good fellow!');
  res.end();
});

router.post('/api/characters', (req, res) => {
  console.log('hit /api/characters');
  let body = req.body;
  if(!body || !body.name || !body.species || !body.profession || !body.power){
    res.write(400);
    res.end();
    return;
  }

  // uui generate a random string likely won't conflict later
  // let note = {
  //   id: uuid.v1(),
  //   content: req.body.content,
  // };

  let hero = new Character(req.body.name, req.body.species, req.body.profession, req.body.power);
  hero.id = uuid.v1();

  storage[hero.id] = hero;
  res.writeHead(201, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(hero));
  res.end();
});

router.post('/api/notes', (req, res) => {
  console.log('hit /api/notes');
  if(!req.body.content){
    res.write(400);
    res.end();
    return;
  }

  // uui generate a random string likely won't conflict later
  let note = {
    id: uuid.v1(),
    content: req.body.content,
  };

  storage[note.id] = note;
  res.writeHead(200, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(note));
  res.end();
});

router.get('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(4000);
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });

  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();

});

// create server
const server = module.exports = http.createServer(router.route);


// how we did it first
// http.createServer((req,res) => {
//  router.route(req,res)
// })
