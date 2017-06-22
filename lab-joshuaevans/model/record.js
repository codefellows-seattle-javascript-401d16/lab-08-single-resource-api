'use strict';

const uuid = require('uuid');

class Note {
  constructor(title, artist){
    this.id = uuid.v4();
    this.title = title;
    this.artist = artist;
  }
}

module.exports = Note;
