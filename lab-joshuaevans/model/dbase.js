'use strict';

let uuid = require('uuid');
let fs = require('fs-extra');
let Record = require('./record.js');

let dbase = module.exports = {};

const cache = {};

dbase.setItem = (data) => {
  data.id = uuid.v1();
  return fs.writeJson(`${__dirname}/../data/${data.id}`, data)
  .then(() => data);
};

dbase.findItem = (id) => {
  let pathname = (`${__dirname}/../data/${id}`);
  return fs.pathExists(pathname)
  .then(exists => {
    if(exists){
      return fs.readJson(pathname);
    }
  })
  .catch(err => {
    console.log(err);
  });
};

dbase.updateItem = (data) => {
  let pathname = (`${__dirname}/../data/${data.id}`);
  if(data.id){
    return fs.pathExists(pathname)
    .then(exists => {
      if(exists){
        return fs.writeJson(pathname);
      }
    });
  }
};

dbase.deleteItem = (id) => {
  let pathname = (`${__dirname}/../data/${id}`);
  if (pathname){
    return fs.remove(pathname);
  }
};
