SRC = index.js lib/server.js lib/routes.js spec/level-http-spec.js

test:
	@node node_modules/.bin/jshint $(SRC)
	@NODE_ENV=test node node_modules/.bin/mocha \
	--reporter spec \
	--require should \
	spec
