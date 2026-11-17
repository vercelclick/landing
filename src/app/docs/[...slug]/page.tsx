import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocRenderer } from "@/components/docs/doc-renderer";
import { getAllDocs, getDocBySlug } from "@/lib/docs";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const article = getDocBySlug(slugPath);

  if (!article) {
    return {
      title: "Document Not Found — Click Vault Docs",
    };
  }

  return {
    title: `${article.title} — Click Vault Documentation`,
    description: article.description,
  };
}

export default async function DocArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const article = getDocBySlug(slugPath);
  const allDocs = getAllDocs();

  if (!article) {
    notFound();
  }

  return <DocRenderer article={article} allDocs={allDocs} />;
}
