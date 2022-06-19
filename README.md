# @tapjs/config

Loads TAP configuration from:

- Command-line
- Environment: read from `TAP_*` environment variables.
- `"tap"` object in current project's `package.json` file, if
  present.

All loaded configs are put into the environment.
