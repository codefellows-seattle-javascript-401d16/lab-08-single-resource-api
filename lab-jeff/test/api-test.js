'use strict';

const superagent = require('superagent');
const server = require('../lib/server.js');
const expect = require('expect');

let tempMovie;

describe('testing movie routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/movies', () => {
    it('should respond with a movie', (done) => {
      superagent.post('localhost:3000/api/movies')
      .send({title: 'The Departed', year: 2006, genre: 'thriller'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.title).toEqual('The Departed');
        tempMovie = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/movies')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/movies', () => {
    it('should respond with a 200', (done) => {
      superagent.get(`localhost:3000/api/movies?id=${tempMovie.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempMovie.id);
        tempMovie = res.body;
        done();
      });
    });
    it('should respond with a 404 not found', (done) => {
      superagent.get(`localhost:3000/api/movies?id=6`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.get('localhost:3000/api/movies?=')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing PUT /api/movies', () => {
    it('should respond with a 400 bad request', (done) => {
      superagent.put('localhost:3000/api/movies')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with a movie', (done) => {
      superagent.put('localhost:3000/api/movies')
      .send({title: 'The Departed', year: 2006, genre: 'thriller'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.title).toEqual('The Departed');
        tempMovie = res.body;
        done();
      });
    });
  });
  describe('testing DELETE /api/movies', () => {
    it('should respond with a 404 not found', (done) => {
      superagent.delete(`localhost:3000/api/player?i`)
      .send({id: 6})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should delete a movie and return a 204', (done) => {
      superagent.delete('localhost:3000/api/movies?id=6')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
    });
  });
});
