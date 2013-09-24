SRC = index.js lib/server.js lib/routes.js spec/level-http-spec.js

test:
	@node_modules/.bin/jshint $(SRC)
	@NODE_ENV=test node_modules/.bin/jasmine-node \
	--verbose \
	--captureExceptions \
	spec
