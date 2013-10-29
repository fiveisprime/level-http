//
//     Level HTTP
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

var Hapi   = require('hapi')
  , level  = require('level')
  , server;

module.exports = function(config) {

  if (typeof config === 'undefined') throw new Error('You must specify a database and authentication credentials.');
  if (typeof config.auth === 'undefined') throw new Error('Authentication credentials are required.');

  server = Hapi.createServer(config.host || '0.0.0.0', +config.port || 3000, {
    cors: true
  });

  server.auth('simple', {
    scheme: 'basic'
  , validateFunc: function(user, pass, fn) {
      return fn(null, config.auth.username === user && config.auth.password === pass, {});
    }
  });

  server.addRoutes(require('./routes')(level(config.db, config.auth)));

  return server;
};
