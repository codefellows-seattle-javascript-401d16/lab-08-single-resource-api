'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Seahawk = require('../model/seahawk.js');

describe('Seahawk model test', () => {
  it('Should return a Seahawk Object', () => {
    let me = new Seahawk('Spencer Gietzen', 'TB', 'rand/pic.png');
    expect(me.name).toEqual('Spencer Gietzen');
    expect(me.position).toEqual('TB');
    expect(me.picture).toEqual('rand/pic.png');
  });
});

describe('/api/seahawks routes', () => {
  let tempSeahawk;
  before(done => {
    server.listen(3000, () => done());
  });
  after(done => {
    server.close(() => done());
  });
  describe('POST', () => {
    it('Should respond 201 with \'Seahawk added!\'', done => {
      superagent.post('localhost:3000/api/seahawks')
        .send({name: 'Russell Wilson', position: 'QB', picture: 'testpic/pic.png'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.post('localhost:3000/api/seahawks')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('GET', () => {
    it('Should respond 200 with a Seahawk', done => {
      superagent.get(`localhost:3000/api/seahawks?id=${tempSeahawk.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {

    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {

    });
  });
  describe('PUT', () => {
    it('Should respond 202 with \'Seahawk updated!\'', done => {

    });
    it('Should respond 400 with \'Bad request!\'', done => {

    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {

    });
  });
  describe('DELETE', () => {
    it('Should respond 204 with \'Seahawk deleted!\'', done => {

    });
    it('Should respond 400 with \'Bad request!\'', done => {

    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {

    });
  });
});
