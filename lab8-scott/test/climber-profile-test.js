'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

let tempProfile;

//this starts and stops the server for each test.
describe(`Testing all climber profile routes`, function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe(`Testing POST method on /api/climberprofile`, () =>{
    it(`should respond with a profile and 201`, (done) => {
      superagent.post('localhost:3000/api/climberprofile')
      .send({age: `30`, type: `trad`})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.age).toEqual(`30`);
        expect(res.body.type).toEqual(`trad`);
        tempProfile = res.body;
        done();
      });
    });
    it('should respond with a 400 error', (done) => {
      superagent.post('localhost:3000/api/climberprofile')
      .send()
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
    });
  });

  describe(`Testing GET method on /api/climberprofile`, () =>{
    it(`should respond with a 200 and specific profile`, (done) => {
      superagent.get(`localhost:3000/api/climberprofile?id=${tempProfile.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.age).toEqual(`30`);
        expect(res.body.type).toEqual(`trad`);
        done();
      });
    });
    it(`should respond with a 400`, (done) => {
      superagent.get('localhost:3000/api/climberprofile')
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
    });
    it(`should respond with a 404`, (done) => {
      superagent.get('localhost:3000/api/climberprofile?id=1234')
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
    });
  });

  describe(`Testing PUT method on /api/climberprofile`, () =>{
    it(`should respond with a 202 status and {age: '23', type: 'sport'} if successfully updated`, (done) => {
      superagent.put(`localhost:3000/api/climberprofile?id=${tempProfile.id}`)
      .send({age: '23', type: 'sport'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toExist();
        expect(res.body.age).toEqual('23');
        expect(res.body.type).toEqual('sport');
        done();
      });
    });
    it(`should respond with a 400 if id is not found`, (done) => {
      superagent.put(`localhost:3000/api/climberprofile?id=${tempProfile.id}`)
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
    });
  });

  describe(`Testing DELETE method on /api/climberprofile`, () =>{
    it(`should respond with a 204 if successfully deleted`, (done) => {
      superagent.delete(`localhost:3000/api/climberprofile?id=${tempProfile.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        expect(res.body.id).toNotExist();
        expect(res.body.age).toNotExist();
        expect(res.body.type).toNotExist();
        done();
      });
    });
    it(`should respond with a 404 if id is not found`, (done) => {
      superagent.delete(`localhost:3000/api/climberprofile?id=01234`)
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
    });
  });
});
