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
function writeResponse(res, value) {
  try {
    value = JSON.parse(value);
    res.json(value);
  } catch (e) {
    res.send(value);
  }
}

module.exports = function(db, app) {

  app.get('/data/:key?', function(req, res) {
    if (req.params.key) {
      var opts = {
        valueEncoding: getEncoding(req.headers)
      };

      db.get(req.params.key, opts, function(err, value) {
        if (err) return res.send(404, 'Key not found.');

        writeResponse(res, value);
      });
    } else {
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
          writeResponse(res, values);
        });
    }
  });

  app.post('/data/:key', function(req, res) {
    var opts = {
      valueEncoding: getEncoding(req.headers)
    };

    db.put(req.params.key, req.body, opts, function(err) {
      if (err) return res.send(500, 'Unable to write to database.');
      res.json({ result: true });
    });
  });

  app.delete('/data/:key', function(req, res) {
    var opts = {
      valueEncoding: getEncoding(req.headers)
    };

    db.del(req.params.key, opts, function(err) {
      if (err) return res.send(500, 'Unable to write to database.');
      res.json({ result: true });
    });
  });
};
