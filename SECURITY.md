# Security Policy

## Reporting a Vulnerability

Please report suspected security vulnerabilities privately so they can be
resolved before any public disclosure. Do not open a public issue for security
problems.

- **GitHub Security Advisories (preferred):** https://github.com/skycodr/ts-react-directives/security/advisories/new
- **Email the maintainers:** dulan81_at_g_mail

### What to include

- The affected version of `@openbytes/ts-react-directives`.
- The affected directive or feature (for example `Loop`, `Check`, or the error
  reporting configuration).
- A minimal reproduction or a clear description of the vulnerable behavior.
- The impact of the issue and any suggested fix, if known.

### What to expect

- A fix released as soon as practical, depending on severity.
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
declared as peer dependencies. Any security updates made to these packages or to the build tooling, which affects this package will be reviewed and fixed via patch releases.
