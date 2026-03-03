# opencode-notify-native

Direct native notification plugin for OpenCode.

## What this repository ships

- npm package: `@leo000001/opencode-notify-native`

## Features

- Native notifications on Windows, macOS, Linux
- Automatic event hooks:
  - `complete`
  - `error`
  - `attention`
- Per-event sound profile
- Notification anti-spam controls (collapse + cooldown)
- Basic text sanitization and truncation

## Install

### From npm

Add to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@leo000001/opencode-notify-native"]
}
```

### Local development install

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": [
    "file:///ABSOLUTE/PATH/TO/plugins/opencode-notify-native/opencode-plugin/dist/index.js"
  ]
}
```

Use your own absolute path, but always point to this entry file:

- `.../opencode-plugin/dist/index.js`

## Optional config

Recommended global config:

- `~/.config/opencode/notify-native.config.json`

Optional project overrides:

- `<worktree>/notify-native.config.json`
- `<worktree>/.opencode/notify-native.config.json`

Compatibility names still supported:

- `opencode-native-notify.config.json`
- `opencode-notify.config.json`

Resolution order (low -> high):

1. Global config (`~/.config/opencode/...`)
2. Project root config
3. `.opencode` project config
4. `OPENCODE_NOTIFY_NATIVE_CONFIG` (if set)

Values are layered; later sources override earlier ones.

```json
{
  "enabled": true,
  "events": {
    "complete": true,
    "error": true,
    "attention": true
  },
  "soundByEvent": {
    "complete": true,
    "error": "error",
    "attention": "attention"
  },
  "collapseWindowMs": 3000,
  "cooldownMs": 30000,
  "sanitize": true,
  "maxBodyLength": 200,
  "showDirectory": true,
  "showSessionId": false
}
```

## Data files

- This plugin does not persist state files.
- No queue/status bridge is used.

## Platform notes

- Windows: notifications depend on system notification settings and Focus Assist.
- macOS: tries `terminal-notifier` first (supports click-to-focus), falls back to `osascript`.
- Linux: requires `notify-send` (for example `libnotify-bin` on Debian/Ubuntu). `notify-send` has no standard sound support; this plugin can only best-effort play sounds when `canberra-gtk-play` is available.

## Click behavior

- If focusing an existing terminal/editor instance is possible, the notification click will focus it.
- Otherwise, clicks are treated as no-ops.
- This plugin must not open a new app window on click.

## Build and test

```bash
npm install --prefix opencode-plugin
npm run build --prefix opencode-plugin
npm run typecheck --prefix opencode-plugin
npm test --prefix opencode-plugin
```

## Release

- CI and release workflows publish only the npm plugin.
- Tag push (`v*`) runs build/typecheck/test/pack and optionally publishes to npm when `NPM_TOKEN` is configured.

## Design and maintenance docs

- Runtime design: `DESIGN.md`
- Maintainer guardrails: `AGENTS.md`
