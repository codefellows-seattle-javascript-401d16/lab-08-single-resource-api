
'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');
const requestParse = require('./request-parse.js');
const Note = require('../model/note.js');

var storage = {
  '95437340-56e3-11e7-acdc-07e5cf283b68':
  {
    'content': 'zup',
    'dateCreated': '2017-06-22T00:41:51.988Z',
  },
};

// npm modules
// app modules
// module logic
// register routes with router
router.get('/hello', (req, res) => {
  res.write('yeyyeyeyye');
  res.end();
});

router.post('/api/notes', (req, res) => {
  // console.log('req.body: ', req.body);

  if(!req.body){
    res.writeHead(404);
    res.end();
    return;
  }

  let note = new Note(req.body.text);

  // console.log('note, ', note);

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
  console.log(storage);
  res.writeHead(200, {'Content-Type' : 'application/json'});
  res.write('{}');
  res.end();
});

router.put('/api/notes', (req, res) => {
  if (!req.query.url.id) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (!req.body.text) {
    res.writeHead(204);
    res.end();
    return;
  }

  res.writeHead(200, {'Content-Type' : 'application/json'});
  res.update(storage[req.url.query.id].text = req.body.text);

});

// create server
const server = module.exports = http.createServer(router.route);


// how we did it first
//http.createServer((req, res) => {
//router.route(req,res)
//})
