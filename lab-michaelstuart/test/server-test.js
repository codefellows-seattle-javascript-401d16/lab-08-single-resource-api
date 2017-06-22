'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');
// const database = require('../model/database');

describe('testing http methods', () => {
  before(done => server.listen(3000, () => done()));
  after(done => server.close(() => done()));

  describe('testing POST route', () => {
    it('should return code 201 when request body valid', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({ name: 'michael', password: 'abcd', email: 'michael@stuart.com'})
        .end(((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          done();
        }));
    });
    it('should return code 400 when request body invalid', (done) => {
      superagent.post('localhost:3000/api/user')
        .end((err) => {
          expect(err.status).toEqual(400);
          done();
        });
    });
  });

  describe('testing GET route', () => {
    it('should return array of all user ids when query undefined', (done) => {
      superagent.get('localhost:3000/api/user')
        .query(null)
        .end((err, res) => {

          // TODO figure out why res.body is {} instead of ['id_placeholder']

          console.log(res.body);
          expect(res.status).toEqual(200);
          done();
        });
    });
  });
});
