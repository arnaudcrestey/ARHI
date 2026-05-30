import { LayoutShell } from "@/components/layout-shell";

export default function ContactPage() {
  return (
    <LayoutShell>
      <section className="mx-auto max-w-4xl">
        <p className="arhi-label">Contact</p>

        <h1 className="mt-8 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">
          Échanger avec ARHI.
        </h1>

        <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
          Une question, un projet ou une demande de présentation ? Échangeons
          directement.
        </p>

        <div className="arhi-surface mt-12 rounded-[34px] p-7 md:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Email
              </p>

              <a
                href="mailto:contact@arhi.fr"
                className="mt-4 block break-all text-lg font-light text-white transition hover:text-[#E5D1A1]"
              >
                contact@arhi.fr
              </a>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Téléphone
              </p>

              <a
                href="tel:+33695826845"
                className="mt-4 block text-lg font-light text-white transition hover:text-[#E5D1A1]"
              >
                06 95 82 68 45
              </a>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.06] p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
              ARHI
            </p>

            <p className="mt-4 text-lg font-light leading-7 text-white">
              Comprendre avant de décider.
            </p>

            <p className="mt-3 text-sm leading-7 text-white/60">
              Une approche contextualisée du recrutement et des organisations.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}