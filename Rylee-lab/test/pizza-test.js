'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Pizza = require('../model/pizza.js');
const PORT = process.env.PORT || 3000;


describe('pizza constructor', () => {
  it('should return a pizza object', () => {
    let result = new Pizza(1, 'Pepperoni lovers','pepperoni', 'random/pizza.jpg');
    expect(result.id).toEqual(1);
    expect(result.name).toEqual('Pepperoni lovers');
    expect(result.topping).toEqual('pepperoni');
    expect(result.picture).toEqual('random/pizza.jpg');
  });
});

describe('/api/pizza routes', () => {
  let difPizza;
  before(done => {
    server.listen(PORT, () => done());
  });
  after(done => {
    server.close(() => done());
  });

  describe('POST', () => {
    it('Should respond 201 with JSON of pizza', done => {
      superagent.post(`localhost:${PORT}/api/pizza`)
        .send({name: 'Pepperoni lovers', topping: 'pepperoni', picture: 'random/pizza.jpg'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Pepperoni lovers');
          expect(res.body.topping).toEqual('pepperoni');
          expect(res.body.picture).toEqual('random/pizza.jpg');
          difPizza = res.body;
          done();
        });
    });
    it('Should respond 400 with a bad request', done => {
      superagent.post(`localhost:${PORT}/api/pizza`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
  });
  describe('GET', () => {
    it('Should respond 200 with pizza', done => {
      superagent.get(`localhost:${PORT}/api/pizza?id=${difPizza.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Pepperoni lovers');
          expect(res.body.topping).toEqual('pepperoni');
          expect(res.body.picture).toEqual('random/pizza.jpg');
          difPizza = res.body;
          done();
        });
    });
    it('Should respond 200 with all pizza data', done => {
      superagent.get(`localhost:${PORT}/api/pizza`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body).toExist();
          done();
        });
    });
    it('Should respond 404 with no pizza found', done => {
      superagent.get(`localhost:${PORT}/api/pizza?id=142`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('pizza was not found');
          done();
        });
    });
  });
  describe('PUT', () => {
    it('Should respond 202 with pizza found', done => {
      superagent.put(`localhost:${PORT}/api/pizza?id=${difPizza.id}`)
        .send({name: 'Pepperoni lovers', topping: 'pepperoni', picture: 'random/pizza.jpg'})
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(202);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Pepperoni lovers');
          expect(res.body.topping).toEqual('pepperoni');
          expect(res.body.picture).toEqual('random/pizza.jpg');
          difPizza = res.body;
          done();
          done();
        });
    });
    it('Should respond 400 with a bad rquest', done => {
      superagent.put(`localhost:${PORT}/api/pizza`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
    it('Should respond 404 with pizza was not found', done => {
      superagent.put(`localhost:${PORT}/api/pizza?id=9999`)
      .send({name: 'Pepperoni lovers', topping: 'pepperoni', picture: 'random/pizza.jpg'})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.text).toEqual('pizz not found');
        done();
      });
    });
  });
  describe('DELETE', () => {
    it('Should respond 204 with pizza was deleted', done => {
      superagent.delete(`localhost:${PORT}/api/pizza?id=${difPizza.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
    it('Should respond 400 with a bad request', done => {
      superagent.delete(`localhost:${PORT}/api/pizza`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('bad request');
          done();
        });
    });
    it('Should respond 404 with pizza was not found', done => {
      superagent.delete(`localhost:${PORT}/api/pizza?id=9999999`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('pizza was not found');
          done();
        });
    });
  });
});
