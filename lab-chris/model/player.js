'use strict';

const uuid = require('uuid');

module.exports = function Player(name, team, position) {
  this.name = name;
  this.team = team;
  this.position = position;
  this.id = uuid.v1();
};
