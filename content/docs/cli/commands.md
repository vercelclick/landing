---
title: "CLI Command Reference"
description: "Comprehensive reference manual for the Click CLI tool."
category: "CLI Reference"
order: 8
---

# CLI Command Reference

The `click` command-line interface provides everything you need to manage zero-knowledge secrets locally or with the Cloud Vault.

---

## Core Commands

### `click init`
Initializes a new Click project in the current directory, generating `.click/config.json`.

```bash
click init
click init --name "My Service"
```

### `click login`
Authenticates the CLI with your hardware Passkey (Touch ID, Face ID, Windows Hello, or YubiKey).

```bash
click login
```

### `click run`
Spawns a child process and injects decrypted secrets directly into memory.

```bash
# Human authentication via Passkey:
click run -- npm run dev

# Headless / CI authentication via machine key:
click run --access-key="<KEY>" --env=staging -- npm test
```

### `click secret set`
Encrypts a secret on your device with all authorized recipient public keys.

```bash
click secret set DATABASE_URL="postgres://localhost:5432"
click secret set STRIPE_KEY="sk_live_123" --env production
```

### `click secret list`
Lists all configured secret keys in the specified environment (without showing unencrypted values).

```bash
click secret list
click secret list --env staging
```

### `click export`
Exports secrets into a formatted output (e.g. `.env` file).

```bash
click export --format=.env > .env
click export --format=json
```

### `click key create`
Creates a scoped machine access key for CI/CD or autonomous AI agents.

```bash
click key create --name "ci-runner" --env staging --level ReadOnly
```
