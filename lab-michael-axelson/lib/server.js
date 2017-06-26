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
  storage[food.id] = food;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(food));
  res.end();
});

router.get('/foods', (req, res) => {
  console.log('get request');
  // console.log(storage);
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('you need to send an id');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  // console.log(res.status);
  // console.log(req.url.query.id);
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});

router.delete('/foods', (req,res) => {
  // console.log('this is storage...',storage);

  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('you need to send an id');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    res.end();
    return;
  }
  delete storage[req.url.query.id];
  res.writeHead(204, {
    'Content-Type': 'application/json',
  });
  res.end();
});

router.put('/foods', (req,res) => {
  if(!req.body) {
    res.writeHead(400,{
      'Content-Type':'plain/text',
    });
    res.write('body not found');
    res.end();
    return;
  }
  if(!req.url.query.id){
    res.writeHead(400, {
      'Content-Type':'plain/text',
    });
    res.write('you need to send an id');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]){
    res.writeHead(404, {
      'Content-Type':'plain/text',
    });
    res.write('file not found');
    res.end();
    return;
  }
  storage[req.url.query.id].content = req.body.content;
  storage[req.url.query.id].type = req.body.type;

  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
});
  // let changedFoods = [];
  // let numChanged = 0;
  // for (var keys in storage){
  //   if (req.url.query.id === storage[keys].type){
  //     storage[keys].content = req.url.query.content;
  //     changedFoods.push(storage[keys]);
  //     numChanged += 1;
  //     console.log(storage[keys]);
  //   }
  // }




const server = module.exports = http.createServer(router.route);
