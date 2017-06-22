'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
const database = require('../model/database');

let id = '';

describe('testing http methods', () => {
  before(done => server.listen(3000, () => done()));
  after(done => server.close(() => done()));

  describe('testing POST route', () => {
    it('should return 400 status and bad request string when request body invalid', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({})
        .end((err, res) => {
          expect(res.text).toBe('bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 201 status when request body valid', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({ name: 'michael', password: 'abcd', email: 'michael@stuart.com'})
        .end(((err, res) => {
          id = Object.keys(database)[0];
          expect(id).toExist();
          expect(res.status).toEqual(201);
          done();
        }));
    });
  });

  describe('testing GET route', () => {
    it('should return 404 status and not found string when query invalid', (done) => {
      superagent.get('localhost:3000/api/user?id=invalid')
        .end((err, res) => {
          expect(res.text).toBe('not found');
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return 200 status and user id array when query undefined', (done) => {
      superagent.get('localhost:3000/api/user')
        .end((err, res) => {
          expect(typeof JSON.parse(res.text)[0]).toBe('string');
          expect(res.status).toEqual(200);
          done();
        });
    });
    it('should return 200 status and user object when query valid', (done) => {
      superagent.get(`localhost:3000/api/user?id=${id}`)
        .end((err, res) => {
          expect(JSON.parse(res.text).id).toBe(id);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });

  describe('testing PUT route', () => {
    it('should return 404 status and not found string when query invalid', (done) => {
      superagent.put('localhost:3000/api/user?id=invalid')
        .send({})
        .end((err, res) => {
          expect(res.text).toBe('bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 404 status and not found string when request body invalid', (done) => {
      superagent.put('localhost:3000/api/user')
        .send({ id: 'invalid' })
        .end((err, res) => {
          expect(res.text).toBe('bad request');
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should return 202 status and user object when request body valid', (done) => {
      superagent.put('localhost:3000/api/user')
        .send({ id, name: 'mike' })
        .end(((err, res) => {
          expect(database[id].name).toBe('mike');
          expect(res.status).toEqual(202);
          done();
        }));
    });
    it('should return 202 status and user object when query valid', (done) => {
      superagent.put(`localhost:3000/api/user?id=${id}`)
        .send({ name: 'mike' })
        .end(((err, res) => {
          expect(database[id].name).toBe('mike');
          expect(res.status).toEqual(202);
          done();
        }));
    });
  });

  describe('testing DELETE route', () => {
    it('should return 404 status and not found string when query invalid', (done) => {
      superagent.delete('localhost:3000/api/user?id=invalid')
        .end((err, res) => {
          expect(res.text).toBe('not found');
          expect(res.status).toEqual(404);
          done();
        });
    });
    it('should return 204 status and user object when query valid', (done) => {
      superagent.delete(`localhost:3000/api/user?id=${id}`)
        .end((err, res) => {
          expect(database[id]).toNotExist();
          expect(res.status).toEqual(204);
          done();
        });
    });
  });
});
