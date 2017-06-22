'use strict';

const server = require('../lib/server.js');
const expect = require('expect');
const superagent = require('superagent');
const uuid = require('uuid');

describe('testing http methods', () => {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  let tempId = uuid.v4();
  let tempRecord;

  describe('testing POST method', () => {
    it('should return 200, testing for valid body', (done) => {
      superagent.post('localhost:3000/api/records')
      .send({title: 'titletest', artist: 'artisttest'})
      .end(((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        tempRecord = res.body;
        done();
      }));
    });
    it('should return 400, testing for no body or invalid value for body', (done) => {
      superagent.post('localhost:3000/api/records')
      .query({ not: 'right' })
      .end((err, res) => {
        expect(err.status).toEqual(400);
        expect(res.body).toExist();
        done();
      });
    });
  });

  describe('testing GET method', () => {
    it('should return not found when id is not found', (done) => {
      superagent.get(`localhost:3000/api/records?id=${uuid.v4()}`)
      .query({ id: 3874834})
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
    });
    it('should return 400 when id is not provided', (done) => {
      superagent.get('localhost:3000/api/records?id=')
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
    });
    it('should return 200 when correct information is passed in', (done) => {
      superagent.get(`localhost:3000/api/records?id=${tempRecord.id}`)
      .end((err, res) => {
        expect(res.body.id).toEqual(tempRecord.id);
        tempRecord = res.body;
        done();
      });
    });
  });

  describe('testing PUT method', () => {
    it('should return 400 for a bad put request, no body or invalid data', (done) => {
      superagent.put('localhost:3000/api/records')
      .send({ id: 87678 })
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
    });
    it('should return a 200 status witha  valid input on PUT', (done) => {
      superagent.put('localhost:3000/api/records')
      .query({id: tempRecord.id })
      .send({title: 'newthing', artist: 'newartist'})
      .end((err, res) => {
        expect(res.status).toEqual(200);
        done();
      });
    });
  });

  describe('testing DELETE method', () => {
    it('should return 404 for a valid request made for not found', (done) => {
      superagent.delete('localhost:3000/api/records')
      .send({ id: 87678 })
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
    });
    it('should return a 200 status witha valid DELETE method', (done) => {
      superagent.delete('localhost:3000/api/records')
      .query({id: tempRecord.id })
      .end((err, res) => {
        expect(res.status).toEqual(204);
        done();
      });
    });
  });

  describe('testing to make sure 404 is returned for routes that are not registered', () => {
    it('should return 404 if route is not registered', (done) => {
      superagent.get('localhost:3000/not/a/route')
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
    });
  });
});
