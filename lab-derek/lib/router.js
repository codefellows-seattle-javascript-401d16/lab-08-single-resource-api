'use strict';

//TODO*DONE: Create a Router Constructor that manages requests to GET, POST, PUT, and DELETE requests

const requestParse = require('./request-parse.js');
const routes = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
};

const router = module.exports = {};


//TODO*DONE: Create a route for doing CREATE, READ, and DELETE operations on your simple resource

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.route = (req, res) => {
  requestParse(req, (err) => {
    if (err) {
      res.writeHead(400);
      res.end();
      return;
    }
    let routeHandler = routes[req.method][req.url.pathname];
    if (routeHandler){
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};
