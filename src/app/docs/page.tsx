import { notFound } from "next/navigation";
import { DocRenderer } from "@/components/docs/doc-renderer";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

export const metadata = {
  title: "Getting Started — Click Vault Documentation",
  description:
    "Get started with Click Vault in under 3 minutes. Zero-knowledge secret management with on-device Passkey encryption.",
};

export default function DocsIndexPage() {
  const article = getDocBySlug("getting-started/quickstart");
  const allDocs = getAllDocs();

  if (!article) {
    notFound();
  }

  return <DocRenderer article={article} allDocs={allDocs} />;
}
