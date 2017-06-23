##Lab 8 single resource api##

**Author**
Scott McCoy

**Description**
This is a single resource api. It starts a server utilizing the http module. When it takes in a request, utilizing superagent module, it will parse the request further with url and querystring modules.

*PUT request*
This will create a new climber profile with a random generated id from uuid module. It will take the body of the request and create an instance of a new climberprofile.

*GET request*
This will retrieve a profile if the request has a valid profile id in the url query

*PUT request*
This will locate a specific profile based on the id as the url query and will take what was in the body and update the profile instance. If passing in and incorrect body it will throw a 400 error.

*DELETE request*
This will locate a specific profile and delete based on the id as the url query.
