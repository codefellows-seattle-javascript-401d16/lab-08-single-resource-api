'use strict';

const superagent = require('supergent');
const expect = require('expect');
const Post = require('model.js');
const server = require('../lib/server.js');

let tempPost = new Post('tempPost');

describe('testing post routes', function() {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/posts', () => {
    it('should respond with a post', (done) => {
      superagent.post('localhost:3000/api/posts')
        .send({content: 'example data'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.content).toEqual('example data');
          tempPost = res.body;
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
      superagent.get('localhost:3000/api/posts?id=${tempPost.id}')
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(tempPost.id);
          expect(res.body.id).toEqual('example data');
          expect(res.body.content).toEqual('example data');
          tempPost = res.body;
          done();
        });
    });
  });
});
