'use strict';

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');


var storage = {};

function Food(type, content) {
  this.id = uuid.v1();
  this.type = type;
  this.content = content;
  this.date= new Date();
}


router.post('/foods', (req, res) => {
  if(!req.body.type){ // if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }
  if(!req.body.content){ // if(!req.body.content){
    res.writeHead(400);
    res.end();
    return;
  }
  let food = new Food(req.body.type, req.body.content);
  storage[food.id] = food;// storage[user.id] = user;
  // console.log('req.body...'+req.body);
  // console.log(req.url);
  console.log('new food....===', JSON.stringify(food.type));
  // console.log('res.url....'+JSON.stringify(req.url));
  // console.log(Object.keys(storage));
  // console.log(food.id);
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(food))
  res.end();
});

router.get('/foods', (req, res) => {
  console.log('get request');
  // console.log(storage);
  if(!req.body){
    res.writeHead(400);
    res.end();
    return;
  }
  let typeInfo = [];
  for (var keys in storage){
    // console.log(storage[keys]+'should equal'+storage[keys].type);
    // console.log('its working!');
    if (req.url.query.type === storage[keys].type){
      typeInfo.push(storage[keys]);
    }
  }
  if (typeInfo.length>0) {
    console.log(JSON.stringify(typeInfo));
    res.write(JSON.stringify(typeInfo));
  } else {
    res.write('no title with that information!!');
  }
  res.end();
});

router.delete('/foods', (req,res) => {
  console.log(storage);
  if(!req.body){
    res.writeHead(400);
    res.end();
    return;
  }
  console.log('im inside of delete now');
  let deletedFoods = [];
  let numDeleted = 0;
  for (var keys in storage){
    if (req.url.query.type === storage[keys].type){
      deletedFoods.push(storage[keys]);
      delete storage[keys];
      numDeleted+=1;
    }
  }
  console.log(deletedFoods);
  res.write(JSON.stringify(deletedFoods));
  // res.write('You deleted '+JSON.stringify(numDeleted)+' types! post some more stuff... :)');
  res.end();
});

router.put('/foods', (req,res) => {
  if(!req.body){
    res.writeHead(400);
    res.end();
    return;
  }
  let changedFoods = [];
  let numChanged = 0;
  for (var keys in storage){
    if (req.url.query.type === storage[keys].type){
      storage[keys].content = req.url.query.content;
      changedFoods.push(storage[keys]);
      numChanged += 1;
    }
  }
  res.write(JSON.stringify(changedFoods));
  res.write('You deleted '+JSON.stringify(numChanged)+' types! post some more stuff... :)');
  res.end();
});



const server = module.exports = http.createServer(router.route);
