.PHONY: test-canon test-phase0 test-all test-canon-install setup-hooks

test-canon:
	@node tests/regression/test-canon.js

test-phase0:
	@node tests/regression/test-phase0.js

test-all:
	@node tests/regression/test-canon.js; \
	 canon_exit=$$?; \
	 echo ""; \
	 node tests/regression/test-phase0.js; \
	 phase0_exit=$$?; \
	 echo ""; \
	 echo "--- test-all summary: test-canon exit=$$canon_exit · test-phase0 exit=$$phase0_exit ---"; \
	 exit $$((canon_exit + phase0_exit))

test-canon-install:
	@npm install --prefix tests/regression

setup-hooks:
	@git config core.hooksPath .githooks
	@echo "✓ git core.hooksPath = .githooks"
	@echo "  Pre-commit hook activo · test-phase0 bloqueante · test-canon informativo"
	@echo "  Bypass: git commit --no-verify"
