'use strict';

const uuid = require('uuid');

module.exports = function Feelings(name, age, feeling) {
  this.name = name;
  this.age = age;
  this.feeling = feeling;
  this.id = uuid.v1();
};
