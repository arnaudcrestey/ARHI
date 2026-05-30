import Link from "next/link";
import { ArhiLogo } from "./arhi-logo";

const mainLinks = [
  { href: "/vision", label: "Vision" },
  { href: "/technologie", label: "Technologie" },
  { href: "/entreprise", label: "Entreprise" },
  { href: "/candidat", label: "Candidat" },
];

const legalLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
  { href: "/cookies", label: "Cookies" },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.055] pt-12 md:mt-40 md:pt-16">
      <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div className="mx-auto max-w-sm text-center md:mx-0 md:text-left">
          <div className="mx-auto w-fit opacity-55 md:mx-0">
            <ArhiLogo />
          </div>

          <p className="mt-6 text-lg font-light leading-snug tracking-[-0.035em] text-white/42 md:max-w-sm md:text-2xl">
            Infrastructure de cohérence humaine professionnelle.
          </p>
        </div>

        <nav className="mx-auto flex max-w-sm flex-wrap justify-center gap-x-7 gap-y-4 text-center md:mx-0 md:max-w-none md:justify-end">
          {mainLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[9px] uppercase tracking-[0.3em] text-white/28 transition duration-300 hover:text-white/65 md:text-[10px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-10 grid gap-7 border-t border-white/[0.055] pt-7 text-center md:mt-10 md:flex md:items-center md:justify-between md:text-left">
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/22 md:text-[10px]">
          ARHI — France
        </p>

        <nav className="mx-auto flex max-w-sm flex-wrap justify-center gap-x-6 gap-y-3 md:mx-0 md:max-w-none md:justify-end md:gap-x-6">
          {legalLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[9px] uppercase tracking-[0.22em] text-white/32 transition duration-300 hover:text-white/62 md:text-[9px] md:text-white/42"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}