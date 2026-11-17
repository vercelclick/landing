---
title: "Local GitOps Storage"
description: "Manage encrypted secrets locally through vault.vercel.click and commit them directly to Git."
category: "Storage Models"
order: 5
---

# Local GitOps Storage

Click allows you to store encrypted secrets directly inside your Git repository under `.click/secrets/` while managing them through an intuitive, visual dashboard at [`https://vault.vercel.click`](https://vault.vercel.click).

Because every secret is encrypted with the public keys of authorized contributors using authenticated asymmetric encryption (X25519-ChaCha20-Poly1305), it is **completely safe to commit these files to public or private version control**.

---

## How It Works: Local Service + Web Vault

Managing secrets in config files and terminal TTYs is error-prone. Click solves this by pairing the Web Vault with a local background daemon:

```
┌─────────────────────────────────┐
│     https://vault.vercel.click   │  Web Vault Interface
│     (Client-side Passkey Crypto)│
└────────────────┬────────────────┘
                 │ Secure Local HTTPS
                 ▼
┌─────────────────────────────────┐
│     click service (localhost)   │  Local Vault Daemon
└────────────────┬────────────────┘
                 │ Direct File I/O
                 ▼
┌─────────────────────────────────┐
│     my-project/.click/secrets/  │  Encrypted Git Repository Files
└─────────────────────────────────┘
```

1. **Start the local service:** Run `click service start` (and `click service install-certificates` if on macOS Safari).
2. **Attach your project:** Run `click attach` inside your repository directory.
3. **Manage via Web Vault:** The browser interface at [`https://vault.vercel.click`](https://vault.vercel.click) connects to your local service. You can create environments, invite teammates, and edit secrets visually.
4. **On-Device Encryption:** All encryption is executed locally inside your browser via your Passkey. The local service writes the resulting ciphertext into `.click/secrets/`.
5. **Git Commit:** Safely commit `.click/secrets/` to Git. Teammates pull the repository and run `click run` to decrypt in memory.

---

## Directory Structure

A project configured for local storage has the following structure:

```
my-project/
├── .click/
│   ├── config.json               # Project metadata & environments
│   ├── contributors.json         # Public keys of team members
│   ├── access_keys.json          # Machine access keys
│   └── secrets/
│       ├── development/
│       │   ├── DATABASE_URL.json
│       │   └── API_KEY.json
│       └── production/
│           ├── DATABASE_URL.json
│           └── STRIPE_KEY.json
├── package.json
└── src/
```

---

## Secret File Format

Inside `.click/secrets/production/DATABASE_URL.json`:

```json
{
  "definition": {
    "name": "DATABASE_URL",
    "env_name": "production"
  },
  "values": [
    {
      "target": "user_bill_public_key_id",
      "encrypted_value": "m-a1vXJNu0TXSXyf_tfEsvtiWGHPXks..."
    },
    {
      "target": "ci_github_actions_machine_key_id",
      "encrypted_value": "uXj6yPZTyuGIf2Jqhh4G9IQuWLDA..."
    }
  ]
}
```

Notice that each secret file holds multiple encrypted payloads — one for each authorized recipient! Only the owner of the matching private key can decrypt their respective payload.

---

## Benefits of Local GitOps Storage

- **Visual Management via Web Vault:** Enjoy a full-featured dashboard at [`https://vault.vercel.click`](https://vault.vercel.click) without giving up local data ownership.
- **100% Offline-First Execution:** Run and test on airplanes or trains with zero internet connectivity.
- **Atomic Branching & Merging:** Secrets branch, merge, and diff alongside application code.
- **Zero Cloud Infrastructure:** Free for open source projects, solo builders, and air-gapped teams.
