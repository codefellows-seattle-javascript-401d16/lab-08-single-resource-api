const uuid = require('uuid');

module.exports = function() {
  this.list = [];
  this.create = (newBeer) => {
    if(!(newBeer.name && newBeer.style && newBeer.brewer)) {
      return null;
    }
    const beerToAdd = {
      id: uuid.v1(),
      name: newBeer.name,
      style: newBeer.style,
      brewer: newBeer.brewer,
    };
    this.list.push(beerToAdd);
    return beerToAdd;
  };

  this.readById = (id) => {
    const found = this.list.find((beer) => beer.id === id);
    return found;
  };

  this.updateById = (id, beer) => {
    const idx = this.list.findIndex((beer) => beer.id === id);
    if(idx < 0) {
      return null;
    }
    const oldBeer = this.list.splice(idx, 1)[0];
    const newBeer = Object.assign({}, oldBeer, beer);
    this.list.push(newBeer);
    return newBeer;
  };

  this.deleteById = (id) => {
    const idx = this.list.findIndex((beer) => beer.id === id);
    if(idx >= 0) {
      this.list.splice(idx, 1);
      return true;
    }
    return false;
  };

  this.getAllIds = () => {
    return this.list.map(beer => beer.id);
  };

};
