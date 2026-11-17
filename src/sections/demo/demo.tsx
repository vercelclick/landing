"use client";

import { useState } from "react";
import { Tabs } from "@heroui/react";
import {
  IconCheck,
  IconChecklist,
  IconCopy,
  IconCpu,
  IconFingerprint,
  IconLockOpen,
  IconRobot,
  IconShieldCheck,
  IconTerminal2,
} from "@tabler/icons-react";
import { CodeHighlighter } from "@/components/shared";
import { CodeLanguage, CodeLanguageIcon } from "@/constants";

interface SampleItem {
  language: CodeLanguage;
  command: string;
  code: string;
}

const LANGUAGE_SAMPLES: SampleItem[] = [
  {
    language: CodeLanguage.Typescript,
    command: "npm run dev",
    code: `// Clean, standard TypeScript — no proprietary Click SDK required!
// Click injects decrypted secrets straight into process memory on launch.
export function getDatabaseUrl(): string {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is required");
  }
  return dbUrl;
}`,
  },
  {
    language: CodeLanguage.Python,
    command: "python main.py",
    code: `# Standard library os.environ — zero SDK dependencies.
# Secrets are decrypted via your Passkey and passed directly into RAM.
import os

def get_api_key() -> str:
    api_key = os.getenv("STRIPE_SECRET_KEY")
    if not api_key:
        raise ValueError("STRIPE_SECRET_KEY not found in environment")
    return api_key`,
  },
  {
    language: CodeLanguage.Golang,
    command: "go run main.go",
    code: `// Pure Go standard library — no external packages.
// Injected just-in-time when executing 'click run -- go run main.go'
package main

import (
	"fmt"
	"os"
)

func getSecret(key string) string {
	val, ok := os.LookupEnv(key)
	if !ok {
		panic(fmt.Sprintf("%s environment variable required", key))
	}
	return val
}`,
  },
  {
    language: CodeLanguage.Rust,
    command: "cargo run",
    code: `// Standard Rust std::env — no runtime overhead or vendor lock-in.
use std::env;

pub fn get_secret(name: &str) -> String {
    env::var(name).unwrap_or_else(|_| {
        panic!("Missing expected secret: {}", name);
    })
}`,
  },
  {
    language: CodeLanguage.CPlusPlus,
    command: "g++ main.cpp -o app && ./app",
    code: `// Standard C++ std::getenv — works seamlessly across native binaries.
#include <iostream>
#include <cstdlib>
#include <string>

std::string get_secret(const std::string& name) {
    const char* val = std::getenv(name.c_str());
    if (!val) {
        throw std::runtime_error("Missing environment secret: " + name);
    }
    return std::string(val);
}`,
  },
  {
    language: CodeLanguage.Java,
    command: "java Main.java",
    code: `// Standard Java System.getenv — zero third-party dependencies.
public class AppConfig {
    public static String getSecret(String key) {
        String secret = System.getenv(key);
        if (secret == null) {
            throw new IllegalStateException("Secret " + key + " not configured");
        }
        return secret;
    }
}`,
  },
];

const CLI_WORKFLOWS = [
  {
    id: "local-dev",
    label: "Local Development (Passkeys)",
    icon: IconFingerprint,
    description:
      "Run your app locally with secrets injected on-the-fly. A biometric prompt (Touch ID / Passkey) decrypts credentials directly in memory.",
    shellCode: `# 1. Install the Click CLI via Homebrew
brew install vercelclick/tap/click-cli

# 2. Run your app — Click triggers your Passkey and injects secrets into RAM
click run -- npm run dev

# Optional: Export to a local .env file when needed by external tooling
click export --format=.env > .env`,
  },
  {
    id: "ci-cd",
    label: "CI/CD & GitHub Actions",
    icon: IconChecklist,
    description:
      "Continuous Integration runners authenticate via scoped machine keys. Secrets are automatically masked in CI logs to prevent leaks.",
    shellCode: `# GitHub Actions / CI Pipeline Step:
# Use a tightly-scoped machine access key restricted to your environment
click run --access-key="\${{ secrets.CLICK_ACCESS_KEY }}" --env=staging -- npm test

# Export directly into GitHub Actions environment with automatic masking
click export --access-key="\${{ secrets.CLICK_ACCESS_KEY }}" --env=staging --format=.env >> $GITHUB_ENV`,
  },
  {
    id: "ai-agents",
    label: "AI Agents & Autonomous Workers",
    icon: IconRobot,
    description:
      "Autonomous agents and background services receive temporary, time-bound machine tokens with restricted environment scopes.",
    shellCode: `# Grant point-in-time access for autonomous agents
click run --access-key="\${AGENT_TOKEN}" --env=production -- python agent.py

# Machine keys can be revoked instantly from the Cloud Vault without rotating team passkeys.`,
  },
];

export function DemoSection() {
  const [selectedLanguage, setSelectedLanguage] = useState<CodeLanguage>(
    CodeLanguage.Typescript,
  );
  const [activeWorkflowId, setActiveWorkflowId] = useState<string>("local-dev");
  const [copiedCode, setCopiedCode] = useState(false);

  const currentSample =
    LANGUAGE_SAMPLES.find((s) => s.language === selectedLanguage) ??
    LANGUAGE_SAMPLES[0];

  const currentWorkflow =
    CLI_WORKFLOWS.find((w) => w.id === activeWorkflowId) ?? CLI_WORKFLOWS[0];

  const handleCopyCode = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="demo" className="container mx-auto px-4 py-20 sm:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconTerminal2 className="size-4" />
          Zero SDKs · Zero Code Changes
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          If It Reads Environments, It Just Works
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl">
          Click doesn&apos;t force proprietary SDKs or complex wrappers into
          your code. Keep using standard language libraries — Click injects
          decrypted secrets straight into process memory.
        </p>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
        <div className="p-4 rounded-2xl bg-surface/40 border border-border flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <IconCpu className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Zero SDK Lock-In
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Native <code className="text-[11px] font-mono">process.env</code>{" "}
              or <code className="text-[11px] font-mono">os.getenv</code>.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface/40 border border-border flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <IconFingerprint className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Biometric Unlock
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Touch ID or Passkey decrypts secrets in milliseconds.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface/40 border border-border flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <IconShieldCheck className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Zero Disk Residue
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Secrets live strictly in ephemeral RAM, never plain on disk.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-surface/40 border border-border flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
            <IconRobot className="size-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              CI & Agent Scoped
            </h4>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              Masked stdout/stderr logs and environment-scoped keys.
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Demo Container */}
      <div className="max-w-5xl mx-auto rounded-3xl border border-border bg-surface/30 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Code in Your Language */}
          <div className="lg:col-span-6 flex flex-col w-full">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-500">
                  Step 1: Your Application Code
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  Read standard environment variables
                </h3>
              </div>
            </div>

            {/* Language Switcher Tabs */}
            <div className="mb-4 overflow-x-auto pb-1">
              <Tabs
                selectedKey={selectedLanguage}
                onSelectionChange={(key) =>
                  setSelectedLanguage(key as CodeLanguage)
                }
                className="overflow-x-auto"
              >
                <Tabs.ListContainer>
                  <Tabs.List className="gap-1 bg-surface/80 p-1 rounded-xl border border-border">
                    {LANGUAGE_SAMPLES.map((sample) => {
                      const LanguageIcon = CodeLanguageIcon[sample.language];
                      return (
                        <Tabs.Tab
                          className="h-auto py-1 px-2.5 text-xs font-medium gap-1.5 rounded-lg"
                          key={sample.language}
                          id={sample.language}
                        >
                          <LanguageIcon className="size-4" />
                          {sample.language}
                          <Tabs.Indicator className="rounded-md" />
                        </Tabs.Tab>
                      );
                    })}
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
            </div>

            {/* Code Highlighter */}
            <div className="rounded-2xl border border-border overflow-hidden bg-zinc-950 shadow-inner">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                <span>
                  app.
                  {currentSample.language === CodeLanguage.Typescript
                    ? "ts"
                    : currentSample.language === CodeLanguage.Python
                      ? "py"
                      : currentSample.language === CodeLanguage.Golang
                        ? "go"
                        : currentSample.language === CodeLanguage.Rust
                          ? "rs"
                          : currentSample.language === CodeLanguage.CPlusPlus
                            ? "cpp"
                            : "java"}
                </span>
                <span className="text-emerald-400 text-[11px]">
                  No Click imports needed
                </span>
              </div>
              <CodeHighlighter
                code={currentSample.code}
                language={currentSample.language}
                className="text-xs p-4 overflow-x-auto leading-relaxed text-zinc-300 font-mono"
              />
            </div>
          </div>

          {/* Right Column: Just-In-Time Execution & CLI Workflows */}
          <div className="lg:col-span-6 flex flex-col w-full">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider font-bold text-emerald-500">
                  Step 2: Just-In-Time Execution
                </span>
                <h3 className="text-lg font-bold text-foreground">
                  Run with{" "}
                  <code className="text-sm font-mono bg-surface px-1.5 py-0.5 rounded border border-border">
                    click run
                  </code>
                </h3>
              </div>
            </div>

            {/* Workflow Mode Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {CLI_WORKFLOWS.map((wf) => {
                const WfIcon = wf.icon;
                const isActive = activeWorkflowId === wf.id;
                return (
                  <button
                    type="button"
                    key={wf.id}
                    onClick={() => setActiveWorkflowId(wf.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "border-emerald-500 bg-emerald-500/10 text-foreground font-semibold shadow-sm"
                        : "border-border bg-surface/50 text-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    <WfIcon
                      className={`size-3.5 ${isActive ? "text-emerald-500" : "text-muted"}`}
                    />
                    {wf.label}
                  </button>
                );
              })}
            </div>

            {/* Workflow Description */}
            <p className="text-xs text-muted mb-3 leading-relaxed">
              {currentWorkflow.description}
            </p>

            {/* Terminal Runner Box */}
            <div className="rounded-2xl border border-border overflow-hidden bg-zinc-950 shadow-inner">
              <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-red-500/80" />
                  <span className="size-2.5 rounded-full bg-amber-500/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-1 text-[11px] text-zinc-400">
                    Terminal — Just-In-Time Injection
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyCode(currentWorkflow.shellCode)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedCode ? (
                    <>
                      <IconCheck className="size-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <IconCopy className="size-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <CodeHighlighter
                code={currentWorkflow.shellCode}
                language={CodeLanguage.Shell}
                className="text-xs p-4 overflow-x-auto leading-relaxed text-zinc-300 font-mono"
              />
            </div>

            {/* Immediate JIT feedback badge */}
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
              <IconLockOpen className="size-5 text-emerald-500 shrink-0" />
              <div className="text-xs text-foreground">
                <strong className="text-emerald-600 dark:text-emerald-400">
                  Memory-Only Injection:
                </strong>{" "}
                Secrets exist in memory for milliseconds and vanish the instant
                your process terminates.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
