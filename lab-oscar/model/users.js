'use strict';

const router = require('../lib/router.js');
const uuid = require('uuid');

function User(id, username, password, fname, lname) {
  this.id = id;
  this.username = username;
  this.password = password;
  this.fname = fname;
  this.lname = lname;
}

let storage = {};//this is object where data will be store
router.post('/api/user', (req, res) =>{
  if(!req.body.fname){
    res.write(400);
    res.end();
    return;
  }

  let user = new User (uuid.v1(), req.body.username, req.body.pwd, req.body.fname, req.body.lname);

  storage[user.id] = user;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(user));
  res.end();
});

router.get('/api/user', (req, res) =>{
  if(!req.url.query.id){
    res.writeHead(400);
    res.end();
    return ;
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


router.get('/hello', (req, res) => {
  res.write('Hello!');
  res.end();
});
