.PHONY: test-canon test-canon-install

test-canon:
	@node tests/regression/test-canon.js

test-canon-install:
	@npm install --prefix tests/regression
