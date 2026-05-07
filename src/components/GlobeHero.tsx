import { useScrollProgress } from "@/hooks/use-scroll";
import { useInView } from "@/hooks/use-scroll";
import earthImg from "@/assets/earth.png";
import type React from "react";

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

function FileFragments() {
  const fragments = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {fragments.map((i) => {
        const rx = 220 + (i % 5) * 60;
        const ry = 120 + (i % 4) * 50;
        const duration = 18 + (i % 6) * 4;
        const delay = -(i * 1.7);
        const tilt = (i * 23) % 360;
        const size = 5 + (i % 3) * 2;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${tilt}deg)`,
            }}
          >
            <div
              className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/15"
              style={{
                width: `${rx * 2}px`,
                height: `${ry * 2}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
            <div
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${rx * 2}px`,
                height: `${ry * 2}px`,
                transform: "translate(-50%, -50%)",
                animation: `orbit-${i % 2 === 0 ? "cw" : "ccw"} ${duration}s linear ${delay}s infinite`,
              }}
            >
              <div
                className="absolute rounded-[2px] border border-brand/50"
                style={{
                  width: `${size}px`,
                  height: `${size * 1.3}px`,
                  top: "50%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  background: "oklch(0.55 0.18 255 / 0.25)",
                  boxShadow: "0 0 6px oklch(0.55 0.18 255 / 0.45)",
                }}
              />
            </div>
          </div>
        );
      })}
      <style>{`
        @keyframes orbit-cw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-ccw {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}

export default function GlobeHero() {
  const { ref: earthRef, progress: earthProgress } = useScrollProgress();
  const baseOpacity = 0.45;
  const earthScale = 0.55 + earthProgress * 3.0;
  const earthOpacity = Math.min(1, Math.max(0.35, earthProgress * 3));

  return (
    <section ref={earthRef} className="relative h-[110vh] bg-[oklch(0.08_0.02_260)] px-8 lg:px-16">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            transform: `scale(${earthScale})`,
            opacity: earthOpacity * baseOpacity,
            transition: "transform 0.03s linear, opacity 0.6s ease-out",
          }}
        >
          <img
            src={earthImg}
            alt=""
            fetchPriority="high"
            decoding="sync"
            loading="eager"
            className="h-[720px] w-[720px] object-contain"
          />
        </div>

        <FileFragments />

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at 50% 50%, oklch(0.55 0.18 255 / ${earthProgress * 0.25}) 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 text-center px-6">
          <RevealSection>
            <p className="mx-auto max-w-3xl font-heading text-2xl font-semibold text-white/90 md:text-4xl lg:text-5xl">
              We are <span className="text-brand">re-defining</span> data security{" "}
              <span className="text-brand">globally</span>.
            </p>
          </RevealSection>
        </div>

        {/* Stats bar */}
        {/* <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6">
          <div className="flex items-center justify-center gap-6 md:gap-12">
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-white md:text-2xl">100%</p>
              <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-white/50 md:text-[10px]">DATA OWNERSHIP</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-white md:text-2xl">0</p>
              <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-white/50 md:text-[10px]">THIRD-PARTY ACCESS</p>
            </div>
            <div className="text-center">
              <p className="font-heading text-lg font-bold text-white md:text-2xl">AES-256</p>
              <p className="mt-0.5 text-[8px] font-semibold tracking-[0.25em] text-white/50 md:text-[10px]">ENCRYPTION</p>
            </div>
          </div>
        </div> */}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-semibold tracking-[0.35em] text-white/70">SCROLL</p>
            <div className="h-8 w-px bg-gradient-to-b from-brand/80 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
