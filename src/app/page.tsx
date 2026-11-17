import { Footer, Navbar } from "@/components/navigation";
import { ArchitectureSection } from "@/sections/architecture";
import { ComparisonSection } from "@/sections/comparison";
import { DemoSection } from "@/sections/demo";
import { FAQSection } from "@/sections/faq";
import { FeaturesSection } from "@/sections/features/features";
import { HeroSection } from "@/sections/hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="mx-auto w-full">
        <HeroSection />
        <ArchitectureSection />
        <FeaturesSection />
        <ComparisonSection />
        <DemoSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
