---
title: "Cloud Vault Synchronization"
description: "Hosted zero-knowledge team synchronization, granular role-based access control, and audit logs."
category: "Storage Models"
order: 6
---

# Cloud Vault Synchronization

For teams and enterprises that need instant secret synchronization without managing Git commits, Click offers a hosted **Cloud Vault** service at `https://vault.vercel.click`.

---

## Zero-Knowledge Guarantee on Cloud

The Cloud Vault operates as a blind ciphertext storage and relay engine:
- When a teammate modifies a secret in the web UI or CLI, encryption occurs **locally on their machine**.
- Only the encrypted ciphertext is transmitted to the Click Cloud Vault.
- Click's database and servers hold **zero decryption keys**.

---

## Features

- **Granular RBAC:** Define Admin, Contributor, and Read-Only roles per project and per environment.
- **Multi-Environment Isolation:** Segregate Development, Staging, and Production secrets.
- **Point-in-Time History & Rollback:** Review who modified a secret and revert to previous versions with a single click.
- **Team Workspaces:** Group multiple projects, microservices, and developers under unified organizational workspaces.
