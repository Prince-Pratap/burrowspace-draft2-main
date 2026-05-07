import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type React from "react";
import Navbar from "@/components/Navbar";
import { useInView } from "@/hooks/use-scroll";
import aimImg from "@/assets/about-aim.jpg";
import visionImg from "@/assets/about-vision.jpg";
import motiveImg from "@/assets/about-motive.jpg";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — BurrowSpace" },
      { name: "description", content: "Learn about BurrowSpace's mission to redefine digital privacy with sovereign, India-built infrastructure." },
      { property: "og:title", content: "About Us — BurrowSpace" },
      { property: "og:description", content: "Our mission: privacy without compromise, built in India, for the world." },
    ],
  }),
  component: AboutPage,
});

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ImageSection({
  image,
  label,
  title,
  children,
  reverse = false,
}: {
  image: string;
  label: string;
  title: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`flex flex-col gap-8 md:gap-16 ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-center`}
    >
      <div
        className={`w-full md:w-1/2 overflow-hidden rounded-2xl transition-all duration-1000 ${
          inView ? "translate-x-0 opacity-100 scale-100" : (reverse ? "translate-x-16" : "-translate-x-16") + " opacity-0 scale-95"
        }`}
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-64 w-full object-cover md:h-80 hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div
        className={`w-full md:w-1/2 transition-all duration-1000 delay-200 ${
          inView ? "translate-x-0 opacity-100" : (reverse ? "-translate-x-16" : "translate-x-16") + " opacity-0"
        }`}
      >
        <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-brand">{label}</p>
        <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">{title}</h2>
        <div className="text-base leading-relaxed text-white/75 md:text-lg">{children}</div>
      </div>
    </div>
  );
}

function PlaceholderSection({ label }: { label: string }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-dashed border-brand/20 bg-section-bg p-12 md:p-20 text-center">
        <p className="mb-2 text-xs font-semibold tracking-[0.3em] text-brand">{label}</p>
        <p className="text-lg text-muted-foreground italic">Coming soon...</p>
        <div className="mx-auto mt-4 h-px w-24 bg-brand/20" />
      </div>
    </div>
  );
}

function FounderQuoteCard({ quote, name, role, delay = "", reverse = false }: { quote: string; name: string; role: string; delay?: string; reverse?: boolean }) {
  return (
    <RevealSection className={delay}>
      <div className={`flex flex-col gap-8 rounded-2xl border border-section-border bg-section-bg/60 p-8 backdrop-blur-xl md:p-12 ${reverse ? "md:flex-row-reverse" : "md:flex-row"} md:items-center`}>
        {/* Photo placeholder */}
        <div className="flex-shrink-0">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-brand/30 bg-gradient-to-br from-brand/10 to-section-bg md:h-48 md:w-48">
            <div className="flex h-full w-full items-center justify-center">
              <svg className="h-16 w-16 text-brand/30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.2em] text-muted-foreground/50">PHOTO</p>
          </div>
        </div>
        {/* Quote */}
        <div className="flex-1">
          <svg className="mb-4 h-8 w-8 text-brand/40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-lg font-light italic text-white/60 md:text-xl">{quote}</p>
          <div className="mt-5 h-px w-12 bg-brand/30" />
          <p className="mt-3 text-sm font-semibold text-white/80">{name}</p>
          <p className="text-xs tracking-[0.15em] text-white/50">{role}</p>
        </div>
      </div>
    </RevealSection>
  );
}

function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen overflow-hidden bg-[oklch(0.08_0.02_260)] text-white">
        {/* Header */}
        <section className="px-8 pt-32 pb-20 text-center lg:px-16">
          <RevealSection>
            <h1 className="font-heading text-5xl font-light text-white md:text-7xl">
              About <span className="font-semibold">BurrowSpace</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Redefining digital privacy from India, for the world.
            </p>
            <div className="mx-auto mt-6 h-px w-24 bg-brand/30" />
          </RevealSection>
        </section>

        {/* AIM */}
        <section className="px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <ImageSection image={aimImg} label="AIM" title="Privacy Is a Promise, Not a Myth">
              <p>
                Privacy was never a privilege — it&apos;s a fundamental right. At BurrowSpace, we exist to ensure that
                every byte of your data remains truly yours. In a world where surveillance has become the norm, we&apos;re
                building the tools that make privacy not just possible, but effortless.
              </p>
              <p className="mt-4 font-semibold text-brand">
                Privacy is no longer a myth — it&apos;s a promise we deliver.
              </p>
            </ImageSection>
          </div>
        </section>

        {/* VISION */}
        <section className="px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <ImageSection image={visionImg} label="VISION" title="Sovereign Infrastructure, Built in India" reverse>
              <p>
                Born in India, engineered for sovereignty. BurrowSpace is building a future where your digital
                infrastructure isn&apos;t dependent on foreign servers or overseas corporations. We believe that true
                data independence means owning the entire stack — from encryption to infrastructure — right here
                on Indian soil.
              </p>
              <p className="mt-4 font-semibold text-brand">
                Made in India. Controlled by you. Dependent on no one.
              </p>
            </ImageSection>
          </div>
        </section>

        {/* MOTIVE */}
        <section className="px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <ImageSection image={motiveImg} label="MOTIVE" title="Own Your Digital Narrative">
              <p>
                Every click, every message, every file — they tell the story of who you are. Our motive is simple:
                give people the power to own their digital narrative. We build encryption-first products that put
                the user back in the driver&apos;s seat, stripping away the surveillance economy one layer at a time.
              </p>
            </ImageSection>
          </div>
        </section>

        {/* Founder's Quotes */}
        <section className="px-8 py-20 lg:px-16">
          <div className="mx-auto max-w-6xl">
            <RevealSection>
              <p className="mb-10 text-center text-xs font-semibold tracking-[0.4em] text-brand">FOUNDERS&apos; QUOTES</p>
            </RevealSection>
            <div className="flex flex-col gap-10">
              <FounderQuoteCard
                quote="Quote to be added..."
                name="Founder 1"
                role="CO-FOUNDER, BURROWSPACE"
                delay="delay-100"
              />
              <FounderQuoteCard
                quote="Quote to be added..."
                name="Founder 2"
                role="CO-FOUNDER, BURROWSPACE"
                delay="delay-200"
                reverse
              />
            </div>
          </div>
        </section>

        {/* Impact sections */}
        <section className="px-8 py-16 lg:px-16">
          <div className="mx-auto max-w-6xl space-y-12">
            <PlaceholderSection label="IMPACT ON D2C" />
            <PlaceholderSection label="IMPACT ON B2B" />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
