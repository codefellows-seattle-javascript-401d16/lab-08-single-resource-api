'use strict';

const server = require('./lib/server.js');

server.listen(3000, () => {
  return console.log(`Server is up on `, server.address().port);
});
