import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-full.png";

const navLinks = [
  { label: "ABOUT US", to: "/about" },
  //{ label: "Career", href: "#" },
  { label: "CONTACT US", to: "/contactus" },
  { label: "FAQS", to: "/faqs" },
  { label: "CYBERSEC COMMUNITY", to: "#" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-transparent px-8 py-7 lg:px-16">
      <Link to="/" className="flex items-center gap-3 py-2">
        <img src={logo} alt="BurrowSpace" className="h-13 w-auto" />
      </Link>

      <div className="hidden items-center gap-2 lg:flex">
        {navLinks.map((link) =>
          link.to.startsWith("/") ? (
            <Link
              key={link.label}
              to={link.to}
              className="px-4 py-3 text-xs font-medium tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ) : (
            <span
              key={link.label}
              className="cursor-default px-4 py-3 text-xs font-medium tracking-[0.2em] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </span>
          )
        )}
      </div>

      <button
        className="hidden rounded-none border border-white px-7 py-3 text-xs font-semibold tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-[oklch(0.08_0.02_260)] lg:inline-flex"
      >
      JOIN US
      </button>
    </nav>
  );
}
