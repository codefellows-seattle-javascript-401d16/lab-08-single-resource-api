'use strict';

//TODO*DONE: Create a HTTP Server using the http module

const http = require('http');
const requestParse = require('./request-parse.js');
const router = require('./router.js');
const Task = require('../model/task.js');

//TODO: Create a storage module that will store resources by their type and id

let newTask = new Task('testTask', 10);
let storage = {};

router.get('/', (req, res) => {
  res.write('successful get request');
  res.end();
  return;
})

//TODO: POST request - pass data as stringifed json in the body of a post request to create a resource
//TODO: GET request - pass an ?id=<uuid> in the query string to retrieve a specific resource as json
//TODO: DELETE request - pass an ?id=<uuid> in the query string to delete a specific resource should return 204 status with no content in the body
//TODO: PUT request - pass an ?id=<uuid> in the query string to update a specific resource, pass data as stringified json in the body of a put request to update a resource, optionally decide whether the id of the resource is passed through the body or via the request url


const server = module.exports = http.createServer(router.route);
