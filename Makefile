SRC = index.js lib/server.js lib/routes.js spec/level-http-spec.js

test:
	@node node_modules/.bin/jshint $(SRC)
	@node node_modules/.bin/istanbul test node_modules/.bin/_mocha \
	-R spec -- \
	--reporter spec
