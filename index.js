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

}
