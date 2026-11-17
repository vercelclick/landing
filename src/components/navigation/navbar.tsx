"use client";

import { Button, Dropdown, Header, Separator } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import {
  IconBook2,
  IconExternalLink,
  IconMenu2,
  IconVault,
} from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { DropdownItem } from "../dropdown";
import { COMMUNITY_LINKS } from "./links";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <header className="container mx-auto">
        <div className="flex grow h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-[url('/logo.svg')] dark:bg-[url('/logo-dark.svg')] size-8  bg-cover" />
            <span className="text-2xl font-bold dark:text-muted">Vercel</span>
            <span className="text-2xl font-bold text-accent">Click</span>
            <IconVault className="size-7 text-accent" />
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/#demo">
              <Button variant="ghost">Product</Button>
            </Link>
            <Link href="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
            <Link href="/#faq">
              <Button variant="ghost">FAQ</Button>
            </Link>
            <div className="flex items-center gap-2 border-l pl-4">
              <ThemeToggle />
              <a
                target="_blank"
                className={clsx(
                  buttonVariants.base,
                  buttonVariants.variants.variant.primary,
                )}
                href="https://vault.vercel.click"
                rel="noopener noreferrer"
              >
                <IconVault className="size-5" />
                Vault
                <IconExternalLink className="size-4" />
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Dropdown>
              <Button
                type="button"
                variant="ghost"
                className="mr-4"
                isIconOnly
                aria-label="Toggle menu"
              >
                <IconMenu2 className="h-6 w-6" />
              </Button>
              <Dropdown.Popover className="w-sm">
                <Dropdown.Menu>
                  <DropdownItem
                    is_external
                    href="https://vault.vercel.click"
                    Icon={IconVault}
                    label="Vault"
                    capture="vault-interest"
                  />
                  <DropdownItem
                    href="/#demo"
                    Icon={IconBook2}
                    label="Product"
                  />

                  <DropdownItem
                    href="/#features"
                    Icon={IconBook2}
                    label="Features"
                  />
                  <DropdownItem
                    href="/docs"
                    Icon={IconBook2}
                    label="Documentation"
                  />
                  <DropdownItem href="/#faq" Icon={IconBook2} label="FAQ" />
                  <Separator />
                  <Dropdown.Section>
                    <Header>Community</Header>
                    {COMMUNITY_LINKS.map((item) => (
                      <DropdownItem key={item.href} {...item} />
                    ))}
                  </Dropdown.Section>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </header>
    </nav>
  );
}
