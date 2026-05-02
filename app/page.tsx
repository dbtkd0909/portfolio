import Hero from "@/components/Hero";
import PortfolioGrid from "@/components/PortfolioGrid";
import NukePlugins from "@/components/NukePlugins";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <PortfolioGrid />
      <NukePlugins />
      <Footer />
    </main>
  );
}
