"use client";

import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconSparkles,
} from "@tabler/icons-react";
import type { DocArticle, DocMetadata } from "@/lib/docs";

interface DocRendererProps {
  article: DocArticle;
  allDocs: DocMetadata[];
}

export function DocRenderer({ article, allDocs }: DocRendererProps) {
  const currentIndex = allDocs.findIndex((d) => d.slug === article.slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc =
    currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  return (
    <article className="w-full">
      {/* Breadcrumb Header */}
      <div className="flex items-center gap-2 text-xs font-mono text-muted mb-4">
        <Link href="/docs" className="hover:text-foreground transition-colors">
          Docs
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">
          {article.category}
        </span>
        <span>/</span>
        <span className="text-emerald-500 font-bold">{article.title}</span>
      </div>

      {/* Article Header */}
      <header className="pb-6 mb-8 border-b border-border">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-3">
          <IconSparkles className="size-3.5" />
          {article.category}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
          {article.title}
        </h1>
        {article.description && (
          <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
            {article.description}
          </p>
        )}
      </header>

      {/* Rendered Markdown Body */}
      <div
        className="docs-prose max-w-none text-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Previous / Next Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
        {prevDoc ? (
          <Link
            href={`/docs/${prevDoc.slug}`}
            className="group flex flex-col p-4 rounded-2xl border border-border bg-surface/30 hover:bg-surface hover:border-emerald-500/40 transition-all text-left"
          >
            <div className="flex items-center gap-1 text-xs text-muted mb-1 group-hover:text-emerald-500 transition-colors">
              <IconArrowLeft className="size-3" />
              <span>Previous Article</span>
            </div>
            <span className="text-sm font-bold text-foreground line-clamp-1">
              {prevDoc.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {nextDoc && (
          <Link
            href={`/docs/${nextDoc.slug}`}
            className="group flex flex-col p-4 rounded-2xl border border-border bg-surface/30 hover:bg-surface hover:border-emerald-500/40 transition-all text-right sm:text-right"
          >
            <div className="flex items-center justify-end gap-1 text-xs text-muted mb-1 group-hover:text-emerald-500 transition-colors">
              <span>Next Article</span>
              <IconArrowRight className="size-3" />
            </div>
            <span className="text-sm font-bold text-foreground line-clamp-1">
              {nextDoc.title}
            </span>
          </Link>
        )}
      </div>

      {/* Edit on GitHub & Community Assistance Box */}
      <div className="mt-8 p-4 rounded-xl bg-surface/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <span>Found an issue or want to contribute to our documentation?</span>
        <a
          href="https://github.com/vercelclick"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-semibold text-foreground hover:text-emerald-500 transition-colors"
        >
          View source on GitHub <IconExternalLink className="size-3.5" />
        </a>
      </div>
    </article>
  );
}
