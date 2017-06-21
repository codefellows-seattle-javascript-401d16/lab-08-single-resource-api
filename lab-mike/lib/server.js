'use strict';

const http = require('http');
const uuid = require('uuid');
const router = require('./router.js');

var storage = {};

router.post('/api/notes', (req, res) => {
  if (!req.body.content) {
    res.write(400);
    res.end();
    return;
  }

  let id = uuid.v1();
  let date = new Date();
  let content = req.body.content;
  let Note = new Note(id, date, content);
  storage[id] = Note;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(Note));
  res.end();
  return;
  // pass data as stringifed json in the body of a post request to create a resource
});

router.get('/api/notes', (req, res) => {
  if (!req.url.query.id) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.write(JSON.stringify(storage));
    res.end();
    return;
  }

  if (!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
  return;
});
// pass an ?id=<uuid> in the query string to retrieve a specific resource as json

router.delete('/api/notes', (res, req) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }
  storage[req.url.query.id] = undefined;
  res.writeHead(204);
  res.end();
  return;
});
// pass an ?id=<uuid> in the query string to delete a specific resource
// should return 204 status with no content in the body

router.put('/api/notes', (res, req) => {
  if (!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  if (!storage[req.url.query.id]) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (!req.body.content) {
    res.write(400);
    res.end();
    return;
  }

  if (!req.body.creationDate) {
    res.write(400);
    res.end();
    return;
  }

  //stringify the creationdate and content
  let creationDate = req.body.creationDate;
  let content = req.body.content;
  storage[req.url.query.id.creationDate] = creationDate;
  storage[req.url.query.id.content] = content;
});
// pass an ?id=<uuid> in the query string to update a specific resource
// pass data as stringified json in the body of a put request to update a resource

// optionally decide whether the id of the resource is passed through the body or via the request url

const server = module.exports = http.createServer(router.path);
