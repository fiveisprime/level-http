//
//     Level HTTP
//     Copyright(c) 2013 Matt Hernandez <matt@modulus.io>
//     MIT Licensed
//

//
// Object map for content type : LevelDB encoding.
//
var contentTypes = {
  'application/json': 'json'
, 'text/plain': 'utf8'
};

//
// Get the value encoding based on the headers.
// Defaults to 'utf8' if no content type is present.
//
function getEncoding(headers) {
  return contentTypes[headers['content-type']] || 'utf8';
}

//
// Attempt to parse the response value to JSON before sending the response.
//
function writeResponse(req, value) {
  try {
    value = JSON.parse(value);
    req.reply(value);
  } catch (e) {
    req.reply(value);
  }
}

module.exports = function(db) {

  var getAllValues = function(req) {
    var values = [];

    db.createReadStream()
      .on('data', function(data) {
        try {
          // Attempt to parse the value to JSON so it's written correctly.
          // If the parse fails, just add the data object as-is.
          values.push({
            key: data.key
          , value: JSON.parse(data.value)
          });
        } catch (e) {
          values.push(data);
        }
      })
      .on('close', function() {
        writeResponse(req, values);
      });
  };

  var getValue = function(req) {
    var opts = {
      valueEncoding: getEncoding(req.raw.req.headers)
    };

    db.get(req.params.key, opts, function(err, value) {
      if (err) return req.reply('Key not found.').code(404);

      writeResponse(req, value);
    });
  };

  var postValue = function(req) {
    var opts = {
      valueEncoding: getEncoding(req.raw.req.headers)
    };

    db.put(req.params.key, req.payload, opts, function(err) {
      if (err) return req.reply('Unable to write to database.').code(500);
      req.reply(true);
    });
  };

  var deleteValue = function(req) {
    var opts = {
      valueEncoding: getEncoding(req.raw.req.headers)
    };

    db.del(req.params.key, opts, function(err) {
      if (err) return req.reply('Unable to write to database.').code(500);
      req.reply(true);
    });
  };

  return [
    { method: 'GET',    path: '/data',       config: { handler: getAllValues, auth: 'simple' } }
  , { method: 'GET',    path: '/data/{key}', config: { handler: getValue,     auth: 'simple' } }
  , { method: 'POST',   path: '/data/{key}', config: { handler: postValue,    auth: 'simple' } }
  , { method: 'DELETE', path: '/data/{key}', config: { handler: deleteValue,  auth: 'simple' } }
  ];
};
