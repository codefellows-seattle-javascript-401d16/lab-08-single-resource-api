'use strict';

const expect = require('expect');
const request = require('superagent');
const server = require('../lib/server.js');
const Beer = require('../model/beer.js');

// request
//   .post('localhost:3000/api/beers')
//   .send({name: 'hef', grain: 'wheat', hops: 'hallertau', yeast: 'WL300'})
//   .end(function(err){
//     if (err) return (err);
//   });
// request
//   .post('localhost:3000/api/beers')
//   .send({name: 'IPA', grain: '2Row', hops: 'magnum', yeast: 'S05'})
//   .end(function(err){
//     if (err) return (err);
//   });
// request
//   .post('localhost:3000/api/beers')
//   .send({name: 'pale ale', grain: '2Row', hops: 'chinook', yeast: 'S05'})
//   .end(function(err){
//     if (err) return (err);
//   });
// request
//   .get('localhost:3000/api/beers')
//   .end(function(err, res){
//     if (err) return (err);
//     console.log(res.body.length);
//   });

describe('testing simple resource server', () => {
  before((done) => {
    server.http.listen(3000, () => done());
  });
  after((done) => {
    server.http.close(() => done());
  });
  it('should return 201 status code and an object with name \'pale ale\'.', (done) => {
    request //to be used in later test
      .post('localhost:3000/api/beers')
      .send({name: 'hef', grain: 'wheat', hops: 'hallertau', yeast: 'WL300'})
      .end(function(err){
        if (err) return done(err);
      });
    request //to be used in later request
      .post('localhost:3000/api/beers')
      .send({name: 'IPA', grain: '2Row', hops: 'magnum', yeast: 'S05'})
      .end(function(err){
        if (err) return done(err);
      });
    request //subject of the test, also to be used in later test
      .post('localhost:3000/api/beers')
      .send({name: 'pale ale', grain: '2Row', hops: 'chinook', yeast: 'S05'})
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual('pale ale');
        done();
      });
  });

  it('should return 400 error and status codes for POST request with no data sent.', (done) => {
    request
      .post('localhost:3000/api/beers')
      .end(function(err, res){
        expect(err.status).toEqual(400);
        expect(res.status).toEqual(400);
        done();
      });
  });

  it('should return 200 status code and an array of three beer objects of length 3.', (done) => {
    request
      .get('localhost:3000/api/beers')
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.length).toEqual(3);
        done();
      });
  });
  it('should return 404 error and status code and text \'Beer ID \'1\' not found!\'', (done) => {
    request
      .get('localhost:3000/api/beers?id=1')
      .end(function(err, res){
        expect(err.status).toEqual(404);
        expect(res.status).toEqual(404);
        expect(res.text).toEqual('Beer ID \'1\' not found!');
        done();
      });
  });
  let sample = new Beer('stout', '2-row, 300L', 'chinook', 'S04');
  it('should return 200 status code and beer data for specific ID.', (done) => {
    server.storage[sample.id] = sample;
    request
      .get(`localhost:3000/api/beers?id=${sample.id}`)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.name).toEqual('stout');
        done();
      });
  });
  it('should return 202 status code for valid PUT request with name changed to \'porter\'.', (done) => {
    request
      .put(`localhost:3000/api/beers?id=${sample.id}`)
      .send({name: 'porter', grain: '2Row, 300L', hops: 'chinook', yeast: 'S04'})
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.name).toEqual('porter');
        done();
      });
  });
  it('should return 400 error and status code for PUT request without data sent.', (done) => {
    request
      .put('localhost:3000/api/beers')
      .end(function(err, res){
        expect(err.status).toEqual(400);
        expect(res.status).toEqual(400);
        done();
      });
  });
  it('should return 404 error and status codes for DELETE request without a valid ID and response Beer ID \'1\' not found!.', (done) => {
    request
      .delete('localhost:3000/api/beers?id=1')
      .end(function(err, res){
        expect(err.status).toEqual(404);
        expect(res.status).toEqual(404);
        expect(res.text).toEqual('Beer ID \'1\' not found!');
        done();
      });
  });
  it('should return 204 status code for DELETE request with valid ID', (done) => {
    request
      .delete(`localhost:3000/api/beers?id=${sample.id}`)
      .end(function(err, res){
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
  });
});
