const bodyparser = require('body-parser');

module.exports = function diFactory(config) {
  // Middleware: Use CORS, add headers and allow methods

  function expressMiddleware(req, res, next) {
    /// CORS intel:
    // https://staticapps.org/articles/cross-domain-requests-with-cors/
    // https://gist.github.com/cuppster/2344435

    // Request origin: Allow ALL
    res.header('Access-Control-Allow-Origin', '*');

    // Allowed headers
    res.header(
      'Access-Control-Allow-Headers',
      'Origin' +
      ',X-Requested-With' + // Dont allow AJAX CORS without server consent - see http://stackoverflow.com/questions/17478731/whats-the-point-of-the-x-requested-with-header
        ',x-access-token' +
        ',Content-Type' +
        ',Authorization' +
        ',Accept'
    );

    // Allow headers access (needed for Angular 2+)
    res.header('access-control-expose-headers', 'Authorization');

    // Allowed methods
    res.header(
      'Access-Control-Allow-Methods',

      'GET,' + ',POST' + ',OPTIONS' + ',PUT,' + ',DELETE'
    );

    // Handle CORS requests: cross-domain/origin requests will begin with an OPTION request to the same endpoint.
    if ('OPTIONS' === req.method) {
      res.sendStatus(200);
    } else {
      next();
    }
  }

  function configureExpress(expressApp) {
    // Obtain JSON via POST data (application/x-www-form-urlencoded)
    // Reference: http://stackoverflow.com/a/38322792/987818
    expressApp.use(bodyparser.urlencoded({ extended: true }));
    expressApp.use(bodyparser.json());
    expressApp.use(expressMiddleware);
  }

  return configureExpress;
};
