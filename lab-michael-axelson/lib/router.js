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

// main router logic goes here
router.route = (req, res) => {
  // parse the request
  requestParse(req, (err) => {
    // if the prasing faild send back 400 bad request
    //console.log('req.url', req.url)
    //console.log('req.headers', req.headers)
    //console.log('req.text', req.text)
    //console.log('req.body', req.body)
    //console.log('routes', routes);
   
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















