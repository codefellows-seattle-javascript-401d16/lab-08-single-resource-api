'use strict';

const uuid = require('uuid');

const Insta = module.exports = function(image, content) {
  this.id = uuid.v1();
  this.image = image;
  this.content = content;
};
