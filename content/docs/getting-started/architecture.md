---
title: "Zero-Knowledge Architecture"
description: "How Click ensures your plaintext secrets never touch our servers under any condition."
category: "Getting Started"
order: 2
---

# Zero-Knowledge Architecture

Unlike traditional secret managers (such as Doppler, Infisical, or HashiCorp Vault) which receive or decrypt your credentials on their cloud servers, **Click operates on a strict End-to-End Zero-Knowledge model**.

---

## The Core Cryptographic Guarantee

```
Developer Device (Touch ID / Passkey)
    │
    ▼ (Client-Side Encryption in RAM)
Ciphertext Blob (X25519-ChaCha20-Poly1305)
    │
    ▼ (Blind Sync Over TLS)
Click Cloud Vault / Git Repo
    ▲
    │ (Encrypted Bytes Only - No Decryption Keys)
    │
Teammate Device (Touch ID / Passkey)
    │
    ▼ (Client-Side Decryption in RAM)
Spawn Child Process (click run -- npm start)
```

At **no point** does Click's server infrastructure possess:
1. Your private encryption keys.
2. The ability to decrypt your secrets.
3. Access to unencrypted plaintext credentials.

---

## Why "Secret Zero" is Eliminated

In traditional secret management:
- A cloud KMS master key, unseal key, or master service token acts as **"Secret Zero"**.
- If that master key or the cloud server memory is breached, **all customer secrets are exposed**.

Click completely eliminates Secret Zero:
- There is **no master encryption key** in Click Vault.
- Every contributor and machine has an independent asymmetric public/private keypair.
- When an authorized user updates a secret, their device encrypts it separately for each recipient's public key.
- Breaching Click's database yields only random-looking ciphertext strings.

---

## Subpoena & Breach Immunity

Because Click mathematically lacks the private keys required for decryption:
- **Server breaches:** An attacker who gains full root access to Click's database sees only opaque encrypted blobs.
- **Rogue insiders:** Click employees cannot view, export, or leak your credentials.
- **Subpoenas & warrants:** Click cannot comply with requests to turn over plaintext data because we do not have the technical means to decrypt it.
