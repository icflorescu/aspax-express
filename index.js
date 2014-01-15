var assets;

module.exports = function(app, assetsJsonMap) {
  assets = require(assetsJsonMap);

  app.locals.asset = function(name) {
    return assets[name];
  };
}
