import Link from "next/link";
import { ArhiLogo } from "@/components/arhi-logo";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06101F] px-5 text-white sm:px-8">
      {/* Lumière principale */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,106,0.08),transparent_42%)]" />

      {/* Halo diffus */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.06),transparent_55%)]" />

      {/* Lumière chaude en haut droite */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(200,169,106,0.08),transparent_35%)]" />

      {/* Dégradé premium */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.025),transparent_35%,rgba(200,169,106,0.02))]" />

      {/* Halo géant ultra diffus */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/2 top-[45%] h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8A96A]/[0.03] blur-[140px]" />
      </div>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center py-16 text-center sm:py-20">
        <div className="flex -translate-y-4 flex-col items-center sm:-translate-y-6 md:-translate-y-8">
          <ArhiLogo />

          <p className="mt-12 text-[10px] font-medium uppercase leading-5 tracking-[0.42em] text-[#C8A96A]/90 sm:mt-14 sm:text-[11px] md:tracking-[0.48em]">
            Intelligence des compatibilités
            <br />
            professionnelles
          </p>

          <div className="mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[#C8A96A]/45 to-transparent sm:w-24" />

          <h1 className="mt-10 max-w-[820px] text-[2.35rem] font-light leading-[1.04] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl">
  Ce qui favorise
  <br />
  ou fragilise
  <br />
  une collaboration
  <br className="hidden sm:block" />
  n’apparaît pas toujours
  <br />
  lors d'un entretien.
</h1>

          <p className="mt-8 max-w-[700px] text-sm font-light leading-7 text-white/55 sm:text-base sm:leading-8">
            ARHI éclaire les compatibilités humaines et les points de vigilance
            susceptibles d'influencer durablement une collaboration.
          </p>

          <Link
            href="/arhi"
            className="mt-12 inline-flex min-w-[156px] items-center justify-center rounded-full border border-[#C8A96A]/40 bg-[#C8A96A]/10 px-9 py-4 text-[10px] uppercase tracking-[0.34em] text-[#F2E2BE] shadow-[0_0_50px_rgba(200,169,106,0.08)] transition duration-300 hover:border-[#C8A96A]/70 hover:bg-[#C8A96A]/18 hover:text-white sm:mt-14"
          >
            Entrer
          </Link>

          <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-white/30 sm:tracking-[0.34em]">
            Accès professionnel • Analyse confidentielle
          </p>
        </div>
      </section>
    </main>
  );
}
