---
title: "Local GitOps Storage"
description: "Commit encrypted secrets directly into your Git repository with offline capability and zero cloud costs."
category: "Storage Models"
order: 5
---

# Local GitOps Storage

Click allows you to store encrypted secrets directly inside your Git repository under `.click/secrets/`.

Because every secret is encrypted with the public keys of authorized contributors using authenticated asymmetric encryption (X25519-ChaCha20-Poly1305), it is **completely safe to commit these files to version control**.

---

## Directory Structure

A project configured for local storage has the following structure:

```
my-project/
├── .click/
│   ├── config.json               # Project metadata & environments
│   ├── contributors.json         # Public keys of team members
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

## Benefits of GitOps Storage

- **100% Offline-First:** Develop on airplanes, trains, or air-gapped networks with zero internet connectivity.
- **Branching & Merging:** Secrets branch and merge alongside code features.
- **Zero Cloud Infrastructure:** Perfect for open source projects, bootstrapped teams, or strict compliance environments.
