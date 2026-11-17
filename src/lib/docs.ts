import { micromark } from "micromark";
import manifest from "../../content/docs-manifest.json";
import { docsContent } from "./generated-docs";

export interface DocMetadata {
  slug: string; // e.g. "getting-started/quickstart"
  title: string;
  description: string;
  category: string;
  order: number;
}

export interface DocArticle extends DocMetadata {
  content: string; // HTML string
  rawMarkdown: string;
}

export interface DocsCategoryGroup {
  name: string;
  items: DocMetadata[];
}

const STATIC_DOCS_MANIFEST = manifest;

function parseFrontmatter(rawContent: string): {
  data: Record<string, string | number>;
  body: string;
} {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: rawContent };
  }

  const yamlBlock = match[1];
  const body = match[2];
  const data: Record<string, string | number> = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIndex = line.indexOf(":");
    if (colonIndex > -1) {
      const key = line.slice(0, colonIndex).trim();
      let val = line.slice(colonIndex + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      data[key] = isNaN(Number(val)) ? val : Number(val);
    }
  }

  return { data, body };
}

export function getAllDocs(): DocMetadata[] {
  const docs: DocMetadata[] = [];

  for (const item of STATIC_DOCS_MANIFEST) {
    const rawContent = docsContent[item.slug];
    if (rawContent) {
      const { data } = parseFrontmatter(rawContent);

      docs.push({
        slug: item.slug,
        title: (data.title as string) || item.filename.replace(".md", ""),
        description: (data.description as string) || "",
        category: (data.category as string) || item.categoryPath,
        order: typeof data.order === "number" ? data.order : 99,
      });
    }
  }

  return docs.sort((a, b) => a.order - b.order);
}

export function getDocsNavigation(): DocsCategoryGroup[] {
  const docs = getAllDocs();
  const groupsMap = new Map<string, DocMetadata[]>();

  for (const doc of docs) {
    if (!groupsMap.has(doc.category)) {
      groupsMap.set(doc.category, []);
    }
    groupsMap.get(doc.category)!.push(doc);
  }

  return Array.from(groupsMap.entries()).map(([name, items]) => ({
    name,
    items: items.sort((a, b) => a.order - b.order),
  }));
}

function parseInlineMarkdown(raw: string): string {
  let text = raw.replace(/\\\|/g, "|");
  // escape angle brackets so placeholders like <ENV> don't get eaten as unknown HTML tags
  text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  // markdown links [label](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2">$1</a>`);
  // inline code `code`
  text = text.replace(/`([^`]+)`/g, `<code>$1</code>`);
  // bold **text**
  text = text.replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`);
  // italic *text*
  text = text.replace(/\*([^*]+)\*/g, `<em>$1</em>`);
  return text;
}

export function processMarkdownTables(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let i = 0;

  const delimiterRegex = /^\|?(\s*:?-{1,}:?\s*\|)+\s*:?-{1,}:?\s*\|?$/;

  while (i < lines.length) {
    const line = lines[i];
    if (
      line.trim().startsWith("|") &&
      i + 1 < lines.length &&
      delimiterRegex.test(lines[i + 1].trim())
    ) {
      const headerLine = line.trim();
      const delimiterLine = lines[i + 1].trim();

      const parseCells = (row: string) =>
        row
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split(/(?<!\\)\|/)
          .map((c) => c.trim());

      const headers = parseCells(headerLine);
      const delimiters = parseCells(delimiterLine);

      const alignments = delimiters.map((d) => {
        if (d.startsWith(":") && d.endsWith(":")) return "center";
        if (d.endsWith(":")) return "right";
        return "left";
      });

      const bodyRows: string[][] = [];
      i += 2;
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const rowCells = parseCells(lines[i].trim());
        bodyRows.push(rowCells);
        i++;
      }

      let tableHtml = `<div class="overflow-x-auto my-6"><table class="docs-table">\n<thead>\n<tr>\n`;
      headers.forEach((h, idx) => {
        const align = alignments[idx] || "left";
        tableHtml += `<th style="text-align: ${align}">${parseInlineMarkdown(h)}</th>\n`;
      });
      tableHtml += `</tr>\n</thead>\n<tbody>\n`;

      bodyRows.forEach((row) => {
        tableHtml += `<tr>\n`;
        row.forEach((cell, idx) => {
          const align = alignments[idx] || "left";
          tableHtml += `<td style="text-align: ${align}">${parseInlineMarkdown(cell)}</td>\n`;
        });
        tableHtml += `</tr>\n`;
      });

      tableHtml += `</tbody>\n</table></div>\n`;
      output.push(tableHtml);
    } else {
      output.push(line);
      i++;
    }
  }

  return output.join("\n");
}

export function getDocBySlug(slugPath: string): DocArticle | null {
  const normalizedSlug = slugPath.replace(/^\/+|\/+$/g, "");
  const manifestItem = STATIC_DOCS_MANIFEST.find(
    (m) => m.slug === normalizedSlug,
  );

  if (!manifestItem) {
    return null;
  }

  const rawContent = docsContent[manifestItem.slug];
  if (!rawContent) {
    return null;
  }

  const { data, body } = parseFrontmatter(rawContent);
  const processedBody = processMarkdownTables(body);
  const htmlContent = micromark(processedBody, { allowDangerousHtml: true });

  return {
    slug: manifestItem.slug,
    title: (data.title as string) || manifestItem.filename.replace(".md", ""),
    description: (data.description as string) || "",
    category: (data.category as string) || manifestItem.categoryPath,
    order: typeof data.order === "number" ? data.order : 99,
    content: htmlContent,
    rawMarkdown: body,
  };
}
