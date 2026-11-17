export interface IFaqItem {
  title: string;
  description: string;
}

export const FAQ_ITEMS: IFaqItem[] = [
  {
    title: "Does Click Vault ever have access to my plaintext secrets?",
    description:
      "Never. By cryptographic architecture, Click operates under a strict Zero-Knowledge model. All encryption and decryption operations occur entirely on your local physical device using your Passkey hardware keys before any data is sent over the network. Click servers only store opaque ciphertext blobs and hold zero private keys. Even under a court subpoena, rogue insider threat, or full cloud breach, Click cannot decrypt your secrets because we mathematically do not possess the keys.",
  },
  {
    title: "How do Passkeys encrypt and decrypt secrets on my device?",
    description:
      "While Passkeys (WebAuthn / FIDO2) are traditionally used for authentication, Click leverages the WebAuthn PRF (Pseudo-Random Function) extension. This allows your device's hardware Security Enclave (such as Apple Touch ID, Face ID, Windows Hello, or YubiKeys) to derive symmetric and asymmetric cryptographic keys locally. The private key never leaves your physical chip. When you approve an operation, decryption happens inside local memory (RAM) in under 500ms.",
  },
  {
    title: "What is 'Secret Zero' and why does eliminating it matter?",
    description:
      "'Secret Zero' is the master root key or centralized cloud KMS key that traditional secret managers (like Infisical, Doppler, or HashiCorp Vault) rely on to decrypt all tenant data on their servers. If an attacker breaches the server or acquires the master KMS credentials, every customer secret is exposed in plaintext. Click eliminates Secret Zero entirely for human users by using individual asymmetric public-key cryptography: each secret is encrypted on-device specifically for each authorized recipient's public key.",
  },
  {
    title: "How does Click differ from Infisical and Doppler?",
    description:
      "Both Infisical and Doppler are server-centric: their backend infrastructure receives or decrypts your secrets in cloud memory to serve them to your CLI or SDK. You have to trust their security posture, cloud admins, and third-party infrastructure. Click is client-first and zero-knowledge: encryption happens on your device with biometric passkeys, secrets are injected just-in-time into process RAM, and neither Click employees nor servers can ever view your credentials.",
  },
  {
    title: "How does Local GitOps storage work without a cloud backend?",
    description:
      "Click lets you store encrypted secret files directly inside your Git repository (under the .click/secrets/ directory). Because secrets are encrypted on-device with the public keys of authorized contributors, it is 100% safe to commit them to version control. Teammates decrypt them locally using their individual Passkeys. This gives you offline-first, zero-infrastructure secret management that branches and merges seamlessly with your codebase.",
  },
  {
    title: "How do automated CI/CD runners, Docker, and AI agents access secrets?",
    description:
      "Since automated runners cannot provide human biometric fingerprints, Click allows you to generate tightly-scoped Machine Access Keys. These keys can be restricted to specific environments (e.g., Staging vs. Production) and individual secrets. In CI pipelines like GitHub Actions, Click automatically masks secrets in console logs to prevent accidental exposure.",
  },
  {
    title: "How does Just-In-Time (JIT) injection eliminate .env file leaks?",
    description:
      "Traditional workflows encourage developers to download unencrypted .env files that sit on laptop hard drives, get backed up to personal clouds, and accidentally get committed to Git. With Click, running 'click run -- <command>' launches your application and injects secrets directly into the child process's environment variables in RAM. The secrets never touch disk in plaintext and evaporate as soon as the process exits.",
  },
  {
    title: "What happens if a team member loses their laptop or leaves the organization?",
    description:
      "If a laptop is lost, the user's private key remains locked behind the device's biometric Secure Enclave (Touch ID/Face ID) or hardware PIN. For organizational offboarding, an administrator simply revokes the contributor's public key in the project config; subsequent secret updates will no longer be encrypted for that user, cutting off their access immediately.",
  },
  {
    title: "Can I manage multiple projects and environments (Dev, Staging, Prod)?",
    description:
      "Yes. Click supports multi-environment segregation with granular role-based access control (RBAC). You can configure developers to have automatic access to Development and Staging while locking Production behind restricted contributor approvals and point-in-time audit logs.",
  },
  {
    title: "Is Click open source or verifiable?",
    description:
      "Click provides transparent source code under the Business Source License (BSL 1.1) on GitHub. You can inspect the cryptographic implementation, verify that encryption occurs client-side, and audit how keys are derived on your device.",
  },
];
