"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconExternalLink,
  IconVault,
} from "@tabler/icons-react";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand & Docs Badge */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[url('/logo.svg')] dark:bg-[url('/logo-dark.svg')] size-7 bg-cover" />
            <span className="text-xl font-bold dark:text-muted">Vercel</span>
            <span className="text-xl font-bold text-accent">Click</span>
          </Link>
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            Docs
          </span>
        </div>

        {/* Right Action Links */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-surface"
          >
            <IconArrowLeft className="size-3.5" />
            Back to Website
          </Link>

          <ThemeToggle />

          <a
            href="https://vault.vercel.click"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
          >
            <IconVault className="size-4" />
            <span className="hidden sm:inline">Open</span> Vault
            <IconExternalLink className="size-3 opacity-70" />
          </a>
        </div>
      </div>
    </header>
  );
}
