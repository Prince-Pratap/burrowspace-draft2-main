import { useInView } from "@/hooks/use-scroll";

/* ── Animated file icons that "travel" across the wire ── */
function FloatingFile({ delay, top }: { delay: number; top: string }) {
  return (
    <div
      className="absolute h-4 w-3 rounded-[2px] border border-red-400/60 bg-red-500/20"
      style={{
        top,
        animation: `file-travel 4s linear ${delay}s infinite`,
      }}
    />
  );
}

/* ── Traditional Cloud panel ── */
function TraditionalCloud() {
  return (
    <div className="relative flex flex-1 flex-col items-center rounded-2xl border border-red-500/20 bg-white/[0.03] p-8 backdrop-blur-sm">
      <h3 className="font-heading text-lg font-bold text-red-400 md:text-xl">Traditional Cloud</h3>
      <p className="mt-1 text-sm text-white/60">Your files travel to unknown servers</p>

      {/* Animation area */}
      <div className="relative mt-8 flex w-full items-center justify-between px-4" style={{ height: 120 }}>
        {/* Laptop */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-14 w-20 rounded-md border border-white/20 bg-white/5 flex items-center justify-center">
            <div className="h-8 w-14 rounded-sm bg-[oklch(0.15_0.02_260)]" />
          </div>
          <div className="h-2 w-24 rounded-full bg-white/10" />
          <p className="text-[10px] text-white/50">Your Laptop</p>
        </div>

        {/* Wire + moving files */}
        <div className="absolute left-24 right-24 top-1/2 -translate-y-1/2">
          <div className="h-px w-full bg-red-500/40" />
          <FloatingFile delay={0} top="-6px" />
          <FloatingFile delay={1.3} top="-6px" />
          <FloatingFile delay={2.6} top="-6px" />
        </div>

        {/* Server */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                <div className="h-1 w-6 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-white/50">Unknown Server</p>
          <p className="text-[9px] text-red-400/70">Somewhere in the world</p>
        </div>
      </div>

      {/* Verdict */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-red-500/50">
          <span className="text-lg text-red-400">✕</span>
        </div>
        <p className="font-heading text-xs font-bold tracking-wider text-red-400">VULNERABLE TO THREATS</p>
        <p className="text-[10px] text-white/40">Breaches · Leaks · Third-party access</p>
      </div>
    </div>
  );
}

/* ── BurrowSpace panel ── */
function BurrowSpacePanel() {
  return (
    <div className="relative flex flex-1 flex-col items-center rounded-2xl border border-brand/20 bg-white/[0.03] p-8 backdrop-blur-sm">
      <h3 className="font-heading text-lg font-bold text-brand md:text-xl">BurrowSpace</h3>
      <p className="mt-1 text-sm text-white/60">Files never leave your device</p>

      {/* Animation area */}
      <div className="relative mt-8 flex w-full items-center justify-center" style={{ height: 120 }}>
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-14 w-20 rounded-md border border-brand/30 bg-white/5 flex items-center justify-center">
            <div className="h-8 w-14 rounded-sm bg-[oklch(0.15_0.02_260)] border border-brand/20" />
            {/* Small arrow looping inside */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-brand/60 text-sm animate-bounce">↑</div>
          </div>
          <div className="h-2 w-24 rounded-full bg-white/10" />
          <p className="text-[10px] text-brand">Your Laptop = Your Server</p>
          <div className="h-3 w-2.5 rounded-[1px] border border-brand/40 bg-brand/10" />
        </div>
      </div>

      {/* Verdict */}
      <div className="mt-6 flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand/50">
          <span className="text-lg text-brand">✓</span>
        </div>
        <p className="font-heading text-xs font-bold tracking-wider text-brand">FULLY SECURE</p>
        <p className="text-[10px] text-white/40">Everything stays in your bubble</p>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section
      id="features"
      ref={ref}
      className="bg-[oklch(0.08_0.02_260)] px-6 py-20 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <p
          className={`mb-4 text-xs font-semibold tracking-[0.4em] text-white/50 text-center transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          FEATURES
        </p>
        {/* <h2
          className={`mb-2 text-center font-heading text-4xl font-bold leading-tight text-white md:text-6xl transition-all duration-700 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          Features of <span className="text-brand">BurrowSpace</span>
        </h2> */}
        <div className="mb-10" />

        {/* Comparison panels */}
        <div
          className={`flex flex-col gap-6 md:flex-row transition-all duration-700 delay-200 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <TraditionalCloud />
          <BurrowSpacePanel />
        </div>

        {/* 4 Feature boxes */}
        <div
          className={`mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-500 ${
            inView ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          {/* Feature 1: Smooth Integration */}
          <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand text-lg">⚡</div>
            <h4 className="mt-4 font-heading text-sm font-bold text-white">Smooth Integration</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Connect your existing cloud storage with BurrowSpace in one click. Works with Google Drive, Dropbox, iCloud & more.
            </p>
          </div>

          {/* Feature 2: Secure */}
          <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand text-lg">🛡</div>
            <h4 className="mt-4 font-heading text-sm font-bold text-white">Truly Secure</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Your data never leaves your device — the attack surface simply disappears. No external vulnerabilities to manage.
            </p>
          </div>

          {/* Feature 3: Cross-Platform */}
          <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand text-lg">🖥</div>
            <h4 className="mt-4 font-heading text-sm font-bold text-white">Cross-Platform</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Works seamlessly on Windows, macOS, Linux, iOS & Android. Your data, accessible from every device you own.
            </p>
          </div>

          {/* Feature 4: Free Forever */}
          <div className="flex flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand text-lg">🪙</div>
            <h4 className="mt-4 font-heading text-sm font-bold text-white">Free Forever</h4>
            <p className="mt-2 text-xs leading-relaxed text-white/50">
              Your device, your storage — forever free. Earn BurrowCoins by contributing to the network, no subscriptions ever.
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe for file travel animation */}
      <style>{`
        @keyframes file-travel {
          0%   { left: 0; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: calc(100% - 12px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
