# ts-react-directives

[![npm version](https://img.shields.io/npm/v/@openbytes/ts-react-directives)](https://www.npmjs.com/package/@openbytes/ts-react-directives)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
[![React](https://img.shields.io/badge/react-%5E19.0.0-blue)](https://react.dev)

## About

**ts-react-directives** is a small React/Typescript library designed to mimic 'Angular' `ngIf`, `ngFor` directives. And uses declarative syntax for logic branching and iteration.

## Features

- **`Check` / `If` / `ElseIf` / `Else`** — _`JSX`_ tags for conditional branching.
- **`Loop`** — tags for iterative logic.
- **TypeScript** — fully supported.
- **Nestable logic** — tags can be nested logically.
- **Validation** — dead-lock, crash-detection and ordinal validation.
- **Stable id** — automatically add stable `key`, between render teardown for iterable items.
- **No ternary soup** — declarative markup to avoid ternary nesting.
- **Tree-shakeable builds** — published as ESM, CJS and UMD with bundled type declarations.
- **Zero runtime dependencies** — only `react` / `react-dom` as peers.
- **Opt-in error reporting** — malformed directives can render a styled, in-place error list while
  developing, and are silent by default in production.
- **Precompiled styles** — ships its own compiled stylesheet.

## Getting Started

For features and how-to get started [Refer to the developer guide](./DEVELOPER.md). It demonstrates how to use the the library. If you want to see it an action refer to the demo below.

[Click here demo](https://skycodr.github.io/ts-react-directives/)

## Documentation

- **Developer guide** - features, installation, usage, SSR support, error
  configuration and styling: [DEVELOPER.md](./DEVELOPER.md)
- **Security policy** - supported versions and how to report a vulnerability:
  [SECURITY.md](./SECURITY.md)
- **License** - MIT: [LICENSE.md](./LICENSE.md)
- **Authors** - [AUTHORS.md](./AUTHORS.md)

## Todo

- Add breakOn and continueOn capability
- Add filters
- Exhaustive unit tests for loops
- Refactor unit tests

## Issues

Open bug reports and feature requests at
[GitHub Issues](https://github.com/skycodr/ts-react-directives/issues).
