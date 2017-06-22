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
    it('should respond with a POST 201', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({content: 'example data'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.content).toEqual('example data');
        expect(res.body.creationDate).toExist();
        tempNote = res.body;
        done();
      });
    });
    it('should respond with a POST 400', (done) => {
      superagent.post('localhost:3000/api/notes')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/notes', () => {
    it('should respond with a GET 200 and an appropriate id', (done) => {
      superagent.get(`localhost:3000/api/notes?id=${tempNote.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempNote.id);
        expect(res.body.content).toEqual('example data');
        expect(res.body.creationDate).toExist();
        done();
      });
    });
    it('should respond with a GET 404', (done) => {
      superagent.get('localhost:3000/api/notes?id=3')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should respond with a GET 200 and an array of ids', (done) => {
      superagent.get('localhost:3000/api/notes')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body[tempNote.id]['id']).toEqual(tempNote.id);
        done();
      });
    });
  });

  describe('testing PUT /api/notes', () => {
    it('should respond with a PUT 201', (done) => {
      superagent.put(`localhost:3000/api/notes?id=${tempNote.id}`)
      .send({content: 'examples are for suckers', creationDate: 'never'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.content).toEqual('examples are for suckers');
        expect(res.body.creationDate).toEqual('never');
        tempNote = res.body;
        done();
      });
    });
    it('should respond with a PUT 400 no id', (done) => {
      superagent.put('localhost:3000/api/notes')
      .send({content: 'examples are for suckers', creationDate: 'never'})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with a PUT 404 no id in storage', (done) => {
      superagent.put('localhost:3000/api/notes?id=3')
      .send({content: 'examples are for suckers', creationDate: 'never'})
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
    it('should respond with a PUT 400 no content', (done) => {
      superagent.put(`localhost:3000/api/notes?id=${tempNote.id}`)
      .send({creationDate: 'never'})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
    it('should respond with a PUT 400 no creationDate', (done) => {
      superagent.put(`localhost:3000/api/notes?id=${tempNote.id}`)
      .send({content: 'examples are for suckers'})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });

  });

});
