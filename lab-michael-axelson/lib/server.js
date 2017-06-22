'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var storage = {};

// npm modules
// app modules
// module logic
// register routes with router
router.get('/hello', (req, res) => {
  res.write('yeyehheey');

  res.end();
});

router.post('/newUser', (req, res) => {
  // logic for POSTing new User
  if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }

  let user = new User(req.body.content);
  storage[user.id] = user;
  console.log(req.body);
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(user));
  console.log(storage);
  res.end();
});

function User(content) {
  this.id = uuid.v1();
  this.content = content;
}



router.get('/newSoup', (req, res) => {
  let user = new User();
  storage[user] = users;
  res.write('hello new user! Your new profile has been created! It is below... :)');
  res.write(users);
  res.end();
});

router.get('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.write('suhh dude')
    res.end();
    return ;
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
//http.createServer((req, res) => {
  //router.route(req,res)
//})
