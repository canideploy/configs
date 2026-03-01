.PHONY: instructions install audit reset sync test build startover clean rm-coverage rm-dist rm-out-tsc rm-node-modules

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

clean: rm-coverage rm-dist rm-out-tsc

rm-coverage:
	@echo -n "Removing coverage folders... "
	-@ rm -rf ./coverage ./{apps,libs,packages}/*/coverage
	@echo "done"

rm-dist:
	@echo -n "Removing dist folders... "
	-@ rm -rf ./dist ./packages/*/dist
	@echo "done"

rm-out-tsc:
	@echo -n "Removing out-tsc folders... "
	-@ rm -rf ./packages/*/out-tsc
	@echo "done"

rm-node-modules:
	@echo -n "Removing node_modules folders... "
	-@ rm -rf ./node_modules ./packages/*/node_modules
	@echo "done"
