"use client";

import {
  Button,
  Dropdown,
  Header,
  IconChevronDown,
  Separator,
} from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { IconExternalLink, IconMenu2, IconVault } from "@tabler/icons-react";
import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { DropdownItem, type DropdownItemProps } from "../dropdown";
import { COMMUNITY_LINKS, RESOURCES_LINKS } from "./links";

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
            <Link href="#features">
              <Button variant="ghost">Features</Button>
            </Link>
            <LinkDropDown items={COMMUNITY_LINKS} label="Community" />
            <LinkDropDown items={RESOURCES_LINKS} label="Resources" />
            <Link href="#faq">
              <Button variant="ghost">FAQ</Button>
            </Link>
            <div className="flex items-center gap-2 border-l pl-4">
              <ThemeToggle />
              <Link
                target="_blank"
                className={clsx(
                  buttonVariants.base,
                  buttonVariants.variants.variant.primary,
                )}
                href="https://vault.vercel.click"
              >
                <IconVault className="size-5" />
                Vault
                <IconExternalLink className="size-4" />
              </Link>
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
                  <Separator />
                  <Dropdown.Section>
                    <Header>Community</Header>
                    {COMMUNITY_LINKS.map((item) => (
                      <DropdownItem key={item.href} {...item} />
                    ))}
                  </Dropdown.Section>
                  <Dropdown.Section>
                    <Header>Resources</Header>
                    {RESOURCES_LINKS.map((item) => (
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

function LinkDropDown({
  items,
  label,
}: {
  items: DropdownItemProps[];
  label: ReactNode;
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div className="button button--md button--ghost w-full md:w-auto justify-start">
          {label}
          <IconChevronDown />
        </div>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          {items.map((item) => (
            <DropdownItem key={item.href} {...item} />
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
