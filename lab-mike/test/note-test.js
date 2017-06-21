'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');

let tempNote;

describe('testing note paths', () => {
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/notes', () => {
    it('should respond with note object in json', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({content: 'example data', creationDate: 'Wed Jun 21 2017 16:20:16 GMT-0700 (PDT)'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toExist();
        expect(res.body.content).toEqual('example data');
        expect(res.body.creationDate).toEqual('Wed Jun 21 2017 16:20:16 GMT-0700 (PDT)');
      });
    });
  });
});
