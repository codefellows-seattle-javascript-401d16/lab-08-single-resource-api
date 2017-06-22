'use strict';

const requestParse = require('./requestParse.js');
let routes = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
};
const router = module.exports = {};

router.post = (pathname, callback) => {
  routes.POST[pathname] = callback;
};

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback;
};

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback;
};

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback;
};

router.route = (req, res) => {
  requestParse(req, (err) => {
    if(err) {
      res.writeHead(400);
      res.end();
      return;
    }
    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler) {
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  });
};
