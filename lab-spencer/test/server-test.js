'use strict';

const superagent = require('superagent');
const expect = require('expect');
const server = require('../lib/server.js');
const Seahawk = require('../model/seahawk.js');
const PORT = process.env.PORT || 3000;

describe('Seahawk Constructor', () => {
  it('Should return a Seahawk Object', () => {
    let me = new Seahawk(1, 'Spencer Gietzen', '5\'10"', '150', 'TB', 'rand/pic.png');
    expect(me.id).toEqual(1);
    expect(me.name).toEqual('Spencer Gietzen');
    expect(me.height).toEqual('5\'10"');
    expect(me.weight).toEqual('150');
    expect(me.position).toEqual('TB');
    expect(me.picture).toEqual('rand/pic.png');
  });
});

describe('/api/seahawks routes', () => {
  let tempSeahawk;
  before(done => {
    server.listen(PORT, () => done());
  });
  after(done => {
    server.close(() => done());
  });
  describe('POST', () => {
    it('Should respond 201 with stringified JSON of the player posted', done => {
      superagent.post(`localhost:${PORT}/api/seahawks`)
        .send(JSON.stringify({name: 'Russell Wilson', height: '6\'11"', weight: '500', position: 'QB', picture: 'testpic/pic.png'}))
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(201);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual('6\'11"');
          expect(res.body.weight).toEqual('500');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.post(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('Bad request!');
          done();
        });
    });
  });
  describe('GET', () => {
    it('Should respond 200 with a Seahawk', done => {
      superagent.get(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Wilson');
          expect(res.body.height).toEqual('6\'11"');
          expect(res.body.weight).toEqual('500');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 200 with \'No ID, responding with all data!', done => {
      superagent.get(`localhost:${PORT}/api/seahawks`)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body).toExist();
          done();
        });
    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {
      superagent.get(`localhost:${PORT}/api/seahawks?id=142`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('Seahawk not found!');
          done();
        });
    });
  });
  describe('PUT', () => {
    it('Should respond 202 with \'Seahawk updated!\'', done => {
      superagent.put(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .send(JSON.stringify({id: tempSeahawk.id, name: 'Russell Hawk', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png'}))
        .end((err, res) => {
          if (err) return done(err);
          expect(res.status).toEqual(202);
          expect(res.body.id).toExist();
          expect(res.body.name).toEqual('Russell Hawk');
          expect(res.body.height).toEqual('6\'12"');
          expect(res.body.weight).toEqual('185');
          expect(res.body.position).toEqual('QB');
          expect(res.body.picture).toEqual('testpic/pic.png');
          tempSeahawk = res.body;
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.put(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('Bad request!');
          done();
        });
    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {
      superagent.put(`localhost:${PORT}/api/seahawks?id=9999`)
      .send(JSON.stringify({id: tempSeahawk.id, name: 'Russell Wilson', height: '6\'12"', weight: '185', position: 'QB', picture: 'testpic/pic.png'}))
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.text).toEqual('Seahawk not found!');
        done();
      });
    });
  });
  describe('DELETE', () => {
    it('Should respond 204 with \'Seahawk deleted!\'', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks?id=${tempSeahawk.id}`)
        .end((err, res) => {
          expect(res.status).toEqual(204);
          done();
        });
    });
    it('Should respond 400 with \'Bad request!\'', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks`)
        .send({})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          expect(res.text).toEqual('Bad request!');
          done();
        });
    });
    it('Should respond 404 with \'Seahawk not found!\'', done => {
      superagent.delete(`localhost:${PORT}/api/seahawks?id=9999999`)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          expect(res.text).toEqual('Seahawk not found!');
          done();
        });
    });
  });
});
