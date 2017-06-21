'use strict'

const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var storage = {}

router.post('/api/seahawks', (req, res) => {
  console.log('hit /api/seahawks');
  if(!req.body.name || !req.body.position || !req.body.picture) {
    res.writeHead(400, {
      'Content-Type': 'text/plain',
    });
    res.end();
    return;
  }

  let seahawk = {
    id: uuid.v4(),
    name: req.body.name,
    position: req.body.position,
    picture: req.body.picture,
  };

  storage[note.id] = note;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.write(JSON.stringify(note))
  res.end()
});

router.get('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400)
    res.end()
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.end()
    return ;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  res.write(JSON.stringify(storage[req.url.query.id]))
  res.end()

});

// create server
const server = module.exports = http.createServer(router.route);
