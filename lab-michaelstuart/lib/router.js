'use strict';

const requestParse = require('./request-parse');
const headWrite = require('./head-write');
const routes = { GET: {}, PUT: {}, POST: {}, DELETE: {} };
const router = module.exports = {};

router.get = (pathname, callback) => routes.GET[pathname] = callback;
router.post= (pathname, callback) => routes.POST[pathname] = callback;
router.delete = (pathname, callback) => routes.DELETE[pathname] = callback;
router.put = (pathname, callback) => routes.PUT[pathname] = callback;

router.route = (req, res) => {
  requestParse(req, (err) => {
    let routeHandler = routes[req.method][req.url.pathname];
    if(err) return headWrite(res, 400);
    if(routeHandler) return routeHandler(req, res);
    headWrite(res, 404);
  });
};
