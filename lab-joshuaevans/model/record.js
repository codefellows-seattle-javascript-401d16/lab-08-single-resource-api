'use strict';

const dbase = require('./dbase.js');

class Record {
  constructor(title, artist){
    this.title = title;
    this.artist = artist;
  }

  save(){
    return dbase.setItem(this);
  }

  update(){
    return dbase.updateItem(this);
  }

  delete(){
    return dbase.deleteItem(this.id);
  }
}

Record.findById = (id) => {
  return dbase.findItem(id)
  .then(data => { data;
  });
};

module.exports = Record;
