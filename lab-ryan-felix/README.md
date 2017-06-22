# The Beer List
### A simple demo CRUD server

## Usage

`node index.js` - run the server

## Routes

The Beer List conforms to the REST standard, serving a full CRUD api at `/api/beers/`.

GET `/api/beers/` - index; retrieve an array of all record id numbers
GET `/api/beers/?id=[id]` - retrieve the beer of the given id, if it exists
POST `/api/beers/` - create a new beer; server will respond with the new beer's full record
PUT `/api/beers/?id=[id]` - update the beer of the given id with information in the body. Only the fields actually provided will be updated; fields not provided will remain as they are.
DELETE `/api/beers/?id=[id]` - delete the given beer from the database.

## Record spec

A beer record consists of:

`id` - the beer's id. Set by the server and may not be changed by clients.
`name` - the beer's name.
`style` - the beer's style. Specifics are encouraged: for example, use "American adjunct lager" instead of just "lager".
`brewer` - the beer's brewer.
