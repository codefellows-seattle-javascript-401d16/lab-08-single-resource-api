'use strict';

const mocha = require('mocha');
const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');
let tempWaypoint;
let putTemp;

describe('testing waypoint routes', function(){
  before((done) => {
    server.listen(3000, () => done());
  });
  after((done) => {
    server.close(() => done());
  });

  describe('testing POST /api/waypoints', () => {
    it('should respond with new waypoint', (done) => {
      superagent.post('localhost:3000/api/waypoints')
      .send({
        name: 'Cape Disappointment',
        lat: '46.2779497',
        long: '-124.0497145',
        desc: 'Coast Guard Station Cape Disappointment',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Cape Disappointment');
        expect(res.body.latitude).toEqual('46.2779497');
        expect(res.body.longitude).toEqual('-124.0497145');
        expect(res.body.description).toEqual('Coast Guard Station Cape Disappointment');
        tempWaypoint = res.body;
        done();
      });
    });

    it('should respond with a 400 bad request', (done) => {
      superagent.post('localhost:3000/api/waypoints')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing GET /api/waypoints', () => {
    it('should respond with a waypoint', (done) => {
      superagent.get(`localhost:3000/api/waypoints?id=${tempWaypoint.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(tempWaypoint.id);
        expect(res.body.name).toEqual('Cape Disappointment');
        expect(res.body.latitude).toEqual('46.2779497');
        expect(res.body.longitude).toEqual('-124.0497145');
        expect(res.body.description).toEqual('Coast Guard Station Cape Disappointment');
        done();
      });
    });

    it('should respond with a 400', (done) => {
      superagent.get(`localhost:3000/api/waypoints?`)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.get(`localhost:3000/api/waypoints?id=1`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });

  describe('testing PUT /api/waypoints', () => {


    it('should respond with new waypoint', (done) => {
      superagent.post('localhost:3000/api/waypoints')
      .send({
        name: 'Cape Disappointment',
        lat: '46.2779497',
        long: '-124.0497145',
        desc: 'Coast Guard Station Cape Disappointment',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(201);
        expect(res.body.id).toExist();
        expect(res.body.name).toEqual('Cape Disappointment');
        expect(res.body.latitude).toEqual('46.2779497');
        expect(res.body.longitude).toEqual('-124.0497145');
        expect(res.body.description).toEqual('Coast Guard Station Cape Disappointment');
        putTemp = res.body;
        done();
      });
    });

    it('should udate a waypoint', (done) => {
      superagent.put(`localhost:3000/api/waypoints`)
      .send({
        id: `${putTemp.id}`,
        name: 'Tillamook Bay',
        lat: '45.5585123',
        long: '-123.9201035',
        desc: 'Coast Guard Station Tillamook Bay',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(202);
        expect(res.body.id).toEqual(putTemp.id);
        expect(res.body.name).toEqual('Tillamook Bay');
        expect(res.body.latitude).toEqual('45.5585123');
        expect(res.body.longitude).toEqual('-123.9201035');
        expect(res.body.description).toEqual('Coast Guard Station Tillamook Bay');
        done();
      });
    });

    it('should respond with a 400', (done) => {
      superagent.put(`localhost:3000/api/waypoints?`)
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
    });
  });

  describe('testing DELETE /api/waypoints', () => {
    it('should delete a waypoint', (done) => {
      superagent.delete(`localhost:3000/api/waypoints?id=${tempWaypoint.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toEqual(204);
        expect(res.body.id).toEqual(undefined);
        done();
      });
    });

    it('should respond with a 404', (done) => {
      superagent.delete(`localhost:3000/api/waypoints`)
      .end((err, res) => {
        expect(res.status).toEqual(404);
        done();
      });
    });
  });
});
