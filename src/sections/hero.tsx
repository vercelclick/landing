"use client";
import { buttonVariants, Chip } from "@heroui/react";
import {
  IconBook2,
  IconBrandGithub,
  IconExternalLink,
  IconVault,
} from "@tabler/icons-react";
import clsx from "clsx";

export function HeroSection() {
  return (
    <section id="hero">
      <div className="container mx-auto relative flex flex-col items-center pt-24 pb-12 text-center md:pt-32 md:pb-16">
        <a
          href="https://github.com/vercelclick"
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4"
        >
          <Chip color="success">
            <IconBrandGithub className="size-3.5 text-primary" />
            <Chip.Label className="font-semibold">
              Transparent Source Code; Business Source License 1.1
            </Chip.Label>
          </Chip>
        </a>

        <h1 className="text-4xl text-accent dark:text-muted">
          Zero-knowledge Vault, Centralized Secrets, Human or AI,
        </h1>
        <h2 className="text-3xl text-accent dark:text-muted mt-4">
          Locked behind your Fingerprint.
        </h2>

        <p className="mt-6 max-w-4xl text-xl text-muted sm:text-2xl">
          Click uses passkeys to encrypt and decrypt secrets on your device
          offering a Just In Time secret injection model. Encrypted secrets are
          stored in your codebase or on a our hosted vault service.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            className={clsx(
              buttonVariants.base,
              buttonVariants.variants.variant.primary,
              buttonVariants.variants.size.lg,
            )}
            href="https://vault.vercel.click"
          >
            <IconVault className="size-5" />
            Go to Vault
            <IconExternalLink className="ml-2 h-4 w-4" />
          </a>

          <a
            href="https://github.com/vercelclick/cli/releases"
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              buttonVariants.base,
              buttonVariants.variants.variant.outline,
              buttonVariants.variants.size.lg,
            )}
          >
            <IconBook2 className="mr-2 h-4 w-4" />
            Read the docs
          </a>
        </div>
        <p className="my-6 font-mono text-xs text-muted [animation-delay:400ms]">
          Multi-User · No Secret Zero · Local Storage
        </p>
      </div>
    </section>
  );
}
