'use strict';

const uuid = require('uuid');

const model = module.exports = {};

model.Post = function(userName) {
  this.userName = userName;
  this.id = uuid.v1();
  this.content = req.body.content;
};
