'use strict';

const uuid = require('uuid');
const server = require('../lib/server.js')

module.exports = function Record(title, artist) {
  this.title = title;
  this.artist = artist;
  this.id = uuid.v4();
};
