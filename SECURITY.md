# Security Policy

## Supported Versions

Only the latest release is supported with security fixes. Fixes are shipped
as new patch releases on npm.

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |
| older   | No        |

## Reporting a Vulnerability

Please report suspected security vulnerabilities privately so they can be
resolved before any public disclosure. Do not open a public issue for security
problems.

- **GitHub Security Advisories (preferred):** https://github.com/skycodr/ts-react-directives/security/advisories/new
- **Email the maintainers:** dulan81@gmail.com

### What to include

- The affected version of `@openbytes/ts-react-directives`.
- The affected directive or feature (for example `Loop`, `Check`, or the error
  reporting configuration).
- A minimal reproduction or a clear description of the vulnerable behaviour.
- The impact of the issue and any suggested fix, if known.

### What to expect

- Acknowledgement within three business days.
- Regular status updates until the issue is resolved.
- A fix released as soon as practical, depending on severity.
- Coordination on the timing of public disclosure.
- Credit in the release notes when a report leads to a fix.

## Scope

### In scope

- Vulnerabilities in the published `@openbytes/ts-react-directives` npm package.
- Vulnerabilities in the build tooling or release pipeline that could affect
  published artifacts.

### Out of scope

- Issues caused by misuse or misconfiguration in consuming applications.
- Vulnerabilities in third-party dependencies of consuming applications, which
  should be reported through their own maintainers.
- Content issues in the documentation or the demo site.

## Dependencies

The published package depends only on `react` and `react-dom`, which are also
declared as peer dependencies. Security updates to these packages or to the
build tooling are reviewed and shipped via patch releases.