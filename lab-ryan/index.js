'use strict';

const server = require('./lib/server.js');

server.listen(3000, () => {
  console.log('server is now running on port 3000');
});
