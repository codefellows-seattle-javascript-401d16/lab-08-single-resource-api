'use strict';

const superagent = require('superagent');
const expect = require('expect');
const Character = require('../lib/character.js');

const server = require('../lib/server.js');
let tempNote;

describe('testing note routes', function(){
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
        // if (err) return done(err);
      expect(hero.name).toEqual('Matthew');
      expect(hero.species).toEqual('Lion');
      expect(hero.profession).toEqual('Shepherd');
      expect(hero.power).toEqual('Gravity');
      done();
    });
  });

  describe('testing POST /api/characters', () => {
    it('should respond with a character', (done) => {
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
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing POST /api/notes', () => {
    it('should respond with a note', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({content: 'example data'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.content).toEqual('example data');
        tempNote = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/notes', () => {
    it('should respond with a note', (done) => {
      superagent.get(`localhost:3000/api/notes?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempNote.id);
        expect(res.body.content).toEqual('example data');
        tempNote = res.body;
        done();
      });
    });
  });
});
