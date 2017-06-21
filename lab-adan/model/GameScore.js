'use strict';

module.exports = function GameScore(name, score, gameId){
  this.gameName = name;
  this.highScore = score;
  this.id = gameId;
};
