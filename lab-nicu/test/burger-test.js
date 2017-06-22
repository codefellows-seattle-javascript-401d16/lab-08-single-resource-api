'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
let tempBurger;

describe('testing burger routes', function () {
  before((done) => {
    server.listen(3000, () => {
      console.log('starting server');
      done();
    });
  });
  after((done) => {
    server.close(() => {
      console.log('closing server');
      done();
    });
  });

  describe('testing POST /api/burgers', () => {
    it('should respond with a 201 and burger object', (done) => {
      superagent.post('localhost:3000/api/burgers')
        .send({ name: 'Wicked Burger', location: 'Seattle,WA', stars: '4' })
        .end((err, res) => {
          if (err) return done(err);
          tempBurger = res.text = JSON.parse(res.text);
          expect(res.status).toEqual(201);
          expect(res.text.burger.name).toEqual('Wicked Burger');
          done();
        });
    });
    it('should respond with a 400 and burger object', (done) => {
      superagent.post('localhost:3000/api/burgers')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('testing GET /api/burgers', () => {
    it('should respond with a burger', (done) => {
      superagent.get(`localhost:3000/api/burgers?id=${tempBurger.burger.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Wicked Burger');
          done();
        });
    });
    it('should respond with a 404 for an invalid id', (done) => {
      superagent.get(`localhost:3000/api/burgers?id=xxxx-xxxx-xxx--xxxx`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.Message).toEqual('ID not found');
          done();
        });
    });
    it('should respond with a return with an array of burger ids', (done) => {
      superagent.get(`localhost:3000/api/burgers`)
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(Array.isArray(res.body.ids)).toEqual(true);
          done();
        });
    });
  });
  describe('testing PUT /api/burgers', () => {
    it('should update the name of the burger to Rafiki Burger with a 202 response', (done) => {
      superagent.put(`localhost:3000/api/burgers?id=${tempBurger.burger.id}`)
        .send({ id: tempBurger.id, name: 'Rafiki Burger', location: 'Seattle,WA', stars: '4' })
        .end((err, res) => {
          expect(res.status).toEqual(202);
          expect(res.body.UpdatedValues.name).toEqual('Rafiki Burger');
          expect(res.body.UpdatedValues.id).toEqual(tempBurger.burger.id);
          tempBurger = res.body.UpdatedValues;
          done();
        });
    });
    it('should return a 400 response code', (done) => {
      superagent.put(`localhost:3000/api/burgers?id=${tempBurger.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
  });
  describe('testing DELETE /api/burgers', () => {
    it('should respond a 404 with an invalid id', (done) => {
      superagent.delete('localhost:3000/api/burgers?id=xxxx-xxxx-xxxx-xxxx')
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.body.Message).toEqual('ID not found');
          done();
        });
    });
    it('should respond with a 204', (done) => {
      superagent.delete(`localhost:3000/api/burgers?id=${tempBurger.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          it('should not have anymore ids in the storage', (done) => {
            superagent.get('localhost:3000/api/burgers')
              .end((err, res) => {
                expect(res.body.ids.length).toEqual(0);
                done();
              });
          });
          done();
        });
    });
  });

});
