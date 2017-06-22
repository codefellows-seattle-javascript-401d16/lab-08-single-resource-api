'use strict';

const superagent = require('superagent');
const expect = require('expect');
const FBPost = require('../model/model.js');
const server = require('../lib/server.js');
const uuid = require('uuid');

let friendPost = new FBPost('friendPost', 'cat');
describe('testing post routes', function() {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });
  let testId;
  describe('testing POST /api/posts', () => {
    it('should respond with 201', (done) => {
      superagent.post('localhost:3000/api/posts')
        .send({userName : 'stephanie', content: 'cat'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          testId = res.body.id;
          expect(res.body.userName).toEqual('stephanie');
          expect(res.body.content).toEqual('cat');
          friendPost = res.body;
          done();
        });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/posts')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('testing PUT /api/posts', () => {
    it('should respond with 202', (done) => {
      superagent.put(`localhost:3000/api/posts?id=${testId}`)
        .send({userName : 'sally', content: 'dog'})
        .end((err, res) => {
          console.log('error', err);
          
          if (err) return done(err);
          expect(res.status).toEqual(202);
          expect(res.body.userName).toEqual('sally');
          done();
        });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.put('localhost:3000/api/posts?id=null')
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('testing GET /api/posts', () => {
    it('should respond with a 200', (done) => {
      superagent.get(`localhost:3000/api/posts?id=${testId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.userName).toEqual('sally');
          expect(res.body.content).toEqual('dog');
          friendPost = res.body;
          done();
        });
    });
    it('should respond with a 400', (done) => {
      superagent.get(`localhost:3000/api/posts?id=`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('should respond with a 404', (done) => {
      superagent.get(`localhost:3000/api/posts?id=${uuid.v1}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

  describe('testing DELETE /api/posts', () => {
    it('should respond with 204', (done) => {
      superagent.delete(`localhost:3000/api/posts?id=${testId}`)
        .send({})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(204);
          expect(res.body.id).toNotExist();
          done();
        });
    });

    it('should respond with a 404 bad request', (done) => {
      superagent.delete(`localhost:3000/api/posts?id=${uuid.v1}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});
