'use strict';

const server = require('./lib/server.js');

server.listen(3000, () => {
  console.log('Burger Me Bro is serving things up at port 3000');
});