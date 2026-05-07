import { useState, useEffect, useCallback } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    label: "ENCRYPTION",
    title: "Zero Compromise",
    titleBold: "On Privacy",
  },
  {
    image: hero2,
    label: "SECURITY",
    title: "Data Freedom",
    titleBold: "Redefined",
  },
  {
    image: hero3,
    label: "SOVEREIGNTY",
    title: "Your Device",
    titleBold: "Your Rules",
  },
];

// const stats = [
//   { value: "100%", label: "DATA OWNERSHIP" },
//   { value: "0", label: "THIRD-PARTY ACCESS" },
//   { value: "AES-256", label: "ENCRYPTION" },
// ];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning || idx === current) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(idx);
        setIsTransitioning(false);
      }, 600);
    },
    [current, isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end px-8 pb-16 lg:px-16">
        <div className="mb-16">
          <p
            className="mb-4 text-xs font-medium tracking-[0.3em] text-hero-accent"
            key={`label-${current}`}
          >
            {slides[current].label}
          </p>
          <h1 className="font-heading text-5xl font-light leading-[1.1] text-hero-text md:text-7xl lg:text-8xl">
            {slides[current].title}
            <br />
            <span className="font-semibold">{slides[current].titleBold}</span>
          </h1>

          <button className="mt-10 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-hero-text/80 transition-colors hover:text-hero-text">
            DISCOVER
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-hero-text/40">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats bar */}
        <div className="flex items-end justify-between">
          {/* <div className="flex gap-16">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-hero-text md:text-3xl">{s.value}</p>
                <p className="mt-1 text-[10px] tracking-[0.2em] text-hero-text/60">{s.label}</p>
              </div>
            ))}
          </div> */}

          {/* Slide indicators */}
          <div className="hidden flex-col items-center gap-2 lg:flex">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-0.5 transition-all duration-300 ${
                  i === current ? "w-8 bg-hero-text" : "w-5 bg-hero-text/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
