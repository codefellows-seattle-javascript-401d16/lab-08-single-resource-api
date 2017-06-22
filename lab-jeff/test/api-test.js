'use strict';

const server = require('../lib/server.js');
const superagent = require('superagent');
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
    it('should respond with a 201', (done) => {
      superagent.post('localhost:3000/api/movies')
      .send(JSON.stringify( {title: 'The Departed', year: '2006', genre: 'thriller'}))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.title).toEqual('The Departed');
        expect(res.body.year).toEqual('2006');
        expect(res.body.genre).toEqual('thriller');
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
        expect(res.body.title).toEqual('The Departed');
        expect(res.body.year).toEqual('2006');
        expect(res.body.genre).toEqual('thriller');
        tempMovie = res.body;
        done();
      });
    });
    it('should respond with a 404 not found', (done) => {
      superagent.get(`localhost:3000/api/movies?id=6`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.get('localhost:3000/api/movies')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing PUT /api/movies', () => {
    it('should respond with a 202', (done) => {
      superagent.put(`localhost:3000/api/movies?id=${tempMovie.id}`)
      .send(JSON.stringify( {title: 'The Departed', year: '2006', genre: 'thriller'}))
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toExist();
        expect(res.body.title).toEqual('The Departed');
        expect(res.body.year).toEqual('2006');
        expect(res.body.genre).toEqual('thriller');
        tempMovie = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.put(`localhost:3000/api/movies?id=${tempMovie.id}`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });
  describe('testing DELETE /api/movies', () => {
    it('should return a 204', (done) => {
      superagent.delete(`localhost:3000/api/movies?id=${tempMovie.id}`)
      .end((err, res) => { console.log(tempMovie); console.log(res.status);
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
    });
    it('should respond with a 404 not found', (done) => {
      superagent.delete(`localhost:3000/api/movies?i`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
