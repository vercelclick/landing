import type { ReactNode } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsSidebar } from "@/components/docs/sidebar";
import { Footer } from "@/components/navigation/footer";
import { getDocsNavigation } from "@/lib/docs";

export const metadata = {
  title: "Documentation — Click Vault",
  description:
    "Developer documentation for Click Vault: Zero-knowledge secret management with on-device Passkey encryption and Just-In-Time injection.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  const navigation = getDocsNavigation();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background">
      <DocsHeader />

      <div className="container mx-auto px-4 flex-1 flex flex-col lg:flex-row gap-8 items-start py-8">
        <DocsSidebar navigation={navigation} />

        <main className="flex-1 w-full max-w-4xl min-w-0">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
