"use client";

import {
  IconBolt,
  IconCpu,
  IconFingerprint,
  IconGitBranch,
  IconKeyOff,
  IconLock,
  IconRefresh,
  IconRobot,
  IconServerOff,
  IconShieldCheck,
  IconTerminal2,
  IconUsers,
} from "@tabler/icons-react";

interface BentoCard {
  title: string;
  badge: string;
  description: string;
  icon: typeof IconFingerprint;
  bullets: string[];
  gradient: string;
}

const BENTO_FEATURES: BentoCard[] = [
  {
    title: "Passkey-Powered Cryptography",
    badge: "Hardware Security",
    description:
      "Eliminate master passwords, master keys, and phishable authentication. Passkeys leverage device Secure Enclaves (Apple Touch ID, Face ID, Windows Hello, YubiKey) to derive encryption keys locally.",
    icon: IconFingerprint,
    bullets: [
      "FIDO2 & WebAuthn PRF extension hardware keys",
      "Private keys never leave your physical device",
      "Seamless biometric unlock in under 500ms",
    ],
    gradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
  },
  {
    title: "Absolute Zero-Knowledge Guarantee",
    badge: "Zero Server Decryption",
    description:
      "Click servers act solely as a blind transport and storage layer for opaque ciphertext. Plaintext secrets never touch our infrastructure at any given point.",
    icon: IconServerOff,
    bullets: [
      "Click holds zero private keys or master KMS tokens",
      "Subpoena and server-breach immune by mathematical proof",
      "Asymmetric recipient public-key encryption",
    ],
    gradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
  },
  {
    title: "Dual Storage: GitOps Local & Cloud Vault",
    badge: "Flexible Architecture",
    description:
      "Store encrypted secrets directly in your Git repository (.click/secrets/) for 100% offline control, or sync encrypted blobs to Click Cloud Vault for automated team collaboration.",
    icon: IconGitBranch,
    bullets: [
      "Version control your encrypted secrets alongside your code",
      "Zero cloud dependency mode for air-gapped setups",
      "Seamless branch, merge, and PR review workflows",
    ],
    gradient: "from-violet-500/10 via-purple-500/5 to-transparent",
  },
  {
    title: "Just-In-Time (JIT) In-Memory Injection",
    badge: "Runtime Security",
    description:
      "Stop scattering plaintext .env files across developer laptops, Docker builds, and backup drives. 'click run' injects decrypted secrets straight into child process RAM.",
    icon: IconBolt,
    bullets: [
      "Zero unencrypted credentials written to disk",
      "Secrets vanish the instant your process terminates",
      "Prevents credential theft from malicious npm/pip packages",
    ],
    gradient: "from-amber-500/10 via-orange-500/5 to-transparent",
  },
  {
    title: "Scoped Machine Keys for CI/CD & AI Agents",
    badge: "Automated Workloads",
    description:
      "Provide autonomous AI agents, GitHub Actions, and Kubernetes clusters with tightly-scoped machine access keys restricted by environment and path.",
    icon: IconRobot,
    bullets: [
      "Automatic secret masking in CI/CD terminal logs",
      "Environment restrictions (Development, Staging, Production)",
      "Instant revocation without rotating human passkeys",
    ],
    gradient: "from-rose-500/10 via-pink-500/5 to-transparent",
  },
  {
    title: "Elimination of 'Secret Zero'",
    badge: "Cryptographic Architecture",
    description:
      "Traditional managers (Doppler, Infisical, Vault) rely on a central master key ('Secret Zero') that can decrypt all secrets if breached. Click replaces this with per-user asymmetric keypairs.",
    icon: IconKeyOff,
    bullets: [
      "No single point of failure or catastrophic breach key",
      "Point-in-time versioning with rollback safety",
      "Granular role-based access control (RBAC)",
    ],
    gradient: "from-emerald-500/10 via-cyan-500/5 to-transparent",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-20 sm:py-28">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconShieldCheck className="size-4" />
          Enterprise Secret Management Reimagined
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Engineered for Zero Trust. Built for Velocity.
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl">
          From solo developers committing encrypted secrets to Git, to
          multi-product enterprise teams orchestrating AI agents across
          environments.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {BENTO_FEATURES.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className={`group relative rounded-3xl border border-border bg-gradient-to-b ${feature.gradient} bg-surface/40 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-surface border border-border text-foreground">
                    {feature.badge}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-surface border border-border text-emerald-500 group-hover:scale-110 transition-transform">
                    <Icon className="size-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <ul className="space-y-2">
                  {feature.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 text-xs text-foreground/80"
                    >
                      <span className="text-emerald-500 font-bold shrink-0">
                        ✓
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
