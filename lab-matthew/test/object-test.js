'use strict';

const superagent = require('superagent');
const expect = require('expect');
const Character = require('../model/character.js');
const server = require('../lib/server.js');
// let tempNote;

let tempHero;

describe('testing character routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('Character constructor', () => {
    it('should respond with a character', (done) => {
      superagent.post('localhost:3000/api/characters');
      let hero = new Character('Matthew', 'Lion', 'Shepherd', 'Gravity');
      expect(hero.name).toEqual('Matthew');
      expect(hero.species).toEqual('Lion');
      expect(hero.profession).toEqual('Shepherd');
      expect(hero.power).toEqual('Gravity');
      done();
    });
  });

  describe('Testing POST /api/characters', () => {
    it('should respond with a character and 201', (done) => {
      superagent.post('localhost:3000/api/characters')
      .send(JSON.stringify({name : 'Matthew', species : 'Lion', profession : 'Shepherd', power : 'Gravity'}))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Matthew');
        expect(res.body.species).toEqual('Lion');
        expect(res.body.profession).toEqual('Shepherd');
        expect(res.body.power).toEqual('Gravity');
        tempHero = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/characters')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('Testing GET /api/characters', () => {
    it('should respond with a character and a 200 status', (done) => {
      superagent.get(`localhost:3000/api/characters?id=${tempHero.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempHero.id);
        expect(res.body.name).toEqual('Matthew');
        expect(res.body.species).toEqual('Lion');
        expect(res.body.profession).toEqual('Shepherd');
        expect(res.body.power).toEqual('Gravity');
        tempHero = res.body;
        done();
      });
    });
    it('should respond with a 400 status', (done) => {
      superagent.get(`localhost:3000/api/characters`)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with a 404 status', (done) => {
      superagent.get(`localhost:3000/api/characters?id=ac2345-23f`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });

  describe('Testing PUT /api/characters', () => {
    it('should respond with a 202 status', (done) => {
      superagent.put(`localhost:3000/api/characters?id=${tempHero.id}`)
      .send(JSON.stringify({name : 'Matthew', species : 'Lion', profession : 'Shepherd', power : 'Flight'}))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        done();
      });
    });
    it('should respond with a 400 status', (done) => {
      superagent.put(`localhost:3000/api/characters?id=${tempHero.id}`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('Testing DELETE /api/characters', () => {
    it('should delete character resource and return 204', (done) => {
      superagent.delete(`localhost:3000/api/characters?id=${tempHero.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
    });
    it('should return 404 status', (done) => {
      superagent.delete(`localhost:3000/api/characters?id=23iu4fj2-239f`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
