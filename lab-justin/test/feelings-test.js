'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
let tempFeeling;

describe('testing feelings routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST', () => {
    it('should respond with a name, age, and feeling', (done) => {
      superagent.post('localhost:3000/api/feelings')
      .send({name: 'Hilary', age: '21', feeling: 'MAD'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Hilary');
        expect(res.body.age).toEqual('21');
        expect(res.body.feeling).toEqual('MAD');
        tempFeeling = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/feelings')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET', () => {
    it('should respond with a 200', (done) => {
      superagent.get(`localhost:3000/api/feelings?id=${tempFeeling.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempFeeling.id);
        tempFeeling = res.body;
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.get(`localhost:3000/api/feelings?id=not+today`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });

    it('should respond with a 400', (done) => {
      superagent.get(`localhost:3000/api/feelings?id=`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing PUT', () => {
    it('should respond with a 202', (done) => {
      superagent.put(`localhost:3000/api/feelings?id=${tempFeeling.id}`)
      .send({name: 'Seven', age: '6', feeling: 'wants to go for a walk'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Seven');
        expect(res.body.age).toEqual('6');
        expect(res.body.feeling).toEqual('wants to go for a walk');
        tempFeeling = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.put(`localhost:3000/api/feelings`)
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing DELETE', () => {
    it('should respond with a 204', (done) => {
      superagent.delete(`localhost:3000/api/feelings?id=${tempFeeling.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.delete(`localhost:3000/api/feelings?id`)
      .send({id: 'not today'})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
