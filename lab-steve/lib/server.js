'use strict';

const http = require('http');
const router = require('./router.js');
const Beer = require('../model/beer.js');


//create an object to store beers in
let storage = {};

router.post('/api/beers', (req, res) => {
  if(!req.body.name || !req.body.grain || !req.body.hops || !req.body.yeast) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: You\'re missing some required arguments.  You need name, grain, hops, & yeast.');
    res.end();
    return;
  }
  //use ../model/beer.js constructor and create new Beer then store the beer object in the storage object above.
  let beer = new Beer(req.body.name, req.body.grain, req.body.hops, req.body.yeast);
  storage[beer.id] = beer;
  // console.log(beer);
  console.log('Storage now contains: ', storage);

  res.writeHead(201, {
    'Content-Type' : 'application/JSON',
  });
  res.write(JSON.stringify(beer));
  res.end();
  return;
});

router.put('/api/beers', (req, res) => {
  if(!storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }

  if(!req.body.name || !req.body.grain || !req.body.hops || !req.body.yeast) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: You\'re missing some required arguments.  You need id, name, grain, hops, & yeast.');
    res.end();
    return;
  }

  storage[req.url.query.id] = {
    id: req.url.query.id,
    name: req.body.name,
    grain:  req.body.grain,
    hops: req.body.hops,
    yeast: req.body.yeast,
  };

  console.log('Storage now contains: ', storage);
  res.writeHead(202, {
    'Content-Type' : 'application/JSON',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
  return;
});

router.delete('/api/beers', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(400, {
      'Content-Type' : 'text/plain',
    });
    res.write('Bad Request: Query string with id must be included!');
    res.end();
    return;
  }
  if(!storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }
  delete storage[req.url.query.id];
  console.log('Storage now contains: ', storage);
  res.writeHead(204, {
    'Content-Type' : 'text/plain',
  });
  res.write('Beer with ID \'' + req.url.query.id + '\' removed!');
  res.end();
  return;
});

router.get('/api/beers', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(200, {
      'Content-Type' : 'application/JSON',
    });
    res.write(JSON.stringify(Object.keys(storage).map(key => storage[key])));
    res.end();
    return;
  }
  if(!storage[req.url.query.id]) {
    res.writeHead(404, {
      'Content-Type' : 'text/plain',
    });
    res.write('Beer ID \'' + req.url.query.id + '\' not found!');
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type' : 'application/JSON',
  });
  res.write(JSON.stringify(storage[req.url.query.id]));
  res.end();
  return;
});

//create server, passing in router.route from the router object created in ./router.js
module.exports = http.createServer(router.route);
