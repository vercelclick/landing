---
title: "CLI Command Reference"
description: "Complete command-line interface documentation for the Click Vault CLI tool."
category: "CLI Reference"
order: 8
---

# CLI Command Reference

The `click` command-line interface is a zero-knowledge secure vault utility where all encryption and decryption operations occur on-device via Passkeys and hardware security modules.

```bash
click <COMMAND>
```

---

## Command Overview

| Command | Description |
| :--- | :--- |
| [`click run`](#click-run) | Run a command with decrypted secrets injected into environment variables |
| [`click export`](#click-export) | Export decrypted secrets to a file or pipe stdout |
| [`click attach`](#click-attach) | Attach a directory as a local project to be managed via `vault.vercel.click` |
| [`click service`](#click-service) | Manage the local vault daemon service |

---

## `click run`

Runs a command with decrypted secrets injected directly into its environment variables. Secrets are decrypted in volatile RAM on-the-fly via your Passkey (or machine access key) and are automatically masked in GitHub Actions console logs.

```bash
click run [OPTIONS] [COMMAND]...
```

### Arguments

- `<COMMAND>` — The command to execute with injected secrets. Supports full standard `sh` syntax.

### Options

| Option | Default | Description |
| :--- | :--- | :--- |
| `--mode <auto\|local\|cloud>` | `auto` | Specify whether to use local or cloud vault. Automatically inferred by the presence of a `.click/` project in the directory. |
| `--env <ENV>` | — | The vault environment to pull secrets from (e.g. `development`, `staging`, `production`). Required when using `--access-key`. |
| `--access-key <KEY>` | — | Scoped machine access key for automated CI/CD or headless environments. If omitted, you are prompted for biometric Passkey authorization. |
| `--project-dir <DIR>` | `cwd` | Path to the local vault project directory. |
| `--endpoint <URL>` | `https://api.vercel.click` | Custom API endpoint when connecting to an on-premises or private cloud deployment. |

### Examples

```bash
# Human development: Authenticate via Touch ID / Passkey and run dev server
click run -- npm run dev

# Explicitly target staging environment
click run --env staging -- python main.py

# Automated CI runner using machine access key
click run --access-key="$CLICK_ACCESS_KEY" --env production -- cargo run
```

---

## `click export`

Exports decrypted secrets to standard output or a file. Secrets are automatically masked on GitHub Actions.

```bash
click export [OPTIONS]
```

### Options

| Option | Default | Description |
| :--- | :--- | :--- |
| `--format <FORMAT>` | `dot-env` | Output format. Supported values: `dot-env` (standard `.env`), `json`, `gh-actions` (for appending to `$GITHUB_ENV`). |
| `--mode <auto\|local\|cloud>` | `auto` | Specify local or cloud vault. Inferred automatically by local directory configuration. |
| `--env <ENV>` | — | Target vault environment (required when using `--access-key`). |
| `--access-key <KEY>` | — | Scoped machine access key for decryption. |
| `--project-dir <DIR>` | `cwd` | Local project directory path. |
| `--endpoint <URL>` | `https://api.vercel.click` | Custom cloud endpoint URL. |

### Examples

```bash
# Export secrets to a standard local .env file
click export --format=dot-env > .env

# Export secrets formatted as JSON
click export --format=json > secrets.json

# Append masked secrets to GitHub Actions environment
click export --access-key="$CLICK_ACCESS_KEY" --env=staging --format=gh-actions >> $GITHUB_ENV
```

---

## `click attach`

Attaches a directory as a Click Vault local project. Once attached, you can visually manage environments, add secrets, and invite teammates through the web interface at [`https://vault.vercel.click`](https://vault.vercel.click).

```bash
click attach [OPTIONS]
```

### Options

| Option | Default | Description |
| :--- | :--- | :--- |
| `--target <TARGET>` | `cwd` | The directory path to attach as a local project. |
| `--silent` | `false` | Prevent the CLI from automatically opening your default web browser after attaching. |

### Examples

```bash
# Attach current directory and open browser to configure project
click attach

# Attach specific directory without opening browser
click attach --target ./services/api --silent
```

---

## `click service`

Manages the local Click Vault background service daemon. The local service runs on your machine to bridge between your local `.click/` repository files and the web vault at [`https://vault.vercel.click`](https://vault.vercel.click).

```bash
click service <COMMAND>
```

### Subcommands

| Subcommand | Description |
| :--- | :--- |
| `start` | Start the local vault daemon service |
| `stop` | Stop the local vault daemon service |
| `status` | Check if the local vault daemon is running |
| `install-certificates` | Install local trusted HTTPS certificates for macOS Safari |

---

### `click service start`

Starts the local service that enables [`https://vault.vercel.click`](https://vault.vercel.click) to communicate with your local machine.

```bash
click service start [OPTIONS]
```

#### Options:
- `--foreground` *(default: `false`)* — Runs the service as a standard interactive terminal process instead of backgrounding it.

```bash
# Start background daemon
click service start

# Run in foreground for debugging
click service start --foreground
```

---

### `click service stop`

Stops the running local background service daemon.

```bash
click service stop
```

---

### `click service status`

Displays the current operational status of the local Click service.

```bash
click service status
```

---

### `click service install-certificates`

Installs and trusts local HTTPS certificates on your machine.

> **Why this is needed:** By default, macOS Safari blocks web applications running on secure HTTPS origins (like `https://vault.vercel.click`) from communicating with local services (`localhost`). Running this command installs a trusted local SSL certificate so Safari can securely interface with your local service.

```bash
click service install-certificates
```
