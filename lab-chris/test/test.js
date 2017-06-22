'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
let tempPlayer;

describe('testing player routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/player', () => {
    it('should respond with a new player', (done) => {
      superagent.post('localhost:3000/api/player')
      .send({name: 'Messi', team: 'Barcelona', position: 'GOAT'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Messi');
        tempPlayer = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/player')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/soccer', () => {
    it('should respond with a 200', (done) => {
      superagent.get(`localhost:3000/api/player?id=${tempPlayer.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempPlayer.id);
        tempPlayer = res.body;
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.get(`localhost:3000/api/player?id=broke`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });

    it('should respond with a 400', (done) => {
      superagent.get(`localhost:3000/api/player?id=`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing PUT /api/player', () => {
    it('should respond with a 202', (done) => {
      superagent.put(`localhost:3000/api/player?id=${tempPlayer.id}`)
      .send({name: 'Messi', team: 'Barcelona', position: 'GOAT'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Messi');
        tempPlayer = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.put(`localhost:3000/api/player`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing DELETE /api/player', () => {
    it('should respond with a 204', (done) => {
      superagent.delete(`localhost:3000/api/player?id=${tempPlayer.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.delete(`localhost:3000/api/player?i`)
      .send({id: 777})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
