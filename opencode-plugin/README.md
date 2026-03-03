# @leo000001/opencode-notify-native

OpenCode plugin that sends native OS notifications directly.

## Install

Add to `opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@leo000001/opencode-notify-native"]
}
```

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

- This plugin does not write persistent data files.

## Event mapping

- `complete`: `session.status` idle and legacy `session.idle`
- `error`: `session.error` (skips `MessageAbortedError`)
- `attention`: permission and question events

Note: `permission.asked` and `question.asked` are runtime events and may not be present in the SDK event union type in some versions.

## Platform dependencies

- Windows: PowerShell toast APIs (built in)
- macOS: `terminal-notifier` recommended, fallback `osascript`
- Linux: `notify-send` (no standard sound support; best-effort sound via `canberra-gtk-play` when available)

## Click behavior

- macOS (with `terminal-notifier`): clicking tries to focus an existing terminal/editor instance (best-effort). If none are running, it's a no-op.
- Windows/Linux: click-to-jump is not supported in this plugin; clicks are treated as no-ops.
- This plugin must not open a new app window on click.

## Sound values

- `false`: silent
- `true`: enabled sound (best-effort, per-platform defaults)
- Windows: you can pass `ms-winsoundevent:...`
- macOS: you can pass a sound name (for example `Glass`, `Basso`)

## Development

```bash
npm run build
npm run typecheck
npm test
```
