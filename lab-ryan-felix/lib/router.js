const parseRequest = require('./parse-request.js');

const routes = {
  GET: {},
  POST: {},
  PUT: {},
  DELETE: {},
};

module.exports = {

  get: (path, callback) => routes.GET[path] = callback,
  post: (path, callback) => routes.POST[path] = callback,
  delete: (path, callback) => routes.DELETE[path] = callback,
  put: (path, callback) => routes.PUT[path] = callback,

  route: (req, res) => {
    parseRequest(req, (err) => {
      if(err) {
        res.writeHead(400);
        res.end();
        return;
      }
      const routeHandler = routes[req.method][req.url.pathname];
      if(routeHandler) {
        routeHandler(req, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  },

};
