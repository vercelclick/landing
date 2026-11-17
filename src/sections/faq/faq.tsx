"use client";

import { useMemo, useState } from "react";
import {
  IconBolt,
  IconBook2,
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandSlack,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconFingerprint,
  IconHelpCircle,
  IconScale,
  IconSearch,
  IconShieldCheck,
  IconSparkles,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import {
  type FaqCategory,
  FAQ_CATEGORIES,
  FAQ_ITEMS,
  type IFaqItem,
} from "./items";

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    new Set(["zero-knowledge-guarantee", "infisical-doppler-comparison"]),
  );
  const [copiedSnippetId, setCopiedSnippetId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetId(id);
    setTimeout(() => setCopiedSnippetId(null), 2000);
  };

  const filteredItems = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.highlights.some((h) => h.toLowerCase().includes(q)) ||
        item.categoryLabel.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="faq" className="container mx-auto px-4 py-20 sm:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
          <IconHelpCircle className="size-4" />
          Technical Knowledge Base &amp; FAQ
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg sm:text-xl text-muted max-w-2xl">
          Everything you need to know about our Zero-Knowledge architecture, Passkey hardware encryption, and how Click compares to traditional secret managers.
        </p>

        {/* Search Bar */}
        <div className="mt-8 relative w-full max-w-md">
          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-muted">
            <IconSearch className="size-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. Passkeys, Infisical, .env, Subpoena)..."
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-surface/70 border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-foreground cursor-pointer"
              aria-label="Clear search"
            >
              <IconX className="size-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? "bg-emerald-500 text-black font-semibold border-emerald-500 shadow-md shadow-emerald-500/10"
                    : "bg-surface/50 border-border text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items Grid / Accordion */}
      <div className="max-w-4xl mx-auto space-y-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-border bg-surface/20">
            <IconSearch className="size-10 text-muted mx-auto mb-3 opacity-40" />
            <h3 className="text-base font-semibold text-foreground">
              No matching questions found
            </h3>
            <p className="text-xs text-muted mt-1">
              Try adjusting your search query or clear the filter to see all questions.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-surface border border-border text-xs font-semibold hover:bg-surface-secondary cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredItems.map((item) => {
            const isExpanded = expandedIds.has(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? "border-emerald-500/40 bg-surface/60 shadow-lg shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                    : "border-border bg-surface/30 hover:border-border/80 hover:bg-surface/40"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(item.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {item.title}
                    </h3>

                    {!isExpanded && (
                      <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-1">
                        {item.summary}
                      </p>
                    )}
                  </div>

                  <div
                    className={`p-2 rounded-xl bg-surface border border-border/80 text-muted transition-transform duration-200 shrink-0 mt-0.5 ${
                      isExpanded ? "rotate-180 text-emerald-500 border-emerald-500/30" : ""
                    }`}
                  >
                    <IconChevronDown className="size-4" />
                  </div>
                </button>

                {/* Expanded Content Panel */}
                {isExpanded && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 border-t border-border/40 space-y-4 text-xs sm:text-sm">
                    {/* Feature Highlight Pill */}
                    {item.featureHighlight && (
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium">
                        <IconSparkles className="size-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-xs">
                          {item.featureHighlight.label}:
                        </span>
                        <span className="text-xs opacity-90">
                          {item.featureHighlight.value}
                        </span>
                      </div>
                    )}

                    {/* Detailed Narrative */}
                    <p className="text-muted leading-relaxed">
                      {item.description}
                    </p>

                    {/* Key Highlights Bullet List */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="p-4 rounded-xl bg-surface/80 border border-border/80">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-foreground mb-2 block">
                          Key Architectural Takeaways:
                        </span>
                        <ul className="space-y-1.5">
                          {item.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2 text-foreground/90 text-xs"
                            >
                              <IconCheck className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Optional Code / Command Snippet */}
                    {item.codeSnippet && (
                      <div className="rounded-xl border border-border/80 bg-zinc-950 overflow-hidden font-mono text-xs">
                        <div className="flex items-center justify-between px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-[11px]">
                          <span>{item.codeSnippet.filename}</span>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopyCode(item.id, item.codeSnippet!.code)
                            }
                            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedSnippetId === item.id ? (
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
                        <pre className="p-3 text-zinc-300 overflow-x-auto leading-relaxed text-[11px]">
                          <code>{item.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Still Have Questions Help Card */}
      <div className="mt-16 max-w-4xl mx-auto rounded-3xl border border-border bg-gradient-to-r from-surface/80 via-surface/40 to-surface/80 p-8 text-center backdrop-blur-md">
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 inline-flex mb-4">
          <IconHelpCircle className="size-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
          Still have questions about our cryptography or deployment?
        </h3>
        <p className="mt-2 text-sm text-muted max-w-xl mx-auto">
          Our engineering team is active in our community channels and ready to answer deep technical questions about WebAuthn PRF, enterprise compliance, and migration from Doppler or Infisical.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://vercel.click/l/s/slack"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border hover:bg-surface-secondary text-foreground text-xs font-semibold transition-colors cursor-pointer"
          >
            <IconBrandSlack className="size-4 text-emerald-500" />
            Join our Slack
          </a>

          <a
            href="https://vercel.click/l/s/discord"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface border border-border hover:bg-surface-secondary text-foreground text-xs font-semibold transition-colors cursor-pointer"
          >
            <IconBrandDiscord className="size-4 text-indigo-400" />
            Join our Discord
          </a>

          <a
            href="https://vercel.click/l/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            <IconBook2 className="size-4" />
            Browse Technical Docs &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
