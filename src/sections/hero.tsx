"use client";

import { buttonVariants, Chip } from "@heroui/react";
import {
  IconArrowDown,
  IconBook2,
  IconBrandGithub,
  IconCheck,
  IconCopy,
  IconCpu,
  IconExternalLink,
  IconFingerprint,
  IconLock,
  IconLockOpen,
  IconServerOff,
  IconTerminal2,
  IconVault,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";
import { QuickStartDemo } from "@/components/guide/quick-start";

export function HeroSection() {
  const [copied, setCopied] = useState(false);
  const installCmd = "brew install vercelclick/tap/click-cli";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 size-[400px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 relative flex flex-col items-center text-center">
        {/* Top Badges / Trust Signal */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconVault className="size-4" />
          Zero Server Decryption · Passkey Native
        </div>

        {/* Catchy Main Heading */}
        <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08]">
          Zero-Knowledge Secrets. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
            Locked Behind Your Fingerprint.
          </span>
        </h1>

        {/* Crisp One-Liner Subtitle */}
        <p className="mt-6 max-w-3xl text-lg sm:text-xl md:text-2xl text-muted font-normal leading-relaxed">
          True zero-knowledge secret management: encrypted on-device with your{" "}
          <span className="text-foreground font-semibold">Passkey</span>,
          injected{" "}
          <span className="text-foreground font-semibold">just-in-time</span>{" "}
          into runtime, and stored in your codebase or cloud vault with{" "}
          <span className="text-foreground font-semibold">
            zero server access
          </span>{" "}
          to your plaintext.
        </p>

        {/* Interactive CLI Quick Copy Command */}
        <div className="mt-8 flex items-center gap-2 p-1.5 pl-4 pr-2 rounded-xl bg-surface/70 border border-border backdrop-blur-md shadow-lg max-w-md w-full justify-between">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
            <span className="text-emerald-500 font-bold select-none">$</span>
            <span className="truncate">{installCmd}</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-secondary hover:bg-surface-tertiary text-foreground text-xs font-medium transition-colors cursor-pointer border border-border/50 shrink-0"
            aria-label="Copy install command"
          >
            {copied ? (
              <>
                <IconCheck className="size-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-semibold">Copied</span>
              </>
            ) : (
              <>
                <IconCopy className="size-3.5 text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            className={clsx(
              buttonVariants.base,
              buttonVariants.variants.variant.primary,
              buttonVariants.variants.size.lg,
              "w-full sm:w-auto shadow-lg shadow-emerald-500/20 font-semibold",
            )}
            href="https://vault.vercel.click"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconVault className="size-5" />
            Launch Cloud Vault
            <IconExternalLink className="ml-1 size-4 opacity-80" />
          </a>

          <a
            href="#architecture"
            className={clsx(
              buttonVariants.base,
              buttonVariants.variants.variant.outline,
              buttonVariants.variants.size.lg,
              "w-full sm:w-auto font-semibold gap-2",
            )}
          >
            <IconFingerprint className="size-5 text-emerald-500" />
            See How Zero-Knowledge Works
            <IconArrowDown className="size-4 opacity-60" />
          </a>

          <a
            href="https://vercel.click/l/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              buttonVariants.base,
              buttonVariants.variants.variant.ghost,
              buttonVariants.variants.size.lg,
              "w-full sm:w-auto text-muted hover:text-foreground",
            )}
          >
            <IconBook2 className="mr-1 size-4" />
            Docs
          </a>
        </div>

        {/* Cryptographic Isolation Preview Card (Complements the Architecture section) */}
        <div className="mt-14 w-full max-w-4xl p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface/30 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-foreground">
                Cryptographic Isolation Model
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              No Secret Zero · 100% On-Device
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {/* Box 1 */}
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted uppercase">
                  01. Your Device
                </span>
                <IconCpu className="size-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-1">
                <IconFingerprint className="size-4 text-emerald-500" />
                Touch ID / Passkey PRF
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Biometric keys derived inside your hardware Secure Enclave.
                Private keys never leave your machine.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted uppercase">
                  02. Blind Wire / Cloud
                </span>
                <IconServerOff className="size-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-1">
                <IconLock className="size-4 text-emerald-500" />
                Blind Ciphertext Only
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Click servers hold zero decryption keys. Even with a full server
                breach or subpoena, plaintext cannot be read.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-4 rounded-2xl bg-surface/60 border border-border/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-muted uppercase">
                  03. Execution
                </span>
                <IconTerminal2 className="size-4 text-emerald-500" />
              </div>
              <div className="flex items-center gap-2 text-foreground font-semibold text-sm mb-1">
                <IconLockOpen className="size-4 text-emerald-500" />
                Just-In-Time Injection
              </div>
              <p className="text-xs text-muted leading-relaxed">
                <code className="text-[11px] bg-background px-1 py-0.5 rounded">
                  click run
                </code>{" "}
                decrypts directly into memory. Zero unencrypted{" "}
                <code className="text-[11px]">.env</code> files on disk.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Start interactive demo */}
        <div className="w-full mt-16 text-left">
          <div className="flex flex-col items-center text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold mb-2">
              Instant Developer Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Zero code changes. Works with any stack.
            </h2>
            <p className="text-sm sm:text-base text-muted mt-2 max-w-xl">
              If your application reads environment variables, it already works
              with Click Vault.
            </p>
          </div>
          <QuickStartDemo />
        </div>
      </div>
    </section>
  );
}
