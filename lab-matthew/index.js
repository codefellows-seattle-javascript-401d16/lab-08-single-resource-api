'use strict';

const server = require('./lib/server.js');
server.listen(333, () => console.log('server up on 3000'));
