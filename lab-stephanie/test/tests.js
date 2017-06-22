'use strict';

const superagent = require('superagent');
const expect = require('expect');
const FBPost = require('../model/model.js');
const server = require('../lib/server.js');

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
    it('should respond with a post', (done) => {
      superagent.post('localhost:3000/api/posts')
        .send({userName : 'stephanie', content: 'cat'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
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

  describe('testing GET /api/posts', () => {
    it('should respond with a post', (done) => {
      superagent.get(`localhost:3000/api/posts?id=${testId}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.userName).toEqual('stephanie');
          expect(res.body.content).toEqual('cat');
          friendPost = res.body;
          done();
        });
    });
  });
});
