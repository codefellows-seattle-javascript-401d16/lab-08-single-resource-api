'use strict'

const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
let tempNote;

describe('testing /foods routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST foods', () => {
    it('should respond with food!', (done) => {
      superagent.post('localhost:3000/foods')
      .send({type: 'breads', 'content':'yeahhhh dude'})
      .end((err, res) => {
        console.error(err);
        if (err) return done(err);
        expect(res.body.type).toEqual('breads');
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/foods')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET foods', () => {
    it('should respond with a soup!', (done) => {
      superagent.post(`localhost:3000/foods`)
      .send({type: 'breads',content:'so good'});
      superagent.get(`localhost:3000/foods`)
      .send({type: 'breads'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.type).toEqual('breads');
        expect(res.body.content).toEqual('so good');
        // tempNote = res.body;
        done();
      });
    });
  });

  describe('testing DELETE foods', () => {
    it('should respond with a deleted food item!', (done) => {
      superagent.post(`localhost:3000/foods`)
      .send({type: 'breads',content:'so good'});
      superagent.delete(`localhost:3000/foods`)
      .send({type: 'breads'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.type).toEqual('breads');
        expect(res.body.content).toEqual('so good');
        // tempNote = res.body;
        done();
      });
    });
  });
});
