'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');
const Character = require('../model/character.js');
const storage = require('../model/storage.js');


router.post('/api/characters', (req, res) => {
  let body = req.body;
  if(!body || !body.name || !body.species || !body.profession || !body.power){
    res.write(400, {
      'Content-Type' : 'application/json',
    });
    res.end();
    return;
  }

  let hero = new Character(req.body.name, req.body.species, req.body.profession, req.body.power);
  hero.id = uuid.v1();

  storage[hero.id] = hero;
  res.writeHead(201, {
    'Content-Type' : 'application/json',
  });
  res.write(JSON.stringify(hero));
  res.end();
  return;
});

router.get('/api/characters', (req, res) => {
  if(req.url.query.id){
    res.writeHead(200);
    res.write(JSON.stringify(storage.id));
    res.end();
  }
});

router.get('/api/characters', (req, res) => {
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

router.put('/api/characters', (req, res) => {
  // console.log('hit /api/characters');
  let body = req.body;
  if(!body || !body.name || !body.species || !body.profession || !body.power){
    res.write(400);
    res.end();
    return;
  }

  res.writeHead(202, {
    'Content-Type' : 'application/json',
  });
  storage[req.url.query.id].name = req.body.name;
  storage[req.url.query.id].species = req.body.species;
  storage[req.url.query.id].profession = req.body.profession;
  storage[req.url.query.id].power = req.body.power;
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/api/characters', (req, res) => {

  if(!storage[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type' : 'application/json',
    });
    res.end();
    return;
  }
  delete storage[req.url.query.id];
  res.writeHead(204, {
    'Content-Type' : 'application/json',
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
