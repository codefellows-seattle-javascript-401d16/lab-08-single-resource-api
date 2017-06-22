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

function User(title, content) {
  this.id = uuid.v1();
  this.title = title;
  this.content = content;
  this.date= new Date();
}


router.post('/newUser', (req, res) => {
  if(!req.body){ // if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }

  let user = new User(req.body.title, req.body.content);
  storage[user.title] = user;// storage[user.id] = user;
  console.log(req.body);
  // console.log(req.url);
  console.log(Object.keys(storage)[0]);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write('Your content has been saved into storage!!');
  res.write(JSON.stringify(user))
  res.end();
});

router.get('/readTitles', (req, res) => {
  console.log(storage);
  if(!req.body){ // if(!req.body.content){ why is this... need to check
    res.writeHead(400);
    res.end();
    return;
  }
  res.write(JSON.stringify(storage));
  let titleInfo = [];
  console.log(storage); //LEFT OFF AROUND HERE
  for (var i=0; i< storage.length; i++){
    if (req.body.title===storage[req.body.title[i]]) {
      console.log('almost!!!');
      titleInfo.push(storage[i]);
    } else {console.log('almost!!');}
  }
  if (titleInfo===[]) {
    res.write('these are all of the titles that matched your request...\n'+JSON.stringify(titleInfo));
  } else {
    res.write('no title with that information!!');
  }
  res.end();
});

router.delete('/deleteUser', (req,res) => {
  console.log(storage);
  if(!req.body){ // if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }
  console.log('im inside of delete now');
  console.log(Object.keys(storage)[0]);
  console.log(req.body.title);
  console.log(JSON.stringify(req.body.title));
  res.write(JSON.stringify(Object.keys(storage)[0]));
  let numDeleted = 0;
  for (var i=0; i< storage.length; i++){
    if (req.body.title===Object.keys(storage)[i]) {
      delete storage[storage.title[i]];
      numDeleted+=1;
    }
  }
  res.write(JSON.stringify('You deleted '+numDeleted+' users! post some more stuff... :)'));
  res.end();
});

router.delete('/deleteUser', (req,res) => {
  console.log(storage);
  if(!req.body){ // if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }
  console.log('im inside of delete now');
  console.log(Object.keys(storage)[0]);
  console.log(req.body.title);
  console.log(JSON.stringify(req.body.title));
  res.write(JSON.stringify(Object.keys(storage)[0]));
  let numDeleted = 0;
  for (var i=0; i< storage.length; i++){
    if (req.body.title===Object.keys(storage)[i]) {
      delete storage[storage.title[i]];
      numDeleted+=1;
    }
  }
  res.write(JSON.stringify('You deleted '+numDeleted+' users! post some more stuff... :)'));
  res.end();
});



router.get('/newSoup', (req, res) => {
  let user = new User();
  storage[users] = user;
  res.write('hello new user! Your new profile has been created! It is below... :)');
  res.write(user);
  res.end();
});








// router.get('/api/notes', (req, res) => {
//   if(!req.url.query.id){
//     res.writeHead(400);
//     res.end();
//     return ;
//   }
//
//   if(!storage[req.url.query.id]){
//     res.writeHead(404)
//     console.log('suhh dude');
//     res.end();
//     return ;
//   }
//
//   res.writeHead(200, {
//     'Content-Type': 'application/json',
//   });

//   res.write(JSON.stringify(storage[req.url.query.id]));
//   res.end();
//
// });

// create server
const server = module.exports = http.createServer(router.route);


// how we did it first
//http.createServer((req, res) => {
  //router.route(req,res)
//})
