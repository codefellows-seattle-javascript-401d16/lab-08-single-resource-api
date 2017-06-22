'use strict';
const uuid = require('uuid');

module.exports = function (name, age) {
  this.id = uuid.v1();
  this.name = name;
  this.age = age;
};
