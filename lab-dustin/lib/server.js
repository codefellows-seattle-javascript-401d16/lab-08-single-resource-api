
'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const Note = require('../model/note.js');

var storage = {};

// npm modules
// app modules
// module logic
// register routes with router
router.get('/hello', (req, res) => {
  res.write('yeyyeyeyye');
  res.end();
});

router.post('/api/notes', (req, res) => {

  if(!req.body || req.body.text === undefined){
    res.writeHead(400);
    res.end();
    return;
  }

  let note = new Note(req.body.text);

  storage[note.id] = note;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(note));
  res.end();
});

router.get('/api/notes', (req, res) => {
  // console.log('get is working');
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

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});


// DELETE a note by id
router.delete('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(404);
    res.end();
    return;
  }

  delete storage[req.url.query.id];
  res.writeHead(204, {'Content-Type' : 'application/json'});
  res.write('{}');
  res.end();
});

router.put('/api/notes', (req, res) => {
  // if (!req.query.url.id) {
  //   res.writeHead(404);
  //   res.end();
  //   return;
  // }

  if (!req.body.text || req.body.text === undefined) {
    res.writeHead(400);
    res.end();
    return;
  }

  console.log(storage);
  storage[req.url.query.id].content = req.url.query.id.content;

  res.writeHead(202, {'Content-Type' : 'application/json'});
  res.write('{}');
  res.end();

});

// create server
const server = module.exports = http.createServer(router.route);


// how we did it first
//http.createServer((req, res) => {
//router.route(req,res)
//})
