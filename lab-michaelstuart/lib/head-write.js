'use strict';

module.exports = (res, code, text, type = { 'Content-Type': 'text/plain' }) => {
  res.writeHead(code, type);
  text && res.write(typeof text === 'string' ? text : JSON.stringify(text));
  res.end();
};
