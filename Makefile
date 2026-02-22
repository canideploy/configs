.PHONY: instructions install audit reset sync test build startover clean rm-coverage rm-dist rm-node-modules

instructions:
	-@ echo "Available commands:"
	-@ echo "make install"
	-@ echo "make reset"
	-@ echo "make test"
	-@ echo "make build"
	-@ echo "make clean"
	-@ echo "make startover"

install:
	@echo "Installing dependencies"
	-@ pnpm install --frozen-lockfile
	@echo "Dependencies installed"

audit:
	@echo "Running prod audit"
	pnpm audit --audit-level=moderate --prod --ignore-registry-errors
	@echo "Audit complete"

reset:
	@echo "Resetting Nx"
	-@ pnpm exec nx reset

sync:
	@echo "Syncing TypeScript configs"
	-@ pnpm exec nx sync

test:
	pnpm exec nx run-many -t test --silent=passed-only --nxBail

build:
	@echo "Building all projects"
	-@ pnpm build
	@echo "Build complete"

startover: clean rm-node-modules install reset

clean: rm-coverage rm-dist

rm-coverage:
	@echo "Removing coverage folders..."
	-@ rm -rf ./coverage ./{apps,libs,packages}/*/coverage
	@echo "coverage folders have been removed"

rm-dist:
	@echo "Removing dist folders..."
	-@ rm -rf ./dist ./{apps,libs,packages}/*/dist ./{apps,libs,packages}/*/storybook-static ./{apps,libs,packages}/*/*.tsbuildinfo ./{apps,libs,packages}/*/.sst.config.*.mjs ./{apps,libs,packages}/*/vitest.config.mts.timestamp-*.mjs
	@echo "dist folders have been removed"

rm-node-modules:
	@echo "Removing node_modules folders..."
	-@ rm -rf ./node_modules ./packages/*/node_modules
	@echo "node_modules folders have been removed"
