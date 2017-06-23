'use strict';

const http = require('http');
const router = require('./router.js');
const Beer = require('../model/beer.js');


//create an object to store beers in
let storage = {};

router.post('/api', (req, res) => {
  if(!req.body.name || !req.body.grain || !req.body.hops || !req.body.yeast) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: You\'re missing some required arguments.  You need name, grain, hops, yeast)');
    res.end();
    return;
  }
  //use ../model/beer.js constructor and create new Beer then store the beer object in the storage object above.
  let beer = new Beer(req.body.name, req.body.grain, req.body.hops, req.body.hops);
  storage[beer.id] = beer;
  console.log(beer);

  res.writeHead(201, {
    'Content-Type' : 'application/JSON',
  });
  res.write(JSON.stringify(beer));
  res.end();
  return;
});

console.log(storage);



//create server, passing in router.route from the router object created in ./router.js
module.exports = http.createServer(router.route);
