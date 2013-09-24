var level     = require('level')
  , db        = level('./spec/testdb')
  , levelHttp = require('../')
  , routes    = require('../lib/routes')(db)
  , req       = {};

//
// Configure the request mock.
//
req.params = { key: 'test' };
req.payload = 'test';
req.raw = {};
req.raw.req = {};
req.raw.req.headers = {};

//
// Get the handler for a specific path/method combination.
//
var getHandler = function(path, method) {
  var found = routes.filter(function(route) {
    return route.path === path && route.method === method;
  });

  return found.length > 0 ? found[0].config.handler : null;
};

describe('level-http', function() {

  describe('initialization', function() {

    it('should throw when trying to initialize without auth', function() {
      var error = null;

      try {
        levelHttp({ db: './testdb' });
      } catch (err) {
        error = err;
      }

      expect(error).toBeDefined();
      expect(error.message).toEqual('Authentication credentials are required.');
    });
  });

  describe('database operations', function() {

    beforeEach(function() {
      req.reply = null;
    });

    it('should call db#get on GET', function(done) {
      var handler = getHandler('/data/{key}', 'GET');

      spyOn(db, 'get').andCallFake(function() {
        arguments[2]();
      });

      req.reply = function() {
        expect(db.get).wasCalled();
        done();
      };

      handler(req);
    });

    it('should call db#put on POST', function(done) {
      var handler = getHandler('/data/{key}', 'POST');

      spyOn(db, 'put').andCallFake(function() {
        arguments[3]();
      });

      req.reply = function() {
        expect(db.put).wasCalled();
        done();
      };

      handler(req);
    });

    it('should call db#del on DELETE', function(done) {
      var handler = getHandler('/data/{key}', 'DELETE');

      spyOn(db, 'del').andCallFake(function() {
        arguments[2]();
      });

      req.reply = function() {
        expect(db.del).wasCalled();
        done();
      };

      handler(req);
    });
  });

  describe('database encoding', function() {

    it('db#get as json encoding when content type is set to application/json', function(done) {
      var handler = getHandler('/data/{key}', 'GET'), encoding;

      spyOn(db, 'get').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('json');
        expect(db.get).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'application/json';

      handler(req);
    });

    it('db#put as json encoding when content type is set to application/json', function(done) {
      var handler = getHandler('/data/{key}', 'POST'), encoding;

      spyOn(db, 'put').andCallFake(function() {
        encoding = arguments[2].valueEncoding;
        arguments[3]();
      });

      req.reply = function() {
        expect(encoding).toEqual('json');
        expect(db.put).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'application/json';

      handler(req);
    });

    it('db#del as json encoding when content type is set to application/json', function(done) {
      var handler = getHandler('/data/{key}', 'DELETE'), encoding;

      spyOn(db, 'del').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('json');
        expect(db.del).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'application/json';

      handler(req);
    });

    it('db#get as utf8 encoding when content type is set to text/plain', function(done) {
      var handler = getHandler('/data/{key}', 'GET'), encoding;

      spyOn(db, 'get').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.get).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'text/plain';

      handler(req);
    });

    it('db#put as utf8 encoding when content type is set to text/plain', function(done) {
      var handler = getHandler('/data/{key}', 'POST'), encoding;

      spyOn(db, 'put').andCallFake(function() {
        encoding = arguments[2].valueEncoding;
        arguments[3]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.put).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'text/plain';

      handler(req);
    });

    it('db#del as utf8 encoding when content type is set to text/plain', function(done) {
      var handler = getHandler('/data/{key}', 'DELETE'), encoding;

      spyOn(db, 'del').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.del).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = 'text/plain';

      handler(req);
    });

    it('db#get as utf8 encoding when content type is not set', function(done) {
      var handler = getHandler('/data/{key}', 'GET'), encoding;

      spyOn(db, 'get').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.get).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = '';

      handler(req);
    });

    it('db#put as utf8 encoding when content type is not set', function(done) {
      var handler = getHandler('/data/{key}', 'POST'), encoding;

      spyOn(db, 'put').andCallFake(function() {
        encoding = arguments[2].valueEncoding;
        arguments[3]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.put).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = '';

      handler(req);
    });

    it('db#del as utf8 encoding when content type is not set', function(done) {
      var handler = getHandler('/data/{key}', 'DELETE'), encoding;

      spyOn(db, 'del').andCallFake(function() {
        encoding = arguments[1].valueEncoding;
        arguments[2]();
      });

      req.reply = function() {
        expect(encoding).toEqual('utf8');
        expect(db.del).wasCalled();
        done();
      };

      req.raw.req.headers['content-type'] = '';

      handler(req);
    });
  });
});
