'use strict';

const uuid = require('uuid');

const user = modules.export = {};


function Profile() {
  this.id = uuid.v1();
  this.content = req.body.content;
}
