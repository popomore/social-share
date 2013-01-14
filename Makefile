all: install cat compile

install:
	@npm install

cat:
	@cat src/share.js src/parser.js > share.js
	@echo "combine complete `pwd`/share.js"

compile:
	@./node_modules/.bin/uglifyjs -o share.min.js share.js
	@echo "compile complete `pwd`/share.min.js"

server:
	@npm install
	@node examples/server.js

test:
	@./node_modules/.bin/mocha-phantomjs tests/runner.html
