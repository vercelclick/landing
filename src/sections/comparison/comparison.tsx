"use client";

import {
  IconCheck,
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconDeviceLaptop,
  IconFingerprint,
  IconHelpCircle,
  IconKeyOff,
  IconMinus,
  IconScale,
  IconServerOff,
  IconShieldCheck,
  IconX,
} from "@tabler/icons-react";

interface ComparisonRow {
  feature: string;
  category: string;
  click: {
    status: "positive" | "negative" | "partial";
    text: string;
  };
  infisical: {
    status: "positive" | "negative" | "partial";
    text: string;
  };
  doppler: {
    status: "positive" | "negative" | "partial";
    text: string;
  };
  vault: {
    status: "positive" | "negative" | "partial";
    text: string;
  };
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Decryption Location",
    category: "Architecture",
    click: {
      status: "positive",
      text: "On-Device via Passkeys (RAM only)",
    },
    infisical: {
      status: "negative",
      text: "Server-side (Cloud KMS)",
    },
    doppler: {
      status: "negative",
      text: "Server-side (Doppler Cloud)",
    },
    vault: {
      status: "negative",
      text: "Server-side (Vault Cluster)",
    },
  },
  {
    feature: "Server Access to Plaintext",
    category: "Zero Knowledge",
    click: {
      status: "positive",
      text: "NEVER (Cryptographically Impossible)",
    },
    infisical: {
      status: "negative",
      text: "YES (Server decrypts in memory)",
    },
    doppler: {
      status: "negative",
      text: "YES (Doppler holds decryption keys)",
    },
    vault: {
      status: "negative",
      text: "YES (Server unseals & decrypts)",
    },
  },
  {
    feature: "Secret Zero Vulnerability",
    category: "Zero Knowledge",
    click: {
      status: "positive",
      text: "Eliminated (No master key exists)",
    },
    infisical: {
      status: "negative",
      text: "Present (Master KMS / Root Token)",
    },
    doppler: {
      status: "negative",
      text: "Present (Cloud Service Tokens)",
    },
    vault: {
      status: "negative",
      text: "Present (Master Unseal Keys)",
    },
  },
  {
    feature: "Human Authentication",
    category: "Security",
    click: {
      status: "positive",
      text: "Biometric Passkeys (FIDO2 / Touch ID)",
    },
    infisical: {
      status: "partial",
      text: "Email, Password, SSO, OTP",
    },
    doppler: {
      status: "partial",
      text: "Email, Password, SSO, OTP",
    },
    vault: {
      status: "partial",
      text: "Tokens, LDAP, AppRole, OIDC",
    },
  },
  {
    feature: "GitOps Local Storage",
    category: "Storage",
    click: {
      status: "positive",
      text: "Native (.click/secrets/ in Git)",
    },
    infisical: {
      status: "partial",
      text: "Requires server sync agent",
    },
    doppler: {
      status: "negative",
      text: "Cloud only (No native GitOps)",
    },
    vault: {
      status: "partial",
      text: "Vault Agent / External sync",
    },
  },
  {
    feature: "Just-In-Time In-Memory Injection",
    category: "Developer Experience",
    click: {
      status: "positive",
      text: "Native ('click run -- <cmd>')",
    },
    infisical: {
      status: "positive",
      text: "Infisical CLI run",
    },
    doppler: {
      status: "positive",
      text: "Doppler CLI run",
    },
    vault: {
      status: "partial",
      text: "Vault Agent / Consul Template",
    },
  },
  {
    feature: "Subpoena & Server Breach Immunity",
    category: "Compliance",
    click: {
      status: "positive",
      text: "Guaranteed (Server has only noise)",
    },
    infisical: {
      status: "negative",
      text: "Vulnerable if server/KMS accessed",
    },
    doppler: {
      status: "negative",
      text: "Vulnerable to cloud provider compromise",
    },
    vault: {
      status: "negative",
      text: "Vulnerable if unsealed keys compromised",
    },
  },
  {
    feature: "Autonomous AI & CI/CD Scoping",
    category: "Developer Experience",
    click: {
      status: "positive",
      text: "Granular per-env machine keys + masking",
    },
    infisical: {
      status: "positive",
      text: "Service tokens & machine identities",
    },
    doppler: {
      status: "positive",
      text: "Service tokens",
    },
    vault: {
      status: "positive",
      text: "Complex AppRole ACL policies",
    },
  },
];

export function ComparisonSection() {
  return (
    <section id="comparison" className="container mx-auto px-4 py-20 sm:py-28">
      {/* Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconScale className="size-4" />
          Architectural Comparison
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Why Teams Choose Click Over Traditional Vaults
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl">
          Most secret managers store your keys and decrypt your data on their
          servers. Click ensures your plaintext never leaves your physical
          hardware.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto rounded-3xl border border-border bg-surface/30 backdrop-blur-md shadow-2xl">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-border bg-surface/80">
              <th className="p-5 text-sm font-bold text-foreground w-1/3">
                Feature / Guarantee
              </th>
              <th className="p-5 text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-x border-emerald-500/20 w-1/4">
                <div className="flex items-center gap-2">
                  <IconShieldCheck className="size-5" />
                  <span>Click Vault</span>
                </div>
              </th>
              <th className="p-5 text-sm font-semibold text-muted w-1/5">
                Infisical
              </th>
              <th className="p-5 text-sm font-semibold text-muted w-1/5">
                Doppler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-xs sm:text-sm">
            {COMPARISON_DATA.map((row) => (
              <tr
                key={row.feature}
                className="hover:bg-surface/50 transition-colors"
              >
                <td className="p-5 font-medium text-foreground">
                  <div className="font-semibold">{row.feature}</div>
                  <div className="text-[11px] text-muted font-mono mt-0.5">
                    {row.category}
                  </div>
                </td>

                {/* Click Vault */}
                <td className="p-5 bg-emerald-500/5 border-x border-emerald-500/20 font-semibold text-foreground">
                  <div className="flex items-start gap-2">
                    <IconCircleCheckFilled className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{row.click.text}</span>
                  </div>
                </td>

                {/* Infisical */}
                <td className="p-5 text-muted">
                  <div className="flex items-start gap-2">
                    {row.infisical.status === "positive" ? (
                      <IconCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : row.infisical.status === "partial" ? (
                      <IconMinus className="size-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <IconX className="size-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span>{row.infisical.text}</span>
                  </div>
                </td>

                {/* Doppler */}
                <td className="p-5 text-muted">
                  <div className="flex items-start gap-2">
                    {row.doppler.status === "positive" ? (
                      <IconCheck className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : row.doppler.status === "partial" ? (
                      <IconMinus className="size-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <IconX className="size-4 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <span>{row.doppler.text}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Summary Callout */}
      <div className="mt-12 max-w-4xl mx-auto p-6 rounded-2xl bg-surface/50 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <IconKeyOff className="size-6" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground text-sm">
              The Fundamental Difference: Who Holds The Keys?
            </h4>
            <p className="text-xs text-muted mt-0.5">
              Traditional platforms decrypt secrets in memory on their cloud
              servers. Click moves 100% of decryption to your hardware.
            </p>
          </div>
        </div>

        <a
          href="https://vault.vercel.click"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-foreground text-background font-semibold text-xs whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shrink-0"
        >
          Try Click Vault Free &rarr;
        </a>
      </div>
    </section>
  );
}
