import fs from "node:fs";
import path from "node:path";
import { micromark } from "micromark";

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

const DOCS_DIR = path.join(process.cwd(), "content", "docs");

// Static catalog of documents with their file paths
const STATIC_DOCS_MANIFEST: {
  categoryPath: string;
  filename: string;
  slug: string;
}[] = [
  {
    categoryPath: "getting-started",
    filename: "quickstart.md",
    slug: "getting-started/quickstart",
  },
  {
    categoryPath: "getting-started",
    filename: "architecture.md",
    slug: "getting-started/architecture",
  },
  {
    categoryPath: "core-concepts",
    filename: "passkeys.md",
    slug: "core-concepts/passkeys",
  },
  {
    categoryPath: "core-concepts",
    filename: "jit-injection.md",
    slug: "core-concepts/jit-injection",
  },
  {
    categoryPath: "storage",
    filename: "gitops-local.md",
    slug: "storage/gitops-local",
  },
  {
    categoryPath: "storage",
    filename: "cloud-vault.md",
    slug: "storage/cloud-vault",
  },
  {
    categoryPath: "automation",
    filename: "ci-cd.md",
    slug: "automation/ci-cd",
  },
  {
    categoryPath: "cli",
    filename: "commands.md",
    slug: "cli/commands",
  },
];

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
    const filePath = path.join(DOCS_DIR, item.categoryPath, item.filename);
    try {
      if (fs.existsSync(filePath)) {
        const rawContent = fs.readFileSync(filePath, "utf-8");
        const { data } = parseFrontmatter(rawContent);

        docs.push({
          slug: item.slug,
          title: (data.title as string) || item.filename.replace(".md", ""),
          description: (data.description as string) || "",
          category: (data.category as string) || item.categoryPath,
          order: typeof data.order === "number" ? data.order : 99,
        });
      }
    } catch (err) {
      console.error(`Failed reading doc ${filePath}`, err);
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

export function getDocBySlug(slugPath: string): DocArticle | null {
  const normalizedSlug = slugPath.replace(/^\/+|\/+$/g, "");
  const manifestItem = STATIC_DOCS_MANIFEST.find(
    (m) => m.slug === normalizedSlug,
  );

  if (!manifestItem) {
    return null;
  }

  const filePath = path.join(
    DOCS_DIR,
    manifestItem.categoryPath,
    manifestItem.filename,
  );

  try {
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const { data, body } = parseFrontmatter(rawContent);
    const htmlContent = micromark(body);

    return {
      slug: manifestItem.slug,
      title: (data.title as string) || manifestItem.filename.replace(".md", ""),
      description: (data.description as string) || "",
      category: (data.category as string) || manifestItem.categoryPath,
      order: typeof data.order === "number" ? data.order : 99,
      content: htmlContent,
      rawMarkdown: body,
    };
  } catch (err) {
    console.error(`Error loading doc ${normalizedSlug}`, err);
    return null;
  }
}
