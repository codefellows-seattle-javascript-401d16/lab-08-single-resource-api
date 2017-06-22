'use strict';

const uuid = require('uuid');

module.exports = function(userName, content) {
  this.userName = userName;
  this.id = uuid.v1();
  this.content = content;
};
