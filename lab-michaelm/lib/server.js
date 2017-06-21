'use strict'

// node modules
const http = require('http');
const router = require('./router.js');
const uuid = require('uuid');

var storage = {}

// npm modules
// app modules
// module logic
// register routes with router
router.get('/hello', (req, res) => {
  res.write('yeyyeyeyye')
  res.end()
})

router.post('/api/notes', (req, res) => {
  console.log('hit /api/notes')
  // logic for POST /lulwat
  if(!req.body.content){
    res.write(400)
    res.end()
    return
  }

  // uuid  genorate a random string that will not likely conflict with a future random string
  let note = {
    id: uuid.v1(),
    content: req.body.content,
  }

  storage[note.id] = note;
  res.writeHead(200, {
    'Content-Type': 'application/json',
  })
  res.write(JSON.stringify(note))
  res.end()
});

router.get('/api/notes', (req, res) => {
  if(!req.url.query.id){
    res.writeHead(400)
    res.end()
    return ;
  }

  if(!storage[req.url.query.id]){
    res.writeHead(404)
    res.end()
    return ;
  }

  res.writeHead(200, {
    'Content-Type': 'application/json',
  })

  res.write(JSON.stringify(storage[req.url.query.id]))
  res.end()

});

// create server
const server = module.exports = http.createServer(router.route);


// how we did it first
//http.createServer((req, res) => {
  //router.route(req,res)
//})



















