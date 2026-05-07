import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { type FAQ, CATEGORIES, fetchFaqs, searchFaqs } from "@/lib/fakeApi";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — BurrowSpace" },
      { name: "description", content: "Frequently asked questions about BurrowSpace — sovereign, India-built data security." },
      { property: "og:title", content: "FAQs — BurrowSpace" },
      { property: "og:description", content: "Everything you wanted to know about BurrowSpace's privacy-first infrastructure." },
    ],
  }),
  component: FAQsPage,
});


function FAQItem({ faq, index, isOpen, onToggle }: { faq: FAQ; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="group">
      <button
        onClick={onToggle}
        className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left backdrop-blur-md transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06] md:px-8 md:py-6 ${
          isOpen ? "border-white/40 bg-white/[0.07]" : ""
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.08), transparent 40%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="font-heading text-base font-semibold text-white md:text-lg">
              {faq.q}
            </h3>
          </div>
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-all duration-500 ${
              isOpen ? "rotate-45 border-white/60 bg-white/10" : ""
            }`}
          >
            <span className="text-lg leading-none text-white/80">+</span>
          </div>
        </div>

        <div
          className={`grid transition-all duration-500 ease-out ${
            isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="ml-10 border-l border-white/15 pl-6 text-sm leading-relaxed text-white/75 md:text-base">
              {faq.a}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

function FAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [displayedFaqs, setDisplayedFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    let active = true;
    const loadFaqs = async () => {
      setFaqLoading(true);
      const results = await fetchFaqs();
      if (!active) return;
      setFaqs(results);
      setDisplayedFaqs(results);
      setFaqLoading(false);
      setSearching(false);
    };

    loadFaqs();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    if (faqLoading) return;

    setSearching(true);
    searchFaqs(query, filter).then((results) => {
      if (!active) return;
      setDisplayedFaqs(results);
      setOpenIdx(null);
      setSearching(false);
    });

    return () => {
      active = false;
    };
  }, [query, filter, faqLoading]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const filtered = displayedFaqs;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[oklch(0.08_0.02_260)] text-white">
      {/* Page-wide background — matches the GlobeHero feel */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, oklch(0.55 0.18 255 / 0.18) 0%, transparent 60%)",
            transform: `translate(${(mouse.x - 0.5) * 40}px, ${(mouse.y - 0.5) * 40}px)`,
            transition: "transform 0.7s ease-out",
          }}
        />
        <div
          className="absolute h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{
            background: "radial-gradient(circle, oklch(0.55 0.18 255 / 0.35), transparent 60%)",
            transform: `translate(${(mouse.x - 0.5) * 80}px, ${(mouse.y - 0.5) * 80}px)`,
            top: "8%",
            left: "8%",
            transition: "transform 0.7s ease-out",
          }}
        />
      </div>

      <div className="relative z-10">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center px-6 pt-32"
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.4em] text-white/60">
            FAQs
          </p>
          <h1 className="mb-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Questions,
            <br />
            <span className="italic text-white/70" style={{ fontFamily: "Georgia, serif" }}>
              answered.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/70 md:text-lg">
            Everything you need to know about BurrowSpace.
          </p>

          {/* Search */}
          <div className="mx-auto mt-10 max-w-xl">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 pr-14 text-sm text-white placeholder:text-white/40 backdrop-blur-md outline-none transition-all duration-300 focus:border-white/50 focus:bg-white/[0.08]"
              />
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/50">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-6 pb-8 pt-4">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-5 py-2 text-xs font-semibold tracking-[0.15em] transition-all duration-300 ${
                filter === cat
                  ? "border-brand bg-brand text-white"
                  : "border-white/15 bg-white/[0.03] text-white/70 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ list */}
      <section className="px-6 pb-32">
        <div className="mx-auto max-w-3xl space-y-3">
          {faqLoading || searching ? (
            <>
              <div className="flex items-center justify-center gap-3 py-10 text-sm text-white/50">
                <div className="h-4 w-4 rounded-full border-2 border-white/40 border-t-transparent animate-spin" />
                <span>{faqLoading ? "Loading FAQs…" : "Searching FAQs…"}</span>
              </div>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 backdrop-blur-md">
                  <div className="mb-4 h-5 w-2/3 rounded-full bg-white/10" />
                  <div className="h-3 w-full rounded-full bg-white/5" />
                  <div className="mt-3 h-3 w-[90%] rounded-full bg-white/5" />
                  <div className="mt-2 h-3 w-[75%] rounded-full bg-white/5" />
                </div>
              ))}
            </>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-white/50">
              No questions match your search. Try a different keyword.
            </div>
          ) : (
            filtered.map((faq, i) => (
              <FAQItem
                key={faq.q}
                faq={faq}
                index={i}
                isOpen={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))
          )}
        </div>


        {/* Still have questions CTA */}
        <div className="mx-auto mt-24 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-10 text-center backdrop-blur-md md:p-16">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
            <div className="relative">
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-white/60">
                STILL CURIOUS?
              </p>
              <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">
                We'd love to hear from you.
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-white/70">
                Reach out — a real human from our team will get back to you, not a chatbot.
              </p>
              <Link
                to="/contactus"
                className="inline-flex rounded-none border border-white px-8 py-3 text-xs font-semibold tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-background"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      </div>
      <Footer />
    </main>
  );
}
