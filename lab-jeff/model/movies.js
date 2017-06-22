'use strict';

const uuid = require('uuid');

module.exports = function Movie (title, year, genre) {
  if(!title || !year || !genre) throw new Error('Please enter a valid title, year, or genre.');
  this.title = title;
  this.year = year;
  this.genre = genre;
  this.id = uuid.v1();
};
