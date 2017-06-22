'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');
var storage = {};

//Constructor
function User(content) {
  this.id = uuid.v1();
  this.content = content;
}
//END Constructor

 // Start GET
 router.get('/newUser', (req, res) => {
   console.log('/newUser');
   if(!req.body.content){
  console.log(req.body.content);
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
//END GET

//POST
  router.post('/api/notes', (req, res) => {
    if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }

 let user = new User(req.body.content);
  storage[user.id] = user;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(user));
  console.log(storage);
  res.end();
});
//end POST

//GET
router.get('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400)
    res.end()
    return ;
  }

 if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.write('error - no id in that storage')
    res.end();
    return ;
  }

 res.writeHead(200, {
    'Content-Type': 'application/json',
  });

 res.write(JSON.stringify(storage[req.url.query.id]))
  res.end()
});
//end GET

//DELETE
router.delete('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400)
    res.end()
    return ;
  }

 if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.write('error - no id exists to delete in that storage')
    res.end();
    return ;
  }

 res.writeHead(204, {
  });

 delete storage[req.url.query.id]
 res.end()
});
//end DELETE

//PUT
router.put('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400)
    res.end()
    return ;
  }

 if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.write('error - no id exists to update that record')
    res.end();
    return ;
  }

let oldData = storage[req.url.query.id]
let newData = req.body
oldData.content = newData.content
console.log(oldData);
console.log(newData);

   res.writeHead(202, {
      'Content-Type': 'application/json',
    })

  res.write(JSON.stringify(storage[req.url.query.id]))
   res.end()
 });
//end PUT

// create server
const server = module.exports = http.createServer(router.route);
