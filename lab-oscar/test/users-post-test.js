'use strict';
const superagent = require('superagent');
const expect = require('expect');

const user = require('../model/users.js');
const server = require('../lib/server.js');

let tempUser;


describe('testing users routes', () =>{
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/user', () => {
    it('should create a user', (done) => {
      superagent.post('localhost:3000/api/user')
        .send({username:'mrmalo',pwd:'secret',fname:'oscar',lname:'cauich'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          tempUser = res.body;
          done();
        });
    });
  });

  describe('testing GET /api/user', () => {
    it('should respond with a new user', (done) => {
      superagent.get(`localhost:3000/api/user?id=${tempUser.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(tempUser.id);
          expect(res.body.fname).toEqual('oscar');
          tempUser = res.body;
          done();
        });
    });
  });

  describe('testing DELETE /api/user', () =>{
    it('should delete the specify user', (done) => {
      superagent.delete(`localhost:3000/api/user?id=${tempUser.id}`)
        .end((err, res) => {
          if(err) return done(err);
          console.log('stops');
          expect(res.status).toEqual(204);
          expect(res.body.id).toEqual(undefined);
          done();
        });
    });
    it('should respond with 404', (done) => {
      superagent.delete('localhost:3000/api/user?id=234324234')
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(404);
        });
    });
  });
});
