'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');

let hero;

describe('testing heroScore routes', function(){
  before((done) => {
    server.listen(5000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });
  describe('testing POST requests', () => {
    it('should return a hero name and score', (done) => {
      superagent.post('localhost:5000/api/heros')
      .send({hero: 'Thrall', score: '97'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.hero).toEqual('Thrall');
        expect(res.body.score).toEqual('97');
        hero = res.body;
        done();
      });
    });
    it('should return 400 error', (done) => {
      superagent.post('localhost:5000/api/heros')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing GET requests', () => {
    it('should return a hero name and score', (done) => {
      superagent.get(`localhost:5000/api/heros?id=${hero.id}`)
      .end((err, res) => {
        console.log(err);
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(hero.id);
        expect(res.body.hero).toEqual('Thrall');
        expect(res.body.score).toEqual('97');
        hero = res.body;
        done();
      });
    });
    it('should return 404 err', (done) => {
      superagent.get('localhost:5000/api/heros?id=1234')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should return 400 error', (done) => {
      superagent.post('localhost:5000/api/heros')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing PUT requests', () => {
    it('should return with 202 successful update', (done) => {
      superagent.put(`localhost:5000/api/heros?id=${hero.id}`)
      .send({hero: 'Zagara', score: '2'})
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toEqual(hero.id);
        expect(res.body.hero).toEqual('Zagara');
        expect(res.body.score).toEqual('2');
        hero = res.body;
        done();
      });
    });
    it('should return error status 400', (done) => {
      superagent.put(`localhost:5000/api/heros?id=${hero.id}`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing DELETE requests', () => {
    it('should return with success of success of 204', (done) => {
      superagent.delete(`localhost:5000/api/heros?id=${hero.id}`)
      .end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(204);
        expect(res.body.id).toEqual(undefined);
        expect(res.body).toBe('');
        done();
      });
    });
    it('should return a 404', (done) => {
      superagent.delete(`localhost:5000/api/heros`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
