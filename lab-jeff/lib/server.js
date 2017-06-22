'use strict';

const http = require('http');
const router = require('./router.js');
const Movie = require('../model/movies.js');
const storage = require('../model/storage.js');


router.post('/api/movies', (req, res) => {
  console.log('hit /api/movies');
  // logic for POST /lulwat
  if(!req.body.content){
    res.write(400);
    res.end();
    return;
  }

  let newMovie = new Movie(req.body.title, req.body.year, req.body.genre);
  storage[newMovie.id] = newMovie;
  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(newMovie));
  res.end();
});

router.get('/api/movies', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.end();
    return ;
  }

  if(req.url.query.id) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(storage[req.url.query.id]));
    res.end();
  }
});

router.put('/api/movies', (req, res) => {
  console.log('hit /api/movies');
  if(!req.body.content){
    res.write(400);
    res.end();
    return;
  }
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  storage[req.url.query.id].title = req.body.title;
  storage[req.url.query.id].year = req.body.year;
  storage[req.url.query.id].genre = req.body.genre;
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('api/movies', (req,res) => {
  if(!storage[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type': 'application/json',
    });
    res.end();
    return;
  }
  delete storage[req.url.query.id];
  res.writeHead(204, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end;
});


const server = module.exports = http.createServer(router.route);
