'use strict';

const uuid = require('uuid');

//TODO*DONE: Create a Object Constructor that creates a simple resource with at least 3 properties
//TODO*DONE: An id property that is set to a unique node-uuid id is required
//TODO*DONE: Also include two other properties of your choice (like name, creationDate, etc.)

module.exports = class Task {
  constructor(taskName, xp, id){
    this.taskName = taskName;
    this.xp = xp;
    id ? this.id = id : this.id = uuid.v1();
  }
};
