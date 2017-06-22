'use strict';

const uuid = require('uuid/v1');

//start of my object constructor on POST requests
module.exports = function(age, style) {
  this.id = uuid.v1();
  this.age = age;
  this.style = style;
};
