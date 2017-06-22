#Lab-08 Documentation



##POST requests

Valid POST requests return a 201 created status code. It requires JSON formatted content {content: 'example data'} to include in the note. The time and a unique id are created, run through a Note constructor and stored in an object with a key of id. The Note object is sent in the response to enable future note recovery.

Failed POST requests don't include content and send a 400 Bad Request response.

##GET requests

GET requests without an ID send an array of storage keys. Deleted keys will be present and return a 404 not found.

GET requests with an valid ID return the note, content and createdDate value in JSON.

GET requests for an invalid Id will return a 404 Not Found response.

##PUT requests

PUT requests require an id in the url `localhost:3000/api/notes?id=${tempNote.id}` and content and creationDate JSON in the body {content: 'examples are for suckers', creationDate: 'never'}. A 202 accepted response is expected. The updated data is sent back as the body in JSON.

Invalid PUT requests don't have a valid id in the url, don't have content/creationDate in a valid JSON format or ask for an invalid id. Invalid id responds with 404, all others are 400.

##DELETE requests

Valid delete requests require an id in the url `localhost:3000/api/notes?id=${tempNote.id}` and respond with a 204.

Invalid delete requests don't have an id in the url and respond with 400 not found.
If an invalid id is in the url, a 404 response is expected.
