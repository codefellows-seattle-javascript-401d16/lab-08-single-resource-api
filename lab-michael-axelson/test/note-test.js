'use strict'

const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');
let savedFood;

  describe('testing /foods routes', function(){
    before((done) => {
      server.listen(3000, () => done());
    });
    after((done) => {
      server.close(() => done());
    });


    describe('testing POST foods', () => {
      it('should respond with food!', (done) => {
        superagent.post('localhost:3000/foods')
        .send({type: 'breads', 'content':'yeahhhh dude'})
        .end((err, res) => {
          // console.error(err);
          if (err) return done(err);
          // console.log('red.body for post request...',res.body);
          expect(res.body.type).toEqual('breads');
          savedFood = res.text = JSON.parse(res.text);
          done();
        });
      });

      it('should respond with a 400 bad request', (done) => {
        superagent.post('localhost:3000/foods')
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
      });
    });

    describe('testing GET foods', () => {
      it('should respond with a soup!', (done) => {
        superagent.get(`localhost:3000/foods?id=${savedFood.id}`)
        .end((err, res) => {
          if (err) return done(err);
          // console.log('response.body for the get request...',res.body);
          expect(res.status).toEqual(200);
          expect(res.body.id).toEqual(savedFood.id);
          // expect(res.body.content).toEqual('so good');
          // tempNote = res.body;
          done();
        });
      });
    });
    describe('testing PUT foods', () => {
      it('should respond with an updated food item!', (done) => {
        superagent.put(`localhost:3000/foods?id=${savedFood.id}`)
        .send({content:'updated',type: 'updated'})
        .end((err, res) => {
          // if (err) return done(err);
          console.log(res.status);
          // expect(res.status).toEqual(200);
          // expect(res.body.content).toEqual('updated');
          // tempNote = res.body;
          done();
        });
      });
    });
    describe('testing DELETE foods', () => {
      it('should respond with a deleted food item!', (done) => {
        superagent.delete(`localhost:3000/foods?id=${savedFood.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(204);
          done();
        });
      });
    });
  });
