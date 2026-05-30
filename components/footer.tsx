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
    <footer className="relative z-10 mt-24 border-t border-white/[0.055] pt-14 md:mt-40 md:pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <div className="opacity-55">
            <ArhiLogo />
          </div>

          <p className="mt-7 max-w-[330px] text-xl font-light leading-snug tracking-[-0.04em] text-white/45 sm:max-w-[520px] sm:text-2xl">
            Infrastructure de cohérence humaine professionnelle.
          </p>

          <nav className="mt-12 grid w-full max-w-[520px] grid-cols-2 gap-x-8 gap-y-7 px-6 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-5 sm:px-0">
            {mainLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-center text-[9px] uppercase tracking-[0.34em] text-white/38 transition duration-300 hover:text-white/70 sm:text-[10px]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 border-t border-white/[0.055] pt-9 text-center md:mt-16 md:pt-10">
          <p className="text-[9px] uppercase tracking-[0.32em] text-white/24 md:text-[10px]">
            ARHI — France
          </p>

          <nav className="mx-auto mt-9 flex max-w-[390px] flex-col items-center gap-5 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-4">
            <div className="grid w-full grid-cols-2 gap-x-8 gap-y-5">
              {legalLinks.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-center text-[9px] uppercase tracking-[0.24em] text-white/36 transition duration-300 hover:text-white/65"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/cookies"
              className="mt-1 text-center text-[9px] uppercase tracking-[0.24em] text-white/36 transition duration-300 hover:text-white/65 sm:mt-0"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
