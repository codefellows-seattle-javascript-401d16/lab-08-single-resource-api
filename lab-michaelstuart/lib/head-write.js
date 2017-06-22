'use strict';

module.exports = (res, code, text) => {
  res.writeHead(code, { 'Content-Type': 'text/plain' });
  text && res.write(text);
  res.end();
};
