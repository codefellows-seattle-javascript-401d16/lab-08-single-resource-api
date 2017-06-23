'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
let tempNote;

describe('testing opt routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/opt', () => {
    it('Should respond with 201 created.', (done) => {
      superagent.post('localhost:3000/api/opt')
      .send({name: 'mike', age: '31'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('mike');
        expect(res.body.age).toEqual('31');
        tempNote = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/opt')
      .send('')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing PUT /api/opt', () => {
    it('Should respond with 202.', (done) => {
      superagent.put(`localhost:3000/api/opt`)
      .send({id: tempNote.id, name: 'jon', age: '10'})
      .end((err, res) => {
        expect(res.body.id).toEqual(tempNote.id);
        expect(res.status).toEqual(202);
        tempNote = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.put('localhost:3000/api/opt')
      .send('')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/opt', () => {
    it('should respond with id, name, and age.', (done) => {
      superagent.get(`localhost:3000/api/opt?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempNote.id);
        expect(res.body.name).toEqual('jon');
        expect(res.body.age).toEqual('10');
        tempNote = res.body;
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.get('localhost:3000/api/opt')
      .send('')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with 404', (done) => {
      superagent.get(`localhost:3000/api/opt?id=1`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
  });

  describe('testing Delete /api/opt', () => {
    it('should respond with 202 User deleted.', (done) => {
      superagent.delete(`localhost:3000/api/opt?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        done();
      });
    });
    it('should respond with a 400 bad request', (done) => {
      superagent.delete('localhost:3000/api/opt')
      .send('')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with 404 not found', (done) => {
      superagent.delete(`localhost:3000/api/opt?id=1`)
      .end((err, res) => {
        expect(res.statusCode).toEqual(404);
        done();
      });
    });
  });

});
