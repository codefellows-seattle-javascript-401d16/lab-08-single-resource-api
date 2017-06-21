'use strict';

const requestParse = require('./request-parse.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
};

const router = module.exports = {};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};


router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

// main router logic goes here
router.route = (req, res) => {
  // parse the requestParse
  requestParse(req, (err) => {
    // if the parsingn failed send back 400 bad requestParse
    //console.log('req.url', req.url);
    //console.log('req.headers', req.heaaders);
    //console.log('req.text', req.text);
    //console.log('req.body', req.body);
    //console.log('routes', routes);

    if(err){
      res.writeHead(400);
      res.end();
      return;
    }
  })
}
