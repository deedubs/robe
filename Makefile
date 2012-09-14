TESTS=test/*.js
MOCHA=./node_modules/.bin/mocha
	
test:
	@$(MOCHA) $(TESTS)

.PHONY: test