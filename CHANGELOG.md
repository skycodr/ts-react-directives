# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## [2.1.0](https://github.com/skycodr/ts-react-directives/compare/v1.2.0...v2.1.0) (2026-09-15)

### Bug Fixes

* merge conflict ([233e131](https://github.com/skycodr/ts-react-directives/commit/233e13171453cb23458ea00d1941dbd7bf55941a))

### Chore

* **release:** 2.0.0 [skip ci] ([616247b](https://github.com/skycodr/ts-react-directives/commit/616247b6a0e7e4844de94d712436e18d02619e14))
## 2.0.0 (2026-09-15)

### ⚠ BREAKING CHANGES

- finalizing conditional rendering
- Movied conditional logic to 'Check' folder instead of 'If'
- moving logic to hooks
- **upgrade:** upgrading npm packages

### Features

- adding loop logic ([6fb9982](https://github.com/skycodr/ts-react-directives/commit/6fb998255f3fe2d2cc4205a2db9b93b5a7a79c49))
- **directives:** rework loop/check internals with opt-in error reporting ([066c6c4](https://github.com/skycodr/ts-react-directives/commit/066c6c45025cb30230fc679f17d32eae94ee5320))
- **examples:** add usage examples for conditional rendering and loops ([36401eb](https://github.com/skycodr/ts-react-directives/commit/36401ebfe51bd627ead5727ddd915aa570d63f44))
- if control ([f6080d3](https://github.com/skycodr/ts-react-directives/commit/f6080d32e75767e1858f80dfb33119568ba86eaf))
- **opt-in:** opt-in error ([df71e24](https://github.com/skycodr/ts-react-directives/commit/df71e24d54325f4141510090f74e9d5f940866c9))

### Bug Fixes

- build errors ([a52f95f](https://github.com/skycodr/ts-react-directives/commit/a52f95f0f0ea0ac7c67ebfda6a38cb971a7dc55b))
- ensure .vitest directory exists before running tests ([75c2dd9](https://github.com/skycodr/ts-react-directives/commit/75c2dd9f7a3b9602ffab79f5bcdf2687850be00b))
- **git:** test failing on CI action ([ae8fdd6](https://github.com/skycodr/ts-react-directives/commit/ae8fdd6e8527b1836ec3ba42b640555181fce574))
- incorrect production check ([0d212b0](https://github.com/skycodr/ts-react-directives/commit/0d212b0f08eceb658ad5f40fe3a146c42ec30a6b))
- minor type fix ([075b3d5](https://github.com/skycodr/ts-react-directives/commit/075b3d5b5e78e0e8fc624ca55a882144fd5ed5b8))
- test failing ([7e9494b](https://github.com/skycodr/ts-react-directives/commit/7e9494bb897516d0c91dd773573494352c2c1447))
- typescript declaration issue ([e506c60](https://github.com/skycodr/ts-react-directives/commit/e506c604011e78b5e0db203c3dc7fafa71878753))
- vite config ([adf9d7c](https://github.com/skycodr/ts-react-directives/commit/adf9d7caeeab3df7c3bc36b76c546960ac815181))
- **vite:** vite config error ([e9842de](https://github.com/skycodr/ts-react-directives/commit/e9842de9a6361b0a51c8a957b3152ca7fded1234))

### Refactoring

- adding enums for component names ([a0b2ab0](https://github.com/skycodr/ts-react-directives/commit/a0b2ab019670d471eb1f89dd1c39c727f3d12516))
- code ([ebf1b7a](https://github.com/skycodr/ts-react-directives/commit/ebf1b7a1b9b491443ed97383225078168a40fc42))
- finalizing conditional rendering ([995d5e7](https://github.com/skycodr/ts-react-directives/commit/995d5e7d1b3af861c945bc542a961a93e55fa180))
- logic ([81e1497](https://github.com/skycodr/ts-react-directives/commit/81e14970c5e1e036de8a4469436138346201557d))
- loop details ([a8e82c2](https://github.com/skycodr/ts-react-directives/commit/a8e82c2855786c06aee130d9ef2073ed5065a924))
- moving logic to hooks ([374f1a7](https://github.com/skycodr/ts-react-directives/commit/374f1a7daca996ae4dd4afbe80dab712d6df9e71))
- overhaul ([4ae02dc](https://github.com/skycodr/ts-react-directives/commit/4ae02dce5c6f38a2d4bfe53b58446b32c2207048))
- removing debug from test file ([0b6e67b](https://github.com/skycodr/ts-react-directives/commit/0b6e67bf7446fa08fb4411ff0179ab2b0f4edafc))
- rename conditionl rendering ([7bd0bab](https://github.com/skycodr/ts-react-directives/commit/7bd0babdc772d653f0895222653cbb112d1abfcc))
- rename switch component ([0d3fb89](https://github.com/skycodr/ts-react-directives/commit/0d3fb89023607a839371f9bef9260877417acc9f))
- switch if ([7197738](https://github.com/skycodr/ts-react-directives/commit/71977386f0bf3256293527727c476f65fc108c5f))

### Chore

- adding app configs ([dbacdc4](https://github.com/skycodr/ts-react-directives/commit/dbacdc400742a2252a6f588f135e128fcfef642c))
- adding jsdom ([7e1fc8a](https://github.com/skycodr/ts-react-directives/commit/7e1fc8a3ed68b79b16b8368c237d740c64eae887))
- adding tailwind ([4755ac9](https://github.com/skycodr/ts-react-directives/commit/4755ac9588af7b1860d0bd65a6d3df462e1eaa2e))
- convering to package library ([38742d9](https://github.com/skycodr/ts-react-directives/commit/38742d9be1aa4be46f0ff322a4fdcbd5f481e0d8))
- initial configuration ([68ebc9e](https://github.com/skycodr/ts-react-directives/commit/68ebc9e78610db275f296b5dc0bcd31ea77bf59e))
- logging validtion blocks ([b649e49](https://github.com/skycodr/ts-react-directives/commit/b649e4985aa2e68bf9adff02b408fabe41e265db))
- normalize line endings and untrack vitest artifacts ([31ca68f](https://github.com/skycodr/ts-react-directives/commit/31ca68f1030604d48dff1560cde5f61a934819e5))
- **registry:** rectifying npm registry values ([26a7813](https://github.com/skycodr/ts-react-directives/commit/26a7813a92cefe0642ee92c1380588dd41167054))
- remove examples ([0c03234](https://github.com/skycodr/ts-react-directives/commit/0c032344614c60bd67998bec6c6a7aba45ce4863))
- remove examples ([b27de91](https://github.com/skycodr/ts-react-directives/commit/b27de91614d15a71c9bcfa5b76896fd7ece74bf0))
- **upgrade:** upgrading npm packages ([3b342dc](https://github.com/skycodr/ts-react-directives/commit/3b342dcb5bf8f9c255282cb6370d15aff9cda2bf))

### Documentation

- add developer guide, security policy, and screenshots ([cea4dba](https://github.com/skycodr/ts-react-directives/commit/cea4dba3deca3a44aa1344dc5d3e62c77dea77a5))
- adding security file ([42be3bd](https://github.com/skycodr/ts-react-directives/commit/42be3bd1363283134473062a2e17dac6f955ff54))
- documentation for loop ([3a5dcbf](https://github.com/skycodr/ts-react-directives/commit/3a5dcbf504655220cf4fc1393367d9e07cb9b1b8))
- readme file url fix ([edd4a74](https://github.com/skycodr/ts-react-directives/commit/edd4a747ee5712f15c194fe7bc4941fee384d088))
- readme files ([2b10e98](https://github.com/skycodr/ts-react-directives/commit/2b10e9891dc87cc1c66306984468af17d294715c))

### Build

- adding publish script ([2d14413](https://github.com/skycodr/ts-react-directives/commit/2d144135167fd80cd13aa23ac5625f4914e4710c))
- adding source maps ([a830f9b](https://github.com/skycodr/ts-react-directives/commit/a830f9ba6176d8b3b7321a52bfec7fc00265831a))
- bumping version ([efedbf4](https://github.com/skycodr/ts-react-directives/commit/efedbf421c7e5852763c6a32e5b5f28787ac4d10))
- bumping version ([cd1be14](https://github.com/skycodr/ts-react-directives/commit/cd1be14ab00e0f9e0ad0c72a1b977f9c46d8bdf1))
- modifying package json ([be6fb61](https://github.com/skycodr/ts-react-directives/commit/be6fb61917eee0df4ae92dc916abfd5b83288ada))

### Tests

- adding test cases ([2801522](https://github.com/skycodr/ts-react-directives/commit/2801522eae91783534994f1b36e94f2137e7e1ca))
- adding test cases ([c934a7d](https://github.com/skycodr/ts-react-directives/commit/c934a7d017869a268d2bbe00ff43240c8f0ec1e0))
- align loop and helper tests with implementation and cover runtime config ([636a35f](https://github.com/skycodr/ts-react-directives/commit/636a35f778db3fd16fc6c390a8247bb628ebfe39))
- **loop:** adding test cases for loops ([7cb1aba](https://github.com/skycodr/ts-react-directives/commit/7cb1abaad4c14ec39cdfbb219896e20c5166b065))
