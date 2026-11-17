---
title: "Just-In-Time (JIT) Secret Injection"
description: "Injecting decrypted secrets directly into process RAM to permanently eliminate unencrypted .env files."
category: "Core Concepts"
order: 4
---

# Just-In-Time (JIT) Secret Injection

For over a decade, developers have relied on unencrypted `.env` files to configure applications locally. This practice creates massive security vulnerabilities:
- Plaintext credentials sit unencrypted on developer laptops.
- Files sync to personal clouds (Dropbox, iCloud, OneDrive).
- Credentials accidentally get committed to public or private Git repositories.
- Malicious npm, pip, or cargo packages can scan for and steal `.env` files.

---

## The Click JIT Model

With Click, you never write unencrypted `.env` files to disk. Instead, you use the runtime injector:

```bash
click run -- npm run dev
```

### Execution Lifecycle:
1. **Approval:** Click triggers your biometric Passkey prompt.
2. **Decryption in RAM:** Secrets are fetched from local Git storage or Cloud Vault and decrypted strictly in memory.
3. **Process Spawn:** Click spawns your command as a child process, passing decrypted secrets directly into the process's environment variables (`process.env`, `os.environ`, etc.).
4. **Instant Evaporation:** When your app terminates, the memory is freed by the OS. Zero plaintext bytes are ever written to disk.

---

## Exporting for Legacy Tools

If you must integrate with a legacy Docker build or tool that strictly requires a file on disk, you can temporarily export:

```bash
click export --format=.env > .env
```

*Note: Be sure to add `.env` to your `.gitignore` file.*
