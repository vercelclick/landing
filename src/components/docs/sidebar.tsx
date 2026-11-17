"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconBook2,
  IconChevronRight,
  IconCpu,
  IconFingerprint,
  IconGitBranch,
  IconMenu2,
  IconRobot,
  IconSearch,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react";
import type { DocsCategoryGroup } from "@/lib/docs";

interface DocsSidebarProps {
  navigation: DocsCategoryGroup[];
}

const CATEGORY_ICONS: Record<string, typeof IconBook2> = {
  "Getting Started": IconBook2,
  "Core Concepts": IconFingerprint,
  "Storage Models": IconGitBranch,
  "Automation & AI": IconRobot,
  "CLI Reference": IconTerminal2,
};

export function DocsSidebar({ navigation }: DocsSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const filteredNavigation = navigation
    .map((group) => {
      const q = searchFilter.toLowerCase().trim();
      if (!q) return group;
      const filteredItems = group.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group) => group.items.length > 0);

  return (
    <>
      {/* Mobile Sticky Subheader with Menu Toggle */}
      <div className="lg:hidden sticky top-16 z-30 flex items-center justify-between px-4 py-2.5 bg-background/95 backdrop-blur border-b border-border">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-surface border border-border cursor-pointer hover:bg-surface-secondary"
        >
          <IconMenu2 className="size-4" />
          <span>Documentation Menu</span>
        </button>

        <span className="text-xs font-mono text-muted">Click Vault Docs</span>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Content (Desktop Sticky, Mobile Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-background border-r border-border p-5 flex flex-col transition-transform duration-300 lg:static lg:z-0 lg:w-72 lg:translate-x-0 lg:block lg:min-h-[calc(100vh-4rem)] ${
          mobileOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Drawer Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-border lg:hidden">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-foreground">
              Click Docs
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-muted hover:text-foreground cursor-pointer"
          >
            <IconX className="size-5" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted">
            <IconSearch className="size-3.5" />
          </div>
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Filter documentation..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-surface/70 border border-border text-xs placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 overflow-y-auto space-y-6 pr-1">
          {filteredNavigation.map((group) => {
            const Icon = CATEGORY_ICONS[group.name] || IconBook2;
            return (
              <div key={group.name} className="space-y-2">
                <div className="flex items-center gap-2 px-2 text-xs font-mono font-bold uppercase tracking-wider text-muted">
                  <Icon className="size-3.5 text-emerald-500" />
                  <span>{group.name}</span>
                </div>

                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const itemPath = `/docs/${item.slug}`;
                    const isActive =
                      pathname === itemPath ||
                      (item.slug === "getting-started/quickstart" &&
                        pathname === "/docs");

                    return (
                      <li key={item.slug}>
                        <Link
                          href={itemPath}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                            isActive
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30"
                              : "text-muted hover:text-foreground hover:bg-surface"
                          }`}
                        >
                          <span className="truncate">{item.title}</span>
                          {isActive && (
                            <IconChevronRight className="size-3.5 text-emerald-500 shrink-0 ml-1" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {/* Bottom Help Box */}
        <div className="pt-4 mt-4 border-t border-border">
          <div className="p-3 rounded-xl bg-surface/50 border border-border text-xs">
            <span className="font-semibold text-foreground block mb-1">
              Need assistance?
            </span>
            <p className="text-[11px] text-muted mb-2">
              Reach out directly to the core engineering team.
            </p>
            <a
              href="mailto:support@vercel.click"
              className="text-emerald-500 hover:underline font-mono text-[11px]"
            >
              support@vercel.click
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
