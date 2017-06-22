const expect = require('expect');
const superagent = require('superagent');

const server = require('../lib/server.js');


const TEST_URL = 'localhost:3000/api/beers/';

describe('server', () => {

  before((done) => {
    server.listen(3000, () => done());
  });

  after((done) => {
    server.close(() => done());
  });

  it('should respond 404 for bad URLs', (done) => {
    superagent.get('localhost:3000/bad/url')
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
  });

  it('should respond 400 for malformed POST', (done) => {
    superagent.post(TEST_URL)
      .send({bad:'data'})
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  let newId;
  const testBeer = {
    name: 'Old Rasputin',
    style: 'Russian Imperial Stout',
    brewer: 'North Coast',
  };
  it('should respond 201 and return newly added field for good POST', (done) => {
    superagent.post(TEST_URL)
      .send(testBeer)
      .end((err, res) => {
        if(err) done(err);
        expect(res.status).toEqual(201);
        expect(res.body.name).toEqual(testBeer.name);
        expect(res.body.style).toEqual(testBeer.style);
        expect(res.body.brewer).toEqual(testBeer.brewer);
        expect(res.body.id).toExist();
        newId = res.body.id;
        done();
      });
  });

  it('should respond 404 for GET of bad id', (done) => {
    superagent.get(TEST_URL)
      .query({ id: 42 })
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
  });

  it('should respond with array of IDs for GET with no id', (done) => {
    superagent.get(TEST_URL)
      .end((err, res) => {
        expect(res.body).toBeA(Array);
        done();
      });
  });

  it('should respond 200 with data for valid GET', (done) => {
    superagent.get(TEST_URL)
      .query({ id: newId })
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.id).toEqual(newId);
        expect(res.body.name).toEqual(testBeer.name);
        expect(res.body.style).toEqual(testBeer.style);
        expect(res.body.brewer).toEqual(testBeer.brewer);
        done();
      });
  });

  it('should respond 400 to PUT with bad id', (done) => {
    superagent.put(TEST_URL)
      .query({ id: 42 })
      .end((err) => {
        expect(err.status).toEqual(400);
        done();
      });
  });

  const updateBeer = {
    brewer: 'North Coast Brewing Co.',
  };
  it('should respond 202 and return updated record for good PUT', (done) => {
    superagent.put(TEST_URL)
      .query({ id: newId })
      .send(updateBeer)
      .end((err, res) => {
        expect(res.status).toEqual(202);
        expect(res.body.brewer).toEqual(updateBeer.brewer);
        expect(res.body.name).toEqual(testBeer.name);
        done();
      });
  });

  it('should respond 404 to DELETE with bad id', (done) => {
    superagent.delete(TEST_URL)
      .query({ id: 42 })
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
  });

  it('should respond 204 to DELETE with good id', (done) => {
    superagent.delete(TEST_URL)
      .query({ id: newId })
      .end((err, res) => {
        expect(res.status).toEqual(204);
        done();
      });
  });

  it('should actually delete the record', (done) => {
    superagent.get(TEST_URL)
      .query({ id: newId })
      .end((err) => {
        expect(err.status).toEqual(404);
        done();
      });
  });
});
