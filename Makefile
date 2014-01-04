SRC = index.js lib/server.js lib/routes.js spec/level-http-spec.js

test: $(SRC)
	@node node_modules/.bin/jshint $^
	@node node_modules/.bin/istanbul test node_modules/.bin/_mocha \
	-R spec -- \
	--require should \
	--reporter spec
