var server = require('./')({
  db: './testdb'
, port: 8000
, auth: {
    username: 'test'
  , password: 'test'
  }
});

server.start();
server.on('internalError', function(req, err) {
  console.log(err);
});
