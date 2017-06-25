## Lab-Steve Lab-08 Documentation
  * index.js imports lib/server.js and starts the server on port 3000.
  * lib/server.js defines all routes and leverages lib/router.js to handle request methods, which uses lib/request-parse.js to parse the data sent in POST as JSON.
  * The following methods will return the following results:
    * GET localhost:3000/api/beers?id=1 - responds with status code 404 and text 'Beer ID '1' not found!' for valid request made with an id that was not found.
    * GET localhost:3000/api/beers - with no '?id=' returns status code 200 and an array of all of the ids for that resource
    * GET localhost:3000/api/beers?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx - returns status code 200 and a beer object matching a valid ID.
    * POST localhost:3000/api/beers - returns 400 error and status codes and text 'Bad Request: You're missing some required arguments.  You need name, grain, hops, & yeast.'
    * POST localhost:3000/api/beers name=<NAME> grain=<GRAIN> hops=<HOPS> yeast=<YEAST> - returns status code 201 and a new beer object for a POST request with a valid body.
    * PUT localhost:3000/api/beers - returns 400 error and status codes and text 'You need to include a query string with a valid ID (?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)!' if a valid query string is not included.
    * PUT localhost:3000/api/beers?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx - returns 400 error and status codes and text 'Bad Request: You\'re missing some required arguments.  You need id, name, grain, hops, & yeast.' if no body provided.
    * PUT localhost:3000/api/beers?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx name=<NAME> grain=<GRAIN> hops=<HOPS> yeast=<YEAST> - returns status code 202 an updated beer object for PUT request with valid query string and parameters.
    * DELETE localhost:3000/api/beers - returns 400 error and status codes and text 'Bad Request: Query string with id must be included!' for a DELETE request without a valid query string.
    * DELETE localhost:3000/api/beers?id=1 - returns 404 error and status codes and text 'Beer ID '1' not found!' for valid DELETE request made with an ID that was not found.
    * DELETE localhost:3000/api/beers?id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx - returns  204 status code for a DELETE request with a valid ID.
  * Tests - Mocha spins up the server before all tests and spins it down afterwards.
    1. POST localhost:3000/api/beers name='pale ale' grain=2Row hops=hallertau yeast=WL300 - should return 201 status code and an object with name 'pale ale'.
    2. POST localhost:3000/api/beers - should return 400 error and status codes for POST request with no data sent.
    3. GET localhost:3000/api/beers - should return 200 status code and an array of three beer IDs of length 3.
    4. GET localhost:3000/api/beers?id=1 - should return 404 error and status code and text 'Beer ID '1' not found!'
    5. GET localhost:3000/api/beers?id=165b9810-59df-11e7-8abe-cf218322b77f - should return 200 status code and beer data for specific ID, 165b9810-59df-11e7-8abe-cf218322b77f.
    6. PUT localhost:3000/api/beers?id=165b9810-59df-11e7-8abe-cf218322b77f - should return 202 status code for valid PUT request with ID 165b9810-59df-11e7-8abe-cf218322b77f with name changed to `porter`.
    7. PUT localhost:3000/api/beers - should return 400 error and status code for PUT request without data sent.
    8. DELETE localhost:3000/api/beers?id=1 - should return 404 error and status codes for DELETE request without a valid ID and response Beer ID '1' not found!.
    9. PUT localhost:3000/api/beers?id=165b9810-59df-11e7-8abe-cf218322b77f - should return 204 status code for DELETE request with valid ID.
  * Project passes esLint.
  * NPM Scripts:
    * "test": "mocha"
    * "lint": "eslint ."
    * "start": "nodemon index.js"
