//
//     Level HTTP
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var express = require('express')
  , level   = require('level')
  , app     = express();

module.exports = function(config) {
  var internals = {};

  if (typeof config === 'undefined') throw new Error('You must specify a database and authentication credentials.');

  if (typeof config.auth !== 'undefined') {
    app.use(express.basicAuth(config.auth.username, config.auth.password));
  }

  app.use(express.bodyParser());

  require('./routes')(level(config.db, config.auth), app);

  internals.start = function() {
    app.listen(config.port);
  };

  return internals;
};
