test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec

build:
	component build

doc:
	yuidoc .
	markdox index.js -o README.md		

.PHONY: test