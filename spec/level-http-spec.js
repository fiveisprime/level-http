var levelHttp = require('../')
  , request   = require('supertest')
  , express   = require('express')
  , app       = express()
  , db        = {};

require('../lib/routes')(db, app);

describe('level-http', function() {

  describe('initialization', function() {
    it('should throw with no configuration', function() {
      var error = null;

      try {
        levelHttp();
      } catch (err) {
        error = err;
      }

      error.should.not.equal(null);
      error.message.should.equal('You must specify a database and authentication credentials.');
    });
  });

  describe('database operations', function() {
    it('should call #get on GET', function(done) {
      var get = null;

      db.get = function() {
        get = 'pass';
        arguments[2](null, {});
      };

      request(app)
        .get('/data/123')
        .expect(200)
        .end(function() {
          get.should.equal('pass');
          done();
        });
    });

    it('should call #put on POST', function(done) {
      var put = null;

      db.put = function() {
        put = 'pass';
        arguments[2](null, {});
      };

      request(app)
        .post('/data/123')
        .expect(200)
        .end(function() {
          put.should.equal('pass');
          done();
        });
    });

    it('should call #del on DELETE', function(done) {
      var del = null;

      db.del = function() {
        del = 'pass';
        arguments[2](null, {});
      };

      request(app)
        .del('/data/123')
        .expect(200)
        .end(function() {
          del.should.equal('pass');
          done();
        });
    });
  });

});
