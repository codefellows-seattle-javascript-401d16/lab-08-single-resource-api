module.exports = (res, code, display = null, text) => {
  res.writeHead(code, display);
  display && res.write(text);
  res.end();
};
