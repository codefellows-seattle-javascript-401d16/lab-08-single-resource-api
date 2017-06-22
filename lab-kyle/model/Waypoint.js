'use strict';
const uuid = require('uuid');

module.exports = function (name, lat, long, desc) {
  this.id = uuid.v1();
  this.name = name;
  this.latitude = lat;
  this.longitude = long;
  this.description = desc;
};
