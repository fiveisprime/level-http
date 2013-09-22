//
//     Level HTTP
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

module.exports = function(db) {

  var getValue = function(req) {
    db.get(req.params.key, function(err, value) {
      if (err) return req.reply('Key not found.').code(404);
      req.reply(value);
    });
  };

  var postValue = function(req) {
    db.put(req.params.key, req.payload, function(err) {
      if (err) return req.reply('Unable to write to database.').code(500);
      req.reply(true);
    });
  };

  var deleteValue = function(req) {
    db.del(req.params.key, function(err) {
      if (err) return req.reply('Unable to write to database.').code(500);
      req.reply(true);
    });
  };

  return [
    { method: 'GET', path: '/data/{key}', config: { handler: getValue, auth: 'simple' } }
  , { method: 'POST', path: '/data/{key}', config: { handler: postValue, auth: 'simple' } }
  , { method: 'DELETE', path: '/data/{key}', config: { handler: deleteValue, auth: 'simple' } }
  ];
};
