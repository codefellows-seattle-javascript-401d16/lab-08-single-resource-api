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

router.route = (req, res) => {

  requestParse(req, (err) =>{

    if(err){
      res.writeHead(400);
      res.end();
      return;
    }
    let routeHandler = routes[req.method][req.url.pathname];
    if(routeHandler){
      routeHandler(req, res);
    } else {
      res.writeHead(404);
      res.end();
      return;
    }
  });
};
