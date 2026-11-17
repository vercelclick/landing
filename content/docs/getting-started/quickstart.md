---
title: "Quick Start Guide"
description: "Get started with Click Vault in under 3 minutes. Zero-knowledge secret management locked behind your fingerprint."
category: "Getting Started"
order: 1
---

# Quick Start Guide

Click Vault provides zero-knowledge secret management for developers, teams, and autonomous AI agents. All secrets are encrypted and decrypted directly on your hardware using biometric **Passkeys** (Apple Touch ID, Face ID, Windows Hello, or YubiKeys).

Local secrets are managed through our rich web vault interface at [`https://vault.vercel.click`](https://vault.vercel.click), which securely connects to a lightweight local service daemon running on your computer.

Plaintext credentials **never leave your device** and are injected directly into your application's memory at runtime.

---

## 1. Install the CLI

Install the official Click CLI via Homebrew (macOS & Linux) or using our standalone installer script:

```bash
# macOS & Linux via Homebrew
brew install vercelclick/tap/click-cli

# Or standalone curl installer
curl -LsSf https://github.com/vercelclick/cli/releases/latest/download/click-cli-installer.sh | sh
```

Verify your installation:

```bash
click --version
```

---

## 2. Start the Local Vault Service

Click uses a lightweight background service to bridge between your local `.click/` project directory and the web vault UI at [`https://vault.vercel.click`](https://vault.vercel.click):

```bash
# Start the local vault daemon service
click service start
```

> **Using macOS Safari?** Safari blocks secure HTTPS web pages from communicating with local services by default. Run this one-time command to install and trust the local HTTPS certificate:
> ```bash
> click service install-certificates
> ```

---

## 3. Attach Your Project to the Web Vault

Navigate to your application repository and attach it:

```bash
cd my-project
click attach
```

Running `click attach` will:
1. Initialize the local `.click/` directory in your project.
2. Automatically open [`https://vault.vercel.click`](https://vault.vercel.click) in your default browser.
3. Establish a secure local HTTPS link between the web vault and your local service.

---

## 4. Manage Secrets in the Web Vault

In the web interface at [`https://vault.vercel.click`](https://vault.vercel.click):

1. **Register Your Passkey:** Authenticate via Touch ID, Face ID, or your hardware security key. Your private key stays safely inside your device's hardware Secure Enclave.
2. **Add Your Secrets:** Create development, staging, or production credentials (e.g. `DATABASE_URL`, `STRIPE_SECRET_KEY`).
3. **Automatic Client-Side Encryption:** When you hit save, the web vault encrypts secrets **directly inside your browser** using recipient public keys and writes the encrypted ciphertext files into your local `.click/secrets/` directory.

**Click servers never see or hold the keys to your plaintext secrets.**

---

## 5. Run Your Application with Just-In-Time Injection

You do **not** need to create `.env` files or install any third-party SDKs in your code. Simply prepend `click run --` to your standard start command:

```bash
# Node.js / Next.js
click run -- npm run dev

# Python
click run -- python main.py

# Go
click run -- go run main.go

# Rust
click run -- cargo run
```

### What Happens:
1. Click prompts your hardware Passkey (e.g., Touch ID).
2. Secrets are decrypted in **sub-500ms** strictly inside local RAM.
3. The child process (`npm run dev`) is spawned with decrypted environment variables.
4. When the process terminates, all secrets evaporate from memory. **Zero `.env` files written to disk.**

---

## 6. Access Secrets in Your Code

Your application code remains 100% standard and vendor-neutral:

```typescript
// Standard TypeScript / JavaScript
const databaseUrl = process.env.DATABASE_URL;
const stripeKey = process.env.STRIPE_SECRET_KEY;
```

```python
# Standard Python
import os
database_url = os.getenv("DATABASE_URL")
stripe_key = os.getenv("STRIPE_SECRET_KEY")
```

---

## 7. Exporting Secrets (Optional)

If you need secrets for external tools or legacy scripts, you can export them directly:

```bash
# Export to standard .env format
click export --format=dot-env > .env

# Export to JSON
click export --format=json > secrets.json
```

---

## Next Steps

- [CLI Command Reference](/docs/cli/commands) - Complete reference for all CLI commands and flags.
- [Zero-Knowledge Architecture](/docs/getting-started/architecture) - Learn how Click guarantees mathematical privacy.
- [Local GitOps Storage](/docs/storage/gitops-local) - Understand how `.click/secrets/` files are structured and version-controlled.
- [CI/CD & GitHub Actions](/docs/automation/ci-cd) - Automate deployments with scoped machine keys.
