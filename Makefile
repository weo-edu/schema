#
# Vars
#

NODE_BIN = ./node_modules/.bin

#
# Tasks
#

validate:
	@${NODE_BIN}/standard index.js lib/*.js

test:
	@${NODE_BIN}/mocha

ci: validate test

.PHONY: test validate ci
