all: install cat compile

install:
	@npm install

cat:
	@cat src/share.js src/parser.js > share.js
	@echo "combine complete `pwd`/share.js"

compile:
	@java -jar tools/compiler.jar --js share.js --js_output_file share.min.js
	@echo "compile complete `pwd`/share.min.js"

server:
	@npm install
	@node examples/server.js

test:
	@./node_modules/.bin/mocha tests/parser-spec.js
