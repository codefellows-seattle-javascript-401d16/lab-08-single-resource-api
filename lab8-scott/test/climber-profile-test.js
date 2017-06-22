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
    it(`should respond with a profile`, (done) => {
      superagent.post('localhost:3000/api/climberprofile')
      .send({age: `30`, type: `trad`})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.age).toEqual(`30`);
        expect(res.body.type).toEqual(`trad`);
        tempProfile = res.body;
        console.log('post test', tempProfile);
        done();
      });
    });
  });

});
