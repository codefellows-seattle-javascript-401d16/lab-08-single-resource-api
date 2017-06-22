'use strict';

const requestParse = require('./request-parse.js');

const routes = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {},
}

const router = module.exports = {}

router.get = (pathname, callback) => {
  routes.GET[pathname] = callback
}


router.post= (pathname, callback) => {
  routes.POST[pathname] = callback
}

router.delete = (pathname, callback) => {
  routes.DELETE[pathname] = callback
}

router.put = (pathname, callback) => {
  routes.PUT[pathname] = callback
}

router.route = (req, res) => {
  requestParse(req, (err) => {

    if(err){
      res.writeHead(400);
      res.end()
      return;
    }
    // if there is a callback for the requset invokeit
    let routeHandler = routes[req.method][req.url.pathname]

    if(routeHandler){
      routeHandler(req, res)
    } else {
      res.writeHead(404)
      res.end()
    }
  })
}
