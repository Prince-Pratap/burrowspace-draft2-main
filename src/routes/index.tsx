import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import GlobeHero from "@/components/GlobeHero";
import BurrowSpaceInAction from "@/components/BurrowSpaceInAction";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import Loader, { useFirstLoadCheck } from "@/components/Loader";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BurrowSpace — Zero Compromise On Privacy" },
      { name: "description", content: "BurrowSpace delivers end-to-end encrypted privacy solutions with AES-256 encryption and zero third-party access." },
      { property: "og:title", content: "BurrowSpace — Zero Compromise On Privacy" },
      { property: "og:description", content: "End-to-end encrypted privacy. 100% data ownership. Zero compromise." },
    ],
  }),
  component: Index,
});

function Index() {
  const { showLoader, completeLoader } = useFirstLoadCheck();

  return (
    <>
      {showLoader && <Loader onComplete={completeLoader} />}
      <Navbar />
      <main className="min-h-screen overflow-hidden">
        <GlobeHero />

        {/* Tagline divider */}
        <section className="bg-[oklch(0.08_0.02_260)] text-center px-6">
          <p className="font-heading text-2xl font-bold text-white/90 md:text-3xl">
            We secure <span className="text-brand">each other</span>.
          </p>
          <p className="mt-3 text-sm text-white/50 max-w-lg mx-auto">
            The server will be amongst YOU people only!
          </p>
        </section>

        <FeaturesSection />
        <BurrowSpaceInAction />
      </main>
      <Footer />
    </>
  );
}
