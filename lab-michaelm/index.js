'use strict';

const server = require('./lib/server.js');
const port = process.env.PORT || 3000;

server.listen(3000, () => console.log(`Server up on port:${port}`));
