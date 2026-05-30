"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArhiLogo } from "./arhi-logo";
import { Footer } from "./footer";

const nav = [
  { href: "/vision", label: "Vision" },
  { href: "/technologie", label: "Technologie" },
  { href: "/entreprise", label: "Entreprise" },
  { href: "/candidat", label: "Candidat" },
];

export function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isCandidateJourney = pathname.startsWith("/candidat/parcours/");

  return (
    <div className="relative mx-auto min-h-screen max-w-[1600px] overflow-hidden px-5 pb-24 pt-6 md:px-14 md:pb-32 md:pt-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(26,42,88,0.35),transparent_30%)]" />

      <header className="relative z-20 mb-16 md:mb-24">
        <div className="hidden items-center justify-between md:flex">
          <Link href="/" className="shrink-0">
            <ArhiLogo />
          </Link>

          {!isCandidateJourney && (
            <nav className="flex items-center gap-3">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 text-[12px] uppercase tracking-[0.18em] text-white/45 transition duration-300 hover:border-[#9F9275]/30 hover:text-white/80"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="md:hidden">
          <Link href="/" className="mx-auto block w-fit">
            <ArhiLogo />
          </Link>

          {!isCandidateJourney && (
            <nav className="mx-auto mt-10 grid max-w-xs grid-cols-2 gap-x-10 gap-y-5 text-center">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/42 transition duration-300 hover:text-white/75"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      <main className="relative z-10">{children}</main>

      {!isCandidateJourney && <Footer />}
    </div>
  );
}