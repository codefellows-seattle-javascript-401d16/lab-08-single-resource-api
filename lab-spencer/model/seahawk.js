'use strict';

module.exports = function Seahawk(playerID, name, height, weight, position, picture) {
  this.id = playerID;
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.position = position;
  this.picture = picture;
};
