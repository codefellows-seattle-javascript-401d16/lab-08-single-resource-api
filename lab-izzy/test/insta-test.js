'use strict';

const superagent = require('superagent');
const expect = require('expect');
const uuid = require('uuid');

const server = require('../lib/server.js');
let tempInsta;

describe('testing insta routes', () => {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/instas', () => {
    it('should respond with an insta post', (done) =>{
      superagent.post('localhost:3000/api/instas')
        .send({content: 'example data'})
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.content).toEqual('example data');
          tempInsta = res.body;
          done();
        });
    });

    it('post should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/instas')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('testing GET /api/instas', () => {
    it('should respond with an insta', (done) => {
      superagent.get(`localhost:3000/api/instas?id=${tempInsta.id}`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(tempInsta.id);
          expect(res.body.content).toEqual('example data');
          tempInsta = res.body;
          done();
        });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.get(`localhost:3000/api/instas?id=`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });

    it('should respond with a 404', (done) => {
      superagent.get(`localhost:3000/api/instas?id=${uuid.v1()}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });

  describe('testing PUT /api/instas', () => {
    it('should return 200', (done) => {
      superagent.put(`localhost:3000/api/instas?id=${tempInsta.id}`)
        .send({content: 'example data'})
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.content).toEqual('example data');
          tempInsta = res.body;
          done();
        });
    });

    it('should return 400', (done) => {
      superagent.put(`localhost:3000/api/instas?id=${tempInsta.id}content=`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });

  describe('testing DELETE /api/instas', () => {
    it('should return 404', (done) => {
      superagent.delete(`localhost:3000/api/instas`)
        .send({id: 687})
        .end((err) => {
          expect(err.status).toEqual(404);
          done();
        });
    });
    it('should return 204', (done) => {
      superagent.delete(`localhost:3000/api/instas?id=${tempInsta.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });

    describe('testing for routes that have not been registered', () => {
      it('should return a 404', (done) => {
        superagent.get('localhost:3000/this/is/slugggy')
          .end((err) => {
            expect(err.status).toEqual(404);
            done();
          });
      });
    });
  });
});
