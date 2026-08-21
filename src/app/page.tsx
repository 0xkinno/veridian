import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PromiseGraphSection } from "@/components/PromiseGraphSection";
import { SignatureDemoSection } from "@/components/SignatureDemoSection";
import { ConsolePreviewSection } from "@/components/ConsolePreviewSection";
import { AdversarialSection } from "@/components/AdversarialSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0b0f12] text-[#f0f4f2]">
      <Navbar />
      <Hero />
      <PromiseGraphSection />
      <SignatureDemoSection />
      <ConsolePreviewSection />
      <AdversarialSection />
      <Footer />
    </div>
  );
}
