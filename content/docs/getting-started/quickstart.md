---
title: "Quick Start Guide"
description: "Get started with Click Vault in under 3 minutes. Zero-knowledge secret management locked behind your fingerprint."
category: "Getting Started"
order: 1
---

# Quick Start Guide

Click Vault provides zero-knowledge secret management for developers, teams, and autonomous AI agents. All secrets are encrypted and decrypted directly on your hardware using biometric **Passkeys** (Apple Touch ID, Face ID, Windows Hello, or YubiKeys).

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

## 2. Initialize Click in Your Project

Navigate to your existing application or repository and run:

```bash
cd my-project
click init
```

This command creates a local `.click/` configuration directory containing your project metadata and public contributor keys.

---

## 3. Register Your Biometric Passkey

Click uses hardware-backed Passkeys to encrypt and decrypt secrets locally. Authenticate your machine:

```bash
click login
```

A browser window will open prompting you to register or authorize via **Touch ID**, **Face ID**, or your **FIDO2 Hardware Key**. The derived private key stays securely locked inside your physical hardware Security Enclave.

---

## 4. Set Your First Secret

Add a secret to your development environment:

```bash
click secret set DATABASE_URL="postgresql://postgres:secret@localhost:5432/mydb"
click secret set STRIPE_SECRET_KEY="sk_test_1234567890"
```

Behind the scenes:
1. Click derives a local key from your Passkey.
2. The secret is encrypted **on your device** using recipient public keys.
3. Only the opaque ciphertext blob is saved to `.click/secrets/` or synced to the Cloud Vault.
4. **Click servers never see your plaintext.**

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

## Next Steps

- [Zero-Knowledge Architecture](/docs/getting-started/architecture) - Learn how Click guarantees mathematical privacy.
- [Passkeys & Hardware Security](/docs/core-concepts/passkeys) - Understand WebAuthn PRF and Secure Enclaves.
- [Local GitOps Storage](/docs/storage/gitops-local) - Version control encrypted secrets in Git.
- [CI/CD & GitHub Actions](/docs/automation/ci-cd) - Automate deployments with scoped machine keys.
