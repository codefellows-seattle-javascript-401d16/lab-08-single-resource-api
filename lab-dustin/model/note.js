'use strict';

const uuid = require('uuid');

module.exports = function (content)  {
  this.id = uuid.v1();
  this.dateCreated = new Date();
  this.content = content;
};
