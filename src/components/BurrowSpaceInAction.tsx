import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-scroll";
import logoIcon from "@/assets/logo-icon.png";
import burrowLogoBig from "@/assets/burrow-logo-blue.png";

/* ---------- Step 1 — File Fragmentation ---------- */
function FragmentVisual() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % 2), 2200);
    return () => clearInterval(id);
  }, []);

  const shards = Array.from({ length: 12 });
  return (
    <div className="relative h-72 w-full text-white">
      {/* Source file — document with folded corner */}
      <div
        className="absolute left-1/2 top-1/2 transition-all duration-1000"
        style={{
          opacity: phase === 0 ? 1 : 0.15,
          transform: `translate(-50%, -50%) scale(${phase === 0 ? 1 : 0.6})`,
          filter: "drop-shadow(0 0 24px oklch(0.55 0.18 255 / 0.5))",
        }}
      >
        <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
          {/* Folded corner triangle (background) */}
          <path d="M0 0 H60 L80 20 V100 H0 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
          {/* Fold detail */}
          <path d="M60 0 V20 H80" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.2" />
          {/* Text lines */}
          <rect x="10" y="32" width="50" height="2.5" rx="1" fill="currentColor" fillOpacity="0.55" />
          <rect x="10" y="42" width="60" height="2.5" rx="1" fill="currentColor" fillOpacity="0.45" />
          <rect x="10" y="52" width="45" height="2.5" rx="1" fill="currentColor" fillOpacity="0.45" />
          <rect x="10" y="62" width="60" height="2.5" rx="1" fill="currentColor" fillOpacity="0.35" />
          <rect x="10" y="72" width="38" height="2.5" rx="1" fill="currentColor" fillOpacity="0.35" />
          <rect x="10" y="82" width="55" height="2.5" rx="1" fill="currentColor" fillOpacity="0.3" />
        </svg>
      </div>

      {/* Shards */}
      {shards.map((_, i) => {
        const angle = (i / shards.length) * Math.PI * 2;
        const dist = 110;
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist;
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 h-3 w-3 rounded-sm border border-brand/60 bg-brand/30 transition-all duration-1000 ease-out"
            style={{
              transform: `translate(${phase === 1 ? x : 0}px, ${phase === 1 ? y : 0}px) rotate(${i * 30}deg)`,
              opacity: phase === 1 ? 1 : 0,
              boxShadow: "0 0 8px oklch(0.55 0.18 255 / 0.7)",
              transitionDelay: `${i * 40}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ---------- Step 2 — Decentralization Network ---------- */
function DecentralizationVisual() {
  const nodes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    return { x: 50 + Math.cos(angle) * 35, y: 50 + Math.sin(angle) * 35 };
  });

  return (
    <div className="relative h-72 w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Connections */}
        {nodes.map((n, i) =>
          nodes.slice(i + 1).map((m, j) => (
            <line
              key={`${i}-${j}`}
              x1={n.x}
              y1={n.y}
              x2={m.x}
              y2={m.y}
              stroke="oklch(0.55 0.18 255)"
              strokeWidth="0.15"
              strokeOpacity="0.3"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.1;0.6;0.1"
                dur={`${3 + ((i + j) % 4)}s`}
                repeatCount="indefinite"
              />
            </line>
          ))
        )}
        {/* Center hub */}
        <circle cx="50" cy="50" r="3" fill="oklch(0.55 0.18 255)">
          <animate attributeName="r" values="2.5;3.5;2.5" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Outer nodes */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="2" fill="oklch(0.55 0.18 255)" opacity="0.9">
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle cx={n.x} cy={n.y} r="4" fill="none" stroke="oklch(0.55 0.18 255)" strokeOpacity="0.3">
              <animate
                attributeName="r"
                values="2;6;2"
                dur={`${2 + (i % 3)}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ---------- Step 3 — Burrow Coin ---------- */
function BurrowCoinVisual() {
  return (
    <div className="relative flex h-72 w-full items-center justify-center">
      {/* Central logo */}
      <div
        className="relative z-10"
        style={{ animation: "coin-float 4s ease-in-out infinite" }}
      >
        <img
          src={burrowLogoBig}
          alt="BurrowSpace"
          className="h-36 w-36 object-contain drop-shadow-[0_0_30px_oklch(0.55_0.18_255_/_0.5)]"
        />
      </div>

      {/* Orbiting coins */}
      {[
        { size: 180, dur: 6, delay: 0 },
        { size: 180, dur: 6, delay: -3 },
        { size: 240, dur: 9, delay: -1 },
        { size: 240, dur: 9, delay: -5.5 },
        { size: 300, dur: 12, delay: -2 },
        { size: 300, dur: 12, delay: -8 },
      ].map((orbit, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 pointer-events-none"
          style={{
            width: `${orbit.size}px`,
            height: `${orbit.size}px`,
            transform: "translate(-50%, -50%)",
            animation: `orbit-coin ${orbit.dur}s linear ${orbit.delay}s infinite`,
          }}
        >
          {/* Gold coin */}
          <div
            className="absolute flex h-7 w-7 items-center justify-center rounded-full border-2 border-yellow-400/80 bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-[0_0_10px_oklch(0.75_0.15_85_/_0.5)]"
            style={{
              top: "50%",
              left: "100%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="text-[10px] font-bold text-yellow-900">B</span>
          </div>
        </div>
      ))}

      <style>{`
        @keyframes coin-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbit-coin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

/* ---------- Step Card (static, side-by-side) ---------- */
function StepCard({
  step,
  title,
  description,
  index,
  children,
}: {
  step: string;
  title: string;
  description: string;
  index: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[oklch(0.12_0.02_260)] p-6 md:p-8"
      style={{
        boxShadow: "0 20px 50px -25px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.04)",
        minHeight: "min(560px, 70vh)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: "oklch(0.55 0.18 255 / 0.35)" }}
      />
      <div className="relative">
        <p className="mb-3 font-mono text-xs tracking-[0.3em] text-brand">{step}</p>
        <h3 className="mb-3 font-heading text-2xl font-bold text-white md:text-3xl">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-white/60">{description}</p>
      </div>
      <div className="relative mt-6 flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        {children}
      </div>
      <div className="relative mt-4 flex items-center justify-end">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
          0{index + 1} / 03
        </span>
      </div>
    </div>
  );
}

export default function BurrowSpaceInAction() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView(0.2);

  const steps = [
    {
      step: "STEP 01",
      title: "Fragments of file",
      description:
        "Every file is shattered into encrypted shards before it ever leaves your device — unreadable on their own.",
      visual: <FragmentVisual />,
    },
    {
      step: "STEP 02",
      title: "De-centralization",
      description:
        "Shards are scattered across a sovereign mesh of nodes. No single point of failure, no single point of trust.",
      visual: <DecentralizationVisual />,
    },
    {
      step: "STEP 03",
      title: "Burrow Coins",
      description:
        "Storage providers earn Burrow Coins — a native incentive layer that keeps the network honest, distributed, and alive.",
      visual: <BurrowCoinVisual />,
    },
  ];

  return (
    <section ref={ref} className="relative bg-[oklch(0.08_0.02_260)] px-6 py-24 md:py-32 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <p className="mb-4 text-xs font-semibold tracking-[0.4em] text-white/50">
            HOW IT WORKS
          </p>
          <h2 className="font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            BurrowSpace in action by:
          </h2>
        </div>

        {/* Side-by-side cards — no scroll effects */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <StepCard
              key={s.step}
              step={s.step}
              title={s.title}
              description={s.description}
              index={i}
            >
              {s.visual}
            </StepCard>
          ))}
        </div>
      </div>
    </section>
  );
}
