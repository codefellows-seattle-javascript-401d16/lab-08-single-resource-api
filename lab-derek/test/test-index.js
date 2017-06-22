'use strict';

const superagent = require('superagent');
const expect = require('expect');

const server = require('../lib/server.js');

//TODO: your tests should start your server when they begin and stop your server when they finish

describe('testing task routes', () => {
  before((done) => {
    server.listen(3000, () => {
      console.log('server up for testing');
      done();
    });
  });
  after((done) => {
    server.close(() => {
      console.log('testing finished, server closed');
      done();
    });
  });
  //TODO: write a test to ensure that your api returns a status code of 404 for routes that have not been registered
  it('should return a status code 404 for unregistered routes', () => {
    superagent.post('localhost:3000/test')
      .send()
      .end((err, res) => {
        expect(res.status).toEqual(400);
        done();
      });
  });


  //Write tests to ensure your /api/simple-resource-name endpoint responds as described for each condition below:

  //TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found

  it('should respond with "not found" for valid requests with unknown id', () => {
    superagent.get('/api?id=test')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('not found');
        done();
      });
  });

  //TODO: GET - test 400, responds with 'bad request' for if no id is provided in the query string  BONUS: 2pts a GET request to /api/simple-resource-name with no ?id= should return an array of all of the ids for that resource if you do this you dont have to test 400 to GET /api/simple-resource-name

  it('should return a status code 400 if no id is provided in query string', () => {
    superagent.get('localhost:3000/api')
      .end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('bad request');
        // expect(res.body)
        done();
      });
  });

  //TODO: GET - test 200, response body like {<data>} for a request made with a valid id
  //TODO: POST - test 201, response body like {<data>} for a post request with a valid body

  it('should POST a new object and return it, then return a status code 200 and valid data if valid id is provided in query string', () => {
    superagent.post('localhost:3000/api')
      .send(
        {
          "taskName": "test","xp": "50","id": "10",
        }
      ).end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
          {
            "taskName": "test","xp": "50","id": "10",
          }
        );
      });
    superagent.get('localhost:3000/api?=10')
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(
          {
            "taskName": "test","xp": "50","id": "10",
          });
        done();
      });
  });

  //TODO: POST - test 400, responds with 'bad request' for if no body provided or invalid body

  it('should responds with status 400 and "bad request" for  invalid body', () => {
    superagent.post('localhost:3000/api')
      .send(
        {}
      ).end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('bad request');
        done();
      });
  });

  //TODO: PUT - test 400, responds with 'bad request' for if no body provided or invalid body

  it('should responds with status 400 and "bad request" for invalid body', () => {
    superagent.put('localhost:3000/api')
      .send(
        {}
      ).end((err, res) => {
        expect(res.status).toEqual(400);
        expect(res.body).toEqual('bad request');
        done();
      });
  });

  //TODO: PUT - test 202, response body like {<data>} for a put request with a valid id

  it('should PUT to an object and return the updated object, then return a status code 202 and valid data if valid id is provided in query string', () => {
    superagent.post('localhost:3000/api')
      .send(
        {
          "taskName": "test","xp": "50","id": "10",
        }
      ).end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
          {
            "taskName": "test","xp": "50","id": "10",
          }
        );
      });
    superagent.put('localhost:3000/api')
      .send(
        {
          "xp": "500","id": "10",
        }
      ).end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
          {
            "taskName": "test","xp": "500","id": "10",
          }
        );
        done();
      });
  });

  //TODO: DELETE - test 404, responds with 'not found' for valid request made with an id that was not found

  it('should return a status code 404 if valid id not found', () => {
    superagent.delete('localhost:3000/api?id=9999')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('not found');
        done();
      });
  });

  //TODO: DELETE - test 204, response for a delete request with a valid id

  it('should return a status code 404 if valid id not found', () => {
    superagent.post('localhost:3000/api')
      .send(
        {
          "taskName": "test","xp": "50","id": "10",
        }
      ).end((err, res) => {
        expect(res.status).toEqual(201);
        expect(res.body).toEqual(
          {
            "taskName": "test","xp": "50","id": "10",
          }
        );
      });
    superagent.delete('localhost:3000/api?id=10')
      .end((err, res) => {
        expect(res.status).toEqual(204);
        done();
      });
    superagent.get('localhost:3000/api?id=10')
      .end((err, res) => {
        expect(res.status).toEqual(404);
        expect(res.body).toEqual('not found');
        done();
      });
  });
});
