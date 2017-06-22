'use strict';

const uuid = require('uuid/v1');

module.exports = function(name, location, stars){
  this.id = uuid();
  this.name = name;
  this.location = location;
  this.stars = stars;
};