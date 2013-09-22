SRC = index.js lib/server.js lib/routes.js

test:
	@node_modules/.bin/jshint $(SRC)
