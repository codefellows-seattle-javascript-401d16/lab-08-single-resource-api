'use strict';

//TODO*DONE: Create a HTTP Server using the http module

const http = require('http');
const requestParse = require('./request-parse.js');
const router = require('./router.js');
const Task = require('../model/task.js');

//TODO: Create a storage module that will store resources by their type and id

let storage = {};

//TODO*DONE: POST request - pass data as stringifed json in the body of a post request to create a resource

router.post('/', (req, res) => {
  if(!req.body){
    res.write('fail - no body content');
    res.writeHead(400);
    res.end();
    return;
  }
  let newTask = new Task (req.body.name, req.body.xp);
  storage[newTask.id] = newTask;
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.write(`successful POST request, created task ${newTask.id}\n`);
  res.write(JSON.stringify(newTask));
  res.end();
});

//TODO*DONE: GET request - pass an ?id=<uuid> in the query string to retrieve a specific resource as json

router.get('/', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404);
    res.write('task id does not exist');
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.write(`successful GET request to id ${req.url.query.id}\n`);
  res.write(`returning task: ${JSON.stringify(storage[req.url.query.id])}\n`);
  res.end();
  return;
});

//TODO: PUT request - pass an ?id=<uuid> in the query string to update a specific resource, pass data as stringified json in the body of a put request to update a resource, optionally decide whether the id of the resource is passed through the body or via the request url

router.put('/', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('invalid query string');
    res.end();
    return;
  }
  if(!req.body){
    res.writeHead(400);
    res.write('PUT requires valid body content');
    res.end();
    return;
  }
  if(req.body.name){
    storage[req.url.query.id].taskName = req.body.name;
  }
  if(req.body.xp){
    storage[req.url.query.id].xp = req.body.xp;
  }
  res.writeHead(200, {
    'Content-type': 'application/json',
  });
  res.write('update successful\n');
  res.write(`returning task: ${JSON.stringify(storage[req.url.query.id])}\n`);
  res.end();
  return;
});

//TODO: DELETE request - pass an ?id=<uuid> in the query string to delete a specific resource should return 204 status with no content in the body

router.delete('/', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.write('invalid id in querystring');
    res.end();
    return;
  }
  storage[req.url.query.id] = undefined;
  res.writeHead(204);
  res.end();
  return;
});

const server = module.exports = http.createServer(router.route);
