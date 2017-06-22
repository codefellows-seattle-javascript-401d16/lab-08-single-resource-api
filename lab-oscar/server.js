'use strict';

const server = require('./lib/server.js');

//variable to hold the port number our server will listen to
const PORT = 3000;

server.listen(PORT, () => console.log(`Server is Up on Port: ${PORT}`));
