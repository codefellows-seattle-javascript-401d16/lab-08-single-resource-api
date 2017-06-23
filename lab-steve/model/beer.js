'use strict';

const uuid = require('uuid');

const Beer = module.exports = function(name, grain, hops, yeast) {
  this.id = uuid.v1();
  this.name = name;
  this.grain = grain;
  this.hops = hops;
  this.yeast = yeast;
};

console.log('The basics: ', Beer);
