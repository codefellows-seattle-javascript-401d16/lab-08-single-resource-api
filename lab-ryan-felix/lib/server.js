const http = require('http');
const router = require('./router.js');
const BeerList = require('../model/beerlist.js');

const beerList = new BeerList();

router.post('/api/beers/', (req, res) => {
  if(!req.body) {
    res.writeHead(400);
    res.end();
    return;
  }
  if(!(req.body.name && req.body.brewer && req.body.style)) {
    res.writeHead(400);
    res.end();
    return;
  }
  const newBeer = beerList.create({
    name: req.body.name,
    style: req.body.style,
    brewer: req.body.brewer,
  });
  res.writeHead(201, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(newBeer));
  res.end();
});

router.get('/api/beers/', (req, res) => {
  if(!req.url.query.id) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    const allIds = JSON.stringify(beerList.getAllIds());
    res.write(allIds);
    res.end();
    return;
  }
  const foundBeer = beerList.readById(req.url.query.id);
  if(!foundBeer) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(foundBeer));
  res.end();
});

router.put('/api/beers/', (req, res) => {

  if(!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  const updateData = {};
  if(req.body.name) updateData.name = req.body.name;
  if(req.body.style) updateData.style = req.body.style;
  if(req.body.brewer) updateData.brewer = req.body.brewer;

  const updatedBeer = beerList.updateById(req.url.query.id, updateData);
  if(!updatedBeer) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(202, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(updatedBeer));
  res.end();
});

router.delete('/api/beers/', (req, res) => {

  if(!req.url.query.id) {
    res.writeHead(400);
    res.end();
    return;
  }

  if(beerList.deleteById(req.url.query.id)) {
    res.writeHead(204);
  } else {
    res.writeHead(404);
  }
  res.end();
  return;

});

module.exports = http.createServer(router.route);
