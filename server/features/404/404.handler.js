module.exports = function diFactory() {
  return (req, res, next) => {
    res.status(404);

    // Browsers get a nice HTML page
    if (req.accepts('html')) {
      return res.redirect('/404.html');
    }

    // JSON is expected (header "Accept: application/json")
    if (req.accepts('json')) {
      return res.send({ error: 'resource not found' });
    }

    // Default plain text answer (header "Accept: text/plain")
    res.type('txt').send('Not found');
  };
};
