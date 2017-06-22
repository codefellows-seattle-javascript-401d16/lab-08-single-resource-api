const BeerList = require('../model/beerlist.js');
const expect = require('expect');

describe('beer list model', () => {

  it('should construct an object', () => {
    const newlyMadeList = new BeerList();
    expect(newlyMadeList).toExist();
  });

  const testList = new BeerList();
  const exampleBeer = {
    name: 'Old Rasputin',
    brewer: 'North Coast',
    style: 'Russian Imperial Stout',
  };
  let testBeerId;
  it('should return an added object', () => {
    const returnedBeer = testList.create(exampleBeer);
    expect(returnedBeer.id).toExist();
    expect(returnedBeer.name).toEqual(exampleBeer.name);
    expect(returnedBeer.brewer).toEqual(exampleBeer.brewer);
    expect(returnedBeer.style).toEqual(exampleBeer.style);
    testBeerId = returnedBeer.id;
  });

  it('should fetch a stored object', () => {
    const returnedBeer = testList.readById(testBeerId);
    expect(returnedBeer.id).toEqual(testBeerId);
    expect(returnedBeer.name).toEqual(exampleBeer.name);
    expect(returnedBeer.brewer).toEqual(exampleBeer.brewer);
    expect(returnedBeer.style).toEqual(exampleBeer.style);
  });

  it('should update a stored beer', () => {
    const changesToBeer = {
      name: 'Old Rasputin',
      brewer: 'North Coast Brewing Co',
    };
    const updatedBeer = testList.updateById(testBeerId, changesToBeer);
    expect(updatedBeer.id).toEqual(testBeerId);
    expect(updatedBeer.name).toEqual(changesToBeer.name);
    expect(updatedBeer.brewer).toEqual(changesToBeer.brewer);
    expect(updatedBeer.style).toEqual(exampleBeer.style);
  });

  it('should delete a beer', () => {
    testList.deleteById(testBeerId);
    expect(testList.readById(testBeerId)).toBe(undefined);
  });

});
