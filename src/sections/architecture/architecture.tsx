"use client";

import {
  IconFingerprint,
  IconKeyOff,
  IconLock,
  IconLockOpen,
  IconServerOff,
  IconShieldCheck,
} from "@tabler/icons-react";
import { useState } from "react";

interface Step {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: typeof IconFingerprint;
  details: string[];
  codeSnippet: string;
}

const ARCHITECTURE_STEPS: Step[] = [
  {
    id: "step-1",
    number: "01",
    title: "Passkey Biometric Authentication",
    subtitle: "On-Device Hardware Key Derivation",
    tag: "Client-Side Only",
    icon: IconFingerprint,
    details: [
      "No master passwords or plaintext encryption keys stored anywhere.",
      "Uses WebAuthn & FIDO2 PRF (Pseudo-Random Function) to derive encryption keys inside your hardware Security Enclave (Touch ID, Face ID, Windows Hello, YubiKey).",
      "Private keys NEVER leave your physical device under any condition.",
    ],
    codeSnippet: `// 1. Hardware Biometric Authentication (WebAuthn PRF)
const credential = await navigator.credentials.get({
  publicKey: {
    challenge: serverChallenge,
    extensions: { prf: { eval: { first: clientSalt } } }
  }
});
// Key derived strictly inside Apple Secure Enclave / TPM chip
const privateKey = deriveLocalKey(credential.response);`,
  },
  {
    id: "step-2",
    number: "02",
    title: "Client-Side Asymmetric Encryption",
    subtitle: "Public-Key Hybrid Envelope Encryption",
    tag: "On Your Machine",
    icon: IconLock,
    details: [
      "When adding or modifying a secret, encryption happens 100% on your local machine before transmitting any data.",
      "Each secret is encrypted separately using the public keys of all authorized team members and machine keys.",
      "Click servers only receive opaque, cryptographically sealed ciphertext blobs.",
    ],
    codeSnippet: `// 2. Encrypt on-device with recipient public keys
for (const recipient of authorizedContributors) {
  const encryptedPayload = await encryptSecret({
    secret: "sk_live_9481948194819",
    recipientPublicKey: recipient.publicKey,
    algorithm: "ChaCha20-Poly1305"
  });
  // Ciphertext generated before leaving local RAM
  encryptedValues.push(encryptedPayload);
}`,
  },
  {
    id: "step-3",
    number: "03",
    title: "Zero-Knowledge Transport & Storage",
    subtitle: "Click Never Sees Plaintext at Any Point",
    tag: "Zero Server Knowledge",
    icon: IconServerOff,
    details: [
      "Click servers act solely as a blind sync and relay engine for encrypted bytes.",
      "Choose your storage: sync encrypted blobs to Click Cloud Vault, or commit them directly to Git (.click/secrets/) for 100% local GitOps.",
      "Because Click holds NO private keys, our servers CANNOT decrypt your secrets — even if compelled by subpoena, internal rogue action, or cloud breach.",
    ],
    codeSnippet: `// 3. Stored Ciphertext (in Git repository or Cloud Vault)
{
  "name": "DATABASE_URL",
  "encrypted_value": "m-a1vXJNu0TXSXyf_tfEsvtiWGHPXks...",
  "env": "production",
  "tag": "latest",
  // Click backend only stores this opaque encrypted string!
}`,
  },
  {
    id: "step-4",
    number: "04",
    title: "On-Device Decryption via Passkey",
    subtitle: "Just-In-Time (JIT) Ephemeral Injection",
    tag: "In-Memory Only",
    icon: IconLockOpen,
    details: [
      "When a teammate or CI runner needs a secret, they fetch the ciphertext for their public key target.",
      "A biometric prompt (Touch ID / Passkey) triggers hardware decryption strictly inside local RAM.",
      "`click run -- npm start` spawns the child process and injects secrets directly into process memory — zero plaintext .env files on disk.",
    ],
    codeSnippet: `// 4. Just-In-Time In-Memory Execution
$ click run -- npm run dev
🔐 [Click] Authenticating via Touch ID / Passkey...
✓ [Click] Decrypted 14 secrets in memory (0ms written to disk)
🚀 [App] Starting development server on port 3000...
// Secrets evaporate from memory when the process terminates!`,
  },
  {
    id: "step-5",
    number: "05",
    title: "The Death of 'Secret Zero'",
    subtitle: "No Master Key, No Cloud KMS Vulnerability",
    tag: "Mathematical Guarantee",
    icon: IconKeyOff,
    details: [
      "Traditional managers (Doppler, Infisical, HashiCorp) rely on 'Secret Zero' — a cloud KMS or master token that decrypts everything on their servers.",
      "If their server or master token is compromised, all customer secrets leak in plaintext.",
      "Click completely eliminates Secret Zero: every user and machine has an isolated keypair. Breaching Click's servers yields only useless encrypted noise.",
    ],
    codeSnippet: `// 5. Why Click is Architecturally Immune:
Traditional Vaults:
  Client -> Plaintext Secret -> [Server + Cloud KMS (Secret Zero)] -> Database
  * Server has access to plaintext! Breach server = Breach everything.

Click Zero-Knowledge Vault:
  Client [Passkey Encrypts] -> Ciphertext Only -> [Blind Server] -> Encrypted Storage
  * Plaintext NEVER touches the server. Server CANNOT decrypt.`,
  },
];

export function ArchitectureSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = ARCHITECTURE_STEPS[activeStepIndex];
  const StepIcon = activeStep.icon;

  return (
    <section
      id="architecture"
      className="container mx-auto px-4 py-20 sm:py-28"
    >
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconShieldCheck className="size-4" />
          Zero-Knowledge Cryptographic Blueprint
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          How Zero-Knowledge Actually Works
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl">
          Plaintext secrets{" "}
          <strong className="text-foreground">
            never touch Click servers at any given point
          </strong>
          . Every encryption and decryption operation occurs strictly on your
          local hardware via Passkeys.
        </p>
      </div>

      {/* Comparison Callout: Click vs Traditional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
        <div className="rounded-2xl p-6 border border-red-500/20 bg-red-500/5 dark:bg-red-950/20">
          <div className="flex items-center gap-3 mb-3 text-red-600 dark:text-red-400 font-semibold text-lg">
            <span className="flex size-7 rounded-full bg-red-500/20 items-center justify-center text-sm font-bold">
              ✕
            </span>
            Traditional Secret Managers (Doppler, Infisical)
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Secrets are decrypted on{" "}
            <strong className="text-foreground">their cloud servers</strong>{" "}
            using a central master KMS key (&ldquo;Secret Zero&rdquo;). If their
            servers, database, or cloud provider is compromised or subpoenaed,
            your plaintext credentials are exposed.
          </p>
          <div className="text-xs font-mono p-3 rounded-lg bg-background/80 border border-border text-red-500/90 dark:text-red-400">
            Client &rarr; [Cloud Server Decrypts in RAM] &rarr; Plaintext
            Vulnerability
          </div>
        </div>

        <div className="rounded-2xl p-6 border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20">
          <div className="flex items-center gap-3 mb-3 text-emerald-600 dark:text-emerald-400 font-semibold text-lg">
            <span className="flex size-7 rounded-full bg-emerald-500/20 items-center justify-center text-sm font-bold">
              ✓
            </span>
            Click Zero-Knowledge Vault (True E2EE)
          </div>
          <p className="text-sm text-muted leading-relaxed mb-4">
            Secrets are encrypted on{" "}
            <strong className="text-foreground">
              your device with Passkeys
            </strong>{" "}
            before leaving local memory. Click servers store only opaque
            ciphertext and possess{" "}
            <strong className="text-foreground">zero decryption keys</strong>.
            We cannot read your secrets even if compelled.
          </p>
          <div className="text-xs font-mono p-3 rounded-lg bg-background/80 border border-border text-emerald-600 dark:text-emerald-400 font-semibold">
            Device [Passkey Encrypts] &rarr; Blind Ciphertext Storage &rarr;
            Device [Passkey Decrypts]
          </div>
        </div>
      </div>

      {/* Interactive Step Explorer */}
      <div className="max-w-6xl mx-auto">
        {/* Step Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {ARCHITECTURE_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                type="button"
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/5 text-foreground"
                    : "border-border bg-surface/50 hover:bg-surface hover:border-border/80 text-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      isActive
                        ? "bg-emerald-500 text-black font-extrabold"
                        : "bg-muted/20 text-muted"
                    }`}
                  >
                    {step.number}
                  </span>
                  <Icon
                    className={`size-4 ${
                      isActive ? "text-emerald-500" : "text-muted"
                    }`}
                  />
                </div>
                <div className="font-semibold text-sm line-clamp-1 text-foreground">
                  {step.title}
                </div>
                <div className="text-xs text-muted truncate mt-1">
                  {step.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="rounded-3xl border border-border bg-surface/40 backdrop-blur-sm p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Explanation */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                  <StepIcon className="size-4" />
                  {activeStep.tag}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {activeStep.title}
                </h3>
                <p className="text-base text-muted font-medium mt-1 mb-6">
                  {activeStep.subtitle}
                </p>

                <ul className="space-y-3.5">
                  {activeStep.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 text-sm text-foreground/90"
                    >
                      <span className="flex size-5 shrink-0 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeStepIndex === 0}
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.max(0, prev - 1))
                  }
                  className="px-4 py-2 text-sm font-semibold rounded-lg border border-border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface transition-colors cursor-pointer"
                >
                  &larr; Previous Step
                </button>
                <span className="text-xs font-mono text-muted">
                  Step {activeStepIndex + 1} of {ARCHITECTURE_STEPS.length}
                </span>
                <button
                  type="button"
                  disabled={activeStepIndex === ARCHITECTURE_STEPS.length - 1}
                  onClick={() =>
                    setActiveStepIndex((prev) =>
                      Math.min(ARCHITECTURE_STEPS.length - 1, prev + 1),
                    )
                  }
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-foreground text-background disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Next Step &rarr;
                </button>
              </div>
            </div>

            {/* Right Column: Code / Cryptographic Flow */}
            <div className="lg:col-span-6 w-full">
              <div className="rounded-2xl border border-border/80 bg-zinc-950 p-5 font-mono text-xs text-zinc-100 shadow-2xl overflow-x-auto">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-500" />
                    <span className="size-2.5 rounded-full bg-amber-500" />
                    <span className="size-2.5 rounded-full bg-emerald-500" />
                    <span className="ml-2 text-xs font-mono text-zinc-400">
                      zero-knowledge-pipeline.ts
                    </span>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">
                    Client Device RAM
                  </span>
                </div>
                <pre className="overflow-x-auto leading-relaxed text-zinc-300">
                  <code>{activeStep.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
