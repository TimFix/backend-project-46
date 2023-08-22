install:
	npm ci

lint:
	npx eslint

gendiff:
	node bin/gendiff.js

publish:
	nmp publish --dry-run

test:
	npx jest

test-coverage:
	npx jest --coverage