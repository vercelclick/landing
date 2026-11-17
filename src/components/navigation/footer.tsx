"use client";

import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandMedium,
  IconBrandSlack,
  IconBrandX,
  IconExternalLink,
  IconMail,
  IconMapPin,
  IconShieldCheck,
  IconVault,
} from "@tabler/icons-react";
import Link from "next/link";
import { COMMUNITY_LINKS, RESOURCES_LINKS } from "./links";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30 backdrop-blur-md pt-16 pb-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Top Security Pledge Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 shrink-0">
              <IconShieldCheck className="size-8" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground">
                Our Zero-Knowledge Guarantee
              </h3>
              <p className="text-xs sm:text-sm text-muted mt-0.5 max-w-xl">
                Plaintext secrets never touch Click servers at any given point.
                Encryption &amp; decryption are executed strictly on your local
                hardware via Passkeys.
              </p>
            </div>
          </div>

          <a
            href="https://vault.vercel.click"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-foreground text-background font-semibold text-xs sm:text-sm whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            Launch Vault &rarr;
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Info & Location & Support */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-3">
              <div className="bg-[url('/logo.svg')] dark:bg-[url('/logo-dark.svg')] size-7 bg-cover" />
              <span className="text-xl font-bold dark:text-muted">Vercel</span>
              <span className="text-xl font-bold text-accent">Click</span>
              <IconVault className="size-6 text-accent" />
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-sm mb-4">
              Zero-knowledge secret management for humans and AI agents. Locked
              behind your fingerprint with on-device Passkey encryption.
            </p>

            {/* Location & Support Details */}
            <div className="space-y-2 mb-5 text-xs text-muted">
              <div className="flex items-center gap-2">
                <IconMapPin className="size-4 text-emerald-500 shrink-0" />
                <span>Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-2">
                <IconMail className="size-4 text-emerald-500 shrink-0" />
                <a
                  href="mailto:support@vercel.click"
                  className="hover:text-foreground transition-colors font-mono"
                >
                  support@vercel.click
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 text-muted">
              <a
                href="https://vercel.click/l/s/github"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-1"
                aria-label="GitHub"
              >
                <IconBrandGithub className="size-5" />
              </a>
              <a
                href="https://vercel.click/l/s/slack"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-1"
                aria-label="Slack"
              >
                <IconBrandSlack className="size-5" />
              </a>
              <a
                href="https://vercel.click/l/s/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-1"
                aria-label="Discord"
              >
                <IconBrandDiscord className="size-5" />
              </a>
              <a
                href="https://vercel.click/l/s/x"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors p-1"
                aria-label="X (Twitter)"
              >
                <IconBrandX className="size-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <a
                  href="https://vault.vercel.click"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  Cloud Vault <IconExternalLink className="size-3 opacity-60" />
                </a>
              </li>
              <li>
                <Link
                  href="#architecture"
                  className="hover:text-foreground transition-colors"
                >
                  Zero-Knowledge Architecture
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Passkey Cryptography
                </Link>
              </li>
              <li>
                <Link
                  href="#demo"
                  className="hover:text-foreground transition-colors"
                >
                  Just-In-Time Injection
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Local GitOps Storage
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/vercelclick/cli/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  CLI Releases{" "}
                  <IconExternalLink className="size-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              {COMMUNITY_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <IconExternalLink className="size-3 opacity-60" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="https://github.com/vercelclick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <span>GitHub Discussions</span>
                  <IconExternalLink className="size-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              {RESOURCES_LINKS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors flex items-center gap-1"
                  >
                    <span>{item.label}</span>
                    <IconExternalLink className="size-3 opacity-60" />
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="#faq"
                  className="hover:text-foreground transition-colors"
                >
                  Security FAQ
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/vercelclick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors flex items-center gap-1"
                >
                  BSL 1.1 Source Code{" "}
                  <IconExternalLink className="size-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Compare Links */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-3">
              Compare
            </h4>
            <ul className="space-y-2 text-xs text-muted">
              <li>
                <Link
                  href="#comparison"
                  className="hover:text-foreground transition-colors"
                >
                  Click vs Infisical
                </Link>
              </li>
              <li>
                <Link
                  href="#comparison"
                  className="hover:text-foreground transition-colors"
                >
                  Click vs Doppler
                </Link>
              </li>
              <li>
                <Link
                  href="#comparison"
                  className="hover:text-foreground transition-colors"
                >
                  Click vs HashiCorp Vault
                </Link>
              </li>
              <li>
                <Link
                  href="#architecture"
                  className="hover:text-foreground transition-colors"
                >
                  The Death of Secret Zero
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} Vercel Click Vault. Dubai, United Arab
            Emirates. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational
            </span>
            <span>Business Source License 1.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
