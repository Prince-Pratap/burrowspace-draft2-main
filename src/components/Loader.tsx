import { useState, useEffect } from "react";
import logo from "@/assets/logo-full.png";

const LOADER_KEY = "burrowspace_loaded";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 2200);
    const done = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => {
      clearTimeout(timer);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-loader-bg ${
        fadeOut ? "animate-fade-out" : ""
      }`}
    >
      <img
        src={logo}
        alt="BurrowSpace"
        className="h-12 w-auto object-contain md:h-16"
      />
      <div className="mt-8 h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
    </div>
  );
}

export function useFirstLoadCheck() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loaded = sessionStorage.getItem(LOADER_KEY);
      if (!loaded) {
        setShowLoader(true);
      }
    }
  }, []);

  const completeLoader = () => {
    sessionStorage.setItem(LOADER_KEY, "true");
    setShowLoader(false);
  };

  return { showLoader, completeLoader };
}
