'use strict';

const expect = require('expect');
const superagent = require('superagent');
const server = require('../lib/server.js');


describe('testing heroScore routes', function(){
  before((done) => {
    server.listen(5000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });
  describe('testing POST requests', () => {
    it('should return a hero name and score', (done) => {
      superagent.post('localhost:5000/api/heros').send({hero: 'Thrall', score: '97'}).end((err, res) => {
        if(err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.hero).toEqual('Thrall');
        expect(res.body.score).toEqual('97');
        done();
      });
    });
    // it('should return 400 error', (done) => {
    //   superagent.post('localhost:5000/api/heroScores').send({}).end((err, res) => {
    //     if(err)return done(err);
    //     if(!req.body.hero) {
    //       expect(res.status).toEqual(400);
    //     }
    //   });
    // });
  });
});
