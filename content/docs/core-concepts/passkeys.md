---
title: "Passkeys & Biometrics"
description: "How WebAuthn PRF and hardware Secure Enclaves replace master passwords with fingerprint-locked cryptography."
category: "Core Concepts"
order: 3
---

# Passkeys & Hardware Security

Passwords and master tokens are the #1 vector for credential theft, phishing attacks, and corporate data leaks. Click completely replaces master passwords with **Passkeys** backed by device hardware security modules.

---

## How It Works: WebAuthn PRF Extension

Click uses the **WebAuthn PRF (Pseudo-Random Function)** extension to turn biometric authenticators into cryptographic key generators:

1. **Hardware Isolation:** When you touch your fingerprint sensor (Apple Touch ID, Windows Hello, or Android Biometrics) or insert a FIDO2 YubiKey, the authenticator derives a 256-bit symmetric key inside the physical chip.
2. **Key Protection:** The private key **never leaves the physical Secure Enclave**.
3. **Deterministic Derivation:** Using a cryptographic salt, the exact same device and biometric sample reproduce the exact key needed to decrypt project secrets locally in RAM.

---

## Supported Hardware Authenticators

- **Apple macOS / iOS:** Touch ID, Face ID, Apple Watch unlock via Apple Secure Enclave.
- **Windows 11:** Windows Hello PIN, Facial Recognition, and Fingerprint via TPM 2.0.
- **Linux:** FIDO2 USB Security Keys (YubiKey, SoloKey, Nitrokey) via PAM / libfido2.
- **Hardware Security Keys:** YubiKey 5 Series, Feitian, Google Titan.

---

## Lost Device Protection

If a developer loses their laptop:
- The private key remains locked behind the device's hardware biometric gate and TPM/Secure Enclave encryption.
- An administrator can instantly revoke the contributor's public key in the project settings.
- Subsequent secret updates will no longer be encrypted for that contributor, cutting off their access immediately without needing to rotate database passwords.
