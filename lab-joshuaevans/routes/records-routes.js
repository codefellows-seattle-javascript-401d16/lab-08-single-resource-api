'use strict';

const router = require('../lib/router.js');
const responseHelpers = require('../lib/response-helpers.js')
const Record = require('../model/record.js');

router.post('/api/records', (req, res) => {
  if(!req.body.title)
    return res.sendStatus(400);

  new Record(req.body.title, req.body.artist)
  .save()
  .then(record => res.sendJSON(200, record))
  .catch(err => res.sendStatus(500));
});


router.get('/api/records', (req, res) => {
  if(!req.url.query.id)
    return res.sendStatus(400);
  Record.findById(req.url.query.id)
  .then(record => res.sendJSON(200, record))
  .catch(err => {
    console.log(err);
    res.sendStatus(404);
  });
});

router.put('/api/records', (req, res) => {
  if(!req.url.query.id){
    return res.sendStatus(400);
  }

  Record.findById(req.url.query.id)
  .update()
  .then(record => res.sendJSON(200, record))
  .catch(err => {
    // console.log(err);
    res.sendStatus(404);
  });
});

router.delete('/api/records', (req, res) => {
  let body = res.body;
  if(!req.url.query.id){
    return res.sendStatus(400);
  }

  new Record(body.title, body.artist)
  .delete()
  .then(record => res.sendJSON(200, record))
  .catch(err => {
    // console.log(err);
    res.sendStatus(404);
  });
});
