'use strict';

module.exports = (res, code, text, type = { 'Content-Type': 'text/plain' }) => {
  res.writeHead(code, type);
  text && res.write(text);
  res.end();
};
