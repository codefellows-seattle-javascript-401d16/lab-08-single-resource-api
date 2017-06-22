'use strict';

const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
let tempNote;

describe('testing opt-in routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/opt', () => {
    it('should respond with mike', (done) => {
      superagent.post('localhost:3000/api/opt?name=mike')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('mike');
        tempNote = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/opt')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/opt', () => {
    it('should respond with mike', (done) => {
      superagent.get(`localhost:3000/api/opt?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempNote.id);
        expect(res.body.content).toEqual('mike');
        tempNote = res.body;
        done();
      });
    });
  });
});
