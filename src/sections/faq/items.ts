export type FaqCategory =
  | "all"
  | "zero-knowledge"
  | "passkeys"
  | "jit-developer"
  | "teams-ci"
  | "comparisons";

export interface IFaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  description: string;
  highlights: string[];
  featureHighlight?: {
    label: string;
    value: string;
  };
  codeSnippet?: {
    filename: string;
    code: string;
  };
}

export const FAQ_CATEGORIES: { id: FaqCategory; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "zero-knowledge", label: "Zero-Knowledge & Privacy" },
  { id: "passkeys", label: "Passkeys & Hardware Security" },
  { id: "jit-developer", label: "Just-In-Time Injection" },
  { id: "teams-ci", label: "Teams, CI/CD & AI" },
  { id: "comparisons", label: "Infisical & Doppler Comparison" },
];

export const FAQ_ITEMS: IFaqItem[] = [
  {
    id: "zero-knowledge-guarantee",
    category: "zero-knowledge",
    categoryLabel: "Zero-Knowledge",
    title:
      "Does Click Vault ever have access to my plaintext secrets at any point?",
    summary:
      "Never. Plaintext secrets never leave your device unencrypted under any circumstances.",
    description:
      "Click is built strictly on an End-to-End Zero-Knowledge model. All cryptographic encryption and decryption operations occur strictly inside your local physical hardware before bytes ever leave your device. Click servers act solely as a blind transport and storage relay for opaque ciphertext blobs and hold zero decryption keys. Even in the event of a full server infrastructure breach, rogue insider, or government subpoena, Click is mathematically unable to decrypt your secrets because we do not possess the keys.",
    highlights: [
      "100% on-device encryption and decryption using local hardware keys",
      "Click backend never receives, stores, or caches plaintext secrets",
      "Mathematically immune to server breaches and legal subpoenas",
    ],
    featureHighlight: {
      label: "Security Proof",
      value: "Zero Server Decryption & Zero Private Key Storage",
    },
    codeSnippet: {
      filename: "client-encryption-guarantee.ts",
      code: `// What leaves your computer:
{
  "name": "DATABASE_URL",
  "encrypted_value": "m-a1vXJNu0TXSXyf_tfEsvtiWGHPXks-iE_35inhnxeh...",
  "tag": "latest"
}
// Click servers only ever see this random ciphertext string!`,
    },
  },
  {
    id: "how-passkeys-work",
    category: "passkeys",
    categoryLabel: "Passkeys",
    title: "How do Passkeys encrypt and decrypt secrets on my device?",
    summary:
      "Click uses the WebAuthn PRF extension to derive hardware-isolated encryption keys from your fingerprint.",
    description:
      "While Passkeys (WebAuthn / FIDO2) are traditionally used for website logins, Click leverages the cutting-edge WebAuthn PRF (Pseudo-Random Function) extension. This enables your device's hardware Security Enclave (such as Apple Touch ID, Face ID, Windows Hello, or YubiKey) to deterministically derive cryptographic keys locally. The private key remains permanently trapped in your hardware chip. Approving a prompt triggers hardware decryption in RAM in under 500 milliseconds.",
    highlights: [
      "Leverages Apple Secure Enclave, Windows Hello TPM, and FIDO2 YubiKeys",
      "No master passwords to remember, share, or leak in phishing attacks",
      "Sub-500ms biometric approval directly in your browser or terminal",
    ],
    featureHighlight: {
      label: "Cryptographic Primitive",
      value: "WebAuthn PRF Extension + Hardware Secure Enclave",
    },
  },
  {
    id: "death-of-secret-zero",
    category: "zero-knowledge",
    categoryLabel: "Architecture",
    title:
      "What is 'Secret Zero' and why is eliminating it a security breakthrough?",
    summary:
      "'Secret Zero' is the master root key used by traditional vaults that becomes a single point of catastrophic failure.",
    description:
      "In traditional secret managers (like Infisical, Doppler, or HashiCorp Vault), all secrets are encrypted using a centralized master key or cloud KMS key ('Secret Zero') managed on their servers. If an attacker breaches the server or steals the master KMS credentials, every single customer secret is compromised in plaintext. Click eliminates Secret Zero completely: each user and machine has an isolated asymmetric keypair. Secrets are encrypted on-device for each recipient individually.",
    highlights: [
      "No centralized master key or root token that can unlock the database",
      "Compromising Click servers yields only useless encrypted ciphertext",
      "Per-recipient asymmetric envelope encryption (Curve25519)",
    ],
    featureHighlight: {
      label: "Architecture Difference",
      value: "Asymmetric Recipient Encryption instead of Central Cloud KMS",
    },
  },
  {
    id: "infisical-doppler-comparison",
    category: "comparisons",
    categoryLabel: "Comparison",
    title: "How does Click compare to Infisical and Doppler?",
    summary:
      "Infisical and Doppler decrypt secrets in memory on their cloud servers; Click decrypts on your device with Passkeys.",
    description:
      "Both Infisical and Doppler are server-centric platforms where their cloud infrastructure holds decryption keys (or accesses AWS KMS / GCP KMS) to decrypt your secrets before sending them to your CLI or SDK. You are forced to place total trust in their cloud admins, hosting security, and third-party vendors. In contrast, Click is client-first: your secrets are never unencrypted on our servers, Passkeys eliminate master passwords, and you have the freedom to store encrypted secrets directly in Git (Local GitOps) or in our Cloud Vault.",
    highlights: [
      "Click: 100% On-device decryption vs. Infisical/Doppler server-side decryption",
      "Click: True Zero-Knowledge vs. Cloud provider plaintext memory access",
      "Click: Hardware-backed Passkeys vs. Traditional email/password/SSO",
      "Click: Native Git repository storage option vs. Cloud-only dependency",
    ],
    featureHighlight: {
      label: "Competitive Moat",
      value: "True Client-Side E2EE vs. Server-Side KMS Decryption",
    },
  },
  {
    id: "gitops-local-storage",
    category: "teams-ci",
    categoryLabel: "Storage",
    title: "How does Local GitOps storage work without a cloud backend?",
    summary:
      "Start the local service, attach your directory to vault.vercel.click, and commit encrypted secrets directly to Git.",
    description:
      "Click lets you manage local secrets through the visual dashboard at vault.vercel.click by running a lightweight local daemon ('click service start'). Running 'click attach' connects the web interface directly to your local project over secure local HTTPS. All encryption and Passkey operations execute directly inside your browser on-device before writing encrypted JSON files into '.click/secrets/'. You can safely commit these encrypted files to public or private Git repositories, giving your team offline-first, version-controlled secret management with zero cloud hosting dependencies.",
    highlights: [
      "Visual management via vault.vercel.click connecting to local service daemon",
      "Branch, merge, and PR review secrets right alongside application code",
      "100% offline-first: develop on airplanes and trains with zero internet connection",
      "Zero monthly cloud infrastructure cost for local teams",
    ],
    featureHighlight: {
      label: "Storage Format",
      value: "Encrypted Git-versioned JSON (.click/secrets/)",
    },
    codeSnippet: {
      filename: "local-gitops-workflow.sh",
      code: `# 1. Start local service and attach project:
click service start
click attach
# Automatically opens https://vault.vercel.click to manage secrets

# 2. Commit encrypted secrets safely to Git:
git add .click/secrets/
git commit -m "Update production database credentials (encrypted)"

# 3. Run your app with Just-In-Time Passkey injection:
click run -- npm run dev`,
    },
  },
  {
    id: "jit-injection-env-leaks",
    category: "jit-developer",
    categoryLabel: "Runtime Security",
    title: "How does Just-In-Time (JIT) injection eliminate `.env` file leaks?",
    summary:
      "Secrets are decrypted directly into process RAM on execution and vanish when the process exits.",
    description:
      "The #1 cause of secret leaks in modern development is unencrypted `.env` files lingering on developer laptops, syncing to iCloud/Dropbox, or accidentally being committed to GitHub. Click's 'click run -- <command>' decrypts secrets directly into the spawned child process's environment variables in RAM. No unencrypted file is ever written to your hard drive, protecting you from malicious npm/pip dependencies and disk forensics.",
    highlights: [
      "Eradicates dangerous plaintext .env files from developer machines",
      "Secrets exist only in volatile RAM for the exact lifetime of the process",
      "Protects against rogue IDE extensions and malicious open-source packages",
    ],
    featureHighlight: {
      label: "Runtime Model",
      value: "Ephemeral In-Memory Injection via 'click run'",
    },
    codeSnippet: {
      filename: "terminal-execution.sh",
      code: `$ click run -- npm run dev
🔐 [Click] Authenticating via Touch ID / Passkey...
✓ [Click] Decrypted 12 secrets into process memory (0 bytes on disk)
🚀 [App] Server listening on http://localhost:3000`,
    },
  },
  {
    id: "machine-access-ci-ai",
    category: "teams-ci",
    categoryLabel: "Automation",
    title:
      "How do automated CI/CD runners, Docker, and AI agents access secrets?",
    summary:
      "Scoped machine access keys allow automated runners to access specific environments with automatic log masking.",
    description:
      "Automated runners (like GitHub Actions, GitLab CI, Docker, Kubernetes) and autonomous AI agents cannot provide biometric human fingerprints. For these workloads, Click allows you to generate tightly-scoped Machine Access Keys. These keys are restricted to specific environments (e.g. Staging vs. Production) or individual secret paths. In CI environments, Click automatically intercepts and masks secrets in console logs to prevent accidental exposure.",
    highlights: [
      "Granular scoping: Restrict keys by environment (Dev/Staging/Prod) and tags",
      "Automatic console masking: Credentials are automatically hidden in GitHub Actions logs",
      "Point-in-time access and instant key revocation from the web dashboard",
    ],
    featureHighlight: {
      label: "Automation Security",
      value: "Scoped Machine Keys + Automatic CI/CD Log Masking",
    },
    codeSnippet: {
      filename: "github-actions-example.yml",
      code: `- name: Run tests with Click Vault
  run: click run --access-key="\${{ secrets.CLICK_KEY }}" --env=staging -- npm test
  # Any secrets printed in stdout/stderr are automatically masked!`,
    },
  },
  {
    id: "lost-device-offboarding",
    category: "passkeys",
    categoryLabel: "Device Security",
    title:
      "What happens if a team member loses their laptop or leaves the company?",
    summary:
      "Private keys stay locked in the lost device's hardware chip; access is revoked instantly by updating public keys.",
    description:
      "If a laptop is lost or stolen, the private key remains locked behind the device's biometric Secure Enclave (Touch ID / Face ID) or hardware PIN. Attackers cannot extract the private key from the physical hardware. For team offboarding, an administrator simply revokes the contributor's public key in the project config; future secret updates will no longer be encrypted for that user, cutting off their access immediately.",
    highlights: [
      "Physical theft protection: Keys cannot be extracted from Secure Enclave",
      "Instant offboarding: Revoking a contributor's public key stops future access",
      "Zero need to manually rotate every database password when an engineer departs",
    ],
    featureHighlight: {
      label: "Offboarding Workflow",
      value: "One-Click Public Key Revocation",
    },
  },
  {
    id: "environments-and-workspaces",
    category: "teams-ci",
    categoryLabel: "Workspaces",
    title:
      "Can I manage multiple projects and environments (Dev, Staging, Prod)?",
    summary:
      "Yes. Full multi-environment segregation with role-based access control (RBAC) and audit trails.",
    description:
      "Click provides first-class environment segregation. You can assign developers access to Development and Staging secrets while restricting Production secrets to senior DevOps engineers and automated release pipelines. Environment tagging enables point-in-time rollback so you can easily audit or revert changes if an incorrect configuration was deployed.",
    highlights: [
      "Granular RBAC: Admin, Contributor, and Read-Only roles per environment",
      "Point-in-time revision history with one-click rollback",
      "Multi-project workspaces for organizations managing microservices",
    ],
    featureHighlight: {
      label: "Access Governance",
      value: "Environment Isolation + Point-in-Time History",
    },
  },
  {
    id: "open-source-verifiability",
    category: "zero-knowledge",
    categoryLabel: "Licensing",
    title: "Is Click open source and verifiable?",
    summary:
      "Click provides transparent source code under the Business Source License (BSL 1.1) on GitHub.",
    description:
      "Yes. Click's source code is publicly accessible on GitHub under the Business Source License (BSL 1.1). Security teams can independently inspect our cryptographic implementation, verify that encryption occurs entirely client-side, and audit how WebAuthn PRF keys are generated on physical hardware.",
    highlights: [
      "Transparent codebase on GitHub for complete verifiability",
      "Audit client-side encryption and WebAuthn PRF key derivation yourself",
      "Community-driven improvements and transparent security disclosures",
    ],
    featureHighlight: {
      label: "Code Transparency",
      value: "Business Source License (BSL 1.1) on GitHub",
    },
  },
];
