'use strict';
let uuid = require('uuid');

class OptIn {
  constructor(name, age) {
    this.id = uuid.v1();
    this.name = name;
    this.age = age;
  }
}
//   save(){
//     return storage.setItem(this);
//   }
//
//   update(){
//     return storage.updateItem(this);
//   }
//
//   delete(){
//     return storage.deleteItem(this);
//   }
// }
//
// OptIn.fetchId = (id) => {
//   return storage.fetchItem(id);
// };

module.exports = OptIn;
