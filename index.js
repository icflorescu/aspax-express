var path = require('path')
  , mode = process.env.NODE_ENV
  , assets;

module.exports = function(app, assetsJsonMap) {
  // Load assets map in production
  if (mode == 'production') {
    assets = require(assetsJsonMap);
  }

  // Utility method to get asset path based on the asset map.
  app.locals.asset = function(asset) {
    return mode == 'production' ? assets[asset] : asset;
  };

  // Middleware to adjust response headers for gzipped assets in production.
  if (mode == 'production') {
    app.use(function(req, res, next) {
      var rp = req.path;

      if (rp.slice(-3) === '.gz') {
        res.set('Content-Encoding', 'gzip');

        // Add the appropriate headers for .css and .js files to avoid console warnings in some browsers
        if (rp.slice(-7, -3) === '.css') {
          res.set('Content-Type', 'text/css');
        } else if (rp.slice(-6, -3) === '.js') {
          res.set('Content-Type', 'application/javascript');
        }
      }
      next();
    });
  }

}
