'use strict';

//TODO: your tests should start your server when they begin and stop your server when they finish
//TODO: write a test to ensure that your api returns a status code of 404 for routes that have not been registered
//TODO: write tests to ensure your /api/simple-resource-name endpoint responds as described for each condition below:
//TODO: GET - test 404, responds with 'not found' for valid request made with an id that was not found
//TODO: GET - test 400, responds with 'bad request' for if no id is provided in the query string  BONUS: 2pts a GET request to /api/simple-resource-name with no ?id= should return an array of all of the ids for that resource if you do this you dont have to test 400 to GET /api/simple-resource-name
//TODO: GET - test 200, response body like {<data>} for a request made with a valid id
//TODO: POST - test 400, responds with 'bad request' for if no body provided or invalid body
//TODO: POST - test 201, response body like {<data>} for a post request with a valid body
//TODO: PUT - test 400, responds with 'bad request' for if no body provided or invalid body
//TODO: PUT - test 202, response body like {<data>} for a put request with a valid id
//TODO: DELETE - test 404, responds with 'not found' for valid request made with an id that was not found
//TODO: DELETE - test 204, response for a delete request with a valid id
