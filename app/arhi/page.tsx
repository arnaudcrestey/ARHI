import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";

const entryPoints = [
  {
    label: "Entreprise",
    title: "Ouvrir un environnement ARHI",
    text: "L’organisation renseigne son environnement réel, le poste concerné et les équilibres humains attendus afin de préparer une analyse de recrutement.",
    href: "/entreprise",
    cta: "Entrer côté entreprise",
  },
  {
    label: "Candidat",
    title: "Répondre à une analyse ARHI",
    text: "Les réponses du candidat sont analysées en lien avec l’organisation et le poste concernés.",
    href: "/candidat",
    cta: "Comprendre le parcours",
  },
];

const readableElements = [
  {
    label: "Organisation",
    title: "Un environnement réel",
    text: "ARHI tient compte du rythme, de la pression, du mode de communication, du niveau d’autonomie et des équilibres relationnels propres à l’organisation.",
  },
  {
    label: "Poste",
    title: "Un rôle situé",
    text: "Chaque lecture est reliée aux exigences humaines du poste, à ses contraintes concrètes et aux conditions nécessaires pour tenir dans la durée.",
  },
  {
    label: "Candidat",
    title: "Une lecture située",
    text: "Les réponses ne sont jamais interprétées comme un score isolé. Elles sont analysées en lien avec le poste et l’environnement professionnel.",
  },
];

export default function ArhiPage() {
  return (
    <LayoutShell>
      <section className="arhi-surface relative overflow-hidden rounded-[34px] px-6 py-20 md:rounded-[46px] md:px-16 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(200,169,106,0.12),transparent_34%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%,rgba(0,0,0,0.24))]" />
        <div className="pointer-events-none absolute -right-28 top-12 hidden h-80 w-80 rounded-full border border-[#C8A96A]/10 md:block" />

        <div className="relative z-10 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="arhi-label">
              Intelligence des compatibilités professionnelles
            </p>

            <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.04] tracking-[-0.06em] text-white sm:text-5xl md:text-7xl">
              La décision de recrutement mérite davantage qu’une intuition.
            </h1>

            <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:mt-10 md:text-lg">
              ARHI aide les organisations à mieux comprendre les conditions
              humaines susceptibles d’influencer durablement une collaboration
              avant qu’elle ne commence.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/entreprise"
                className="arhi-button-primary inline-flex justify-center px-8 py-4 text-sm"
              >
                Entrée entreprise
              </Link>

              <Link
                href="/candidat"
                className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
              >
                Accès candidat
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-7 backdrop-blur md:rounded-[34px] md:p-9">
            <p className="arhi-label">Positionnement</p>

            <p className="mt-6 text-2xl font-light leading-tight text-white md:text-3xl">
              ARHI n’est pas un test de personnalité.
            </p>

            <p className="arhi-muted mt-6 leading-8">
              C’est un outil d’éclairage à la décision, conçu pour mieux
              comprendre les conditions humaines d’une collaboration avant
              qu’elle ne commence.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-28 md:mt-36">
        <div className="mb-10 grid gap-8 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
            <p className="arhi-label">Entrer dans ARHI</p>

            <h2 className="mt-6 max-w-3xl text-3xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
              Une même analyse. Deux points de vue.
            </h2>
          </div>

          <p className="arhi-muted leading-8">
            L’entreprise initie l’analyse. Le candidat y répond dans le cadre du
            recrutement concerné.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {entryPoints.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group arhi-surface block rounded-[30px] p-7 transition duration-500 hover:border-[#C8A96A]/25 hover:bg-white/[0.055] md:rounded-[38px] md:p-11"
            >
              <p className="arhi-label">{item.label}</p>

              <h3 className="mt-7 max-w-xl text-2xl font-light leading-tight text-white md:text-4xl">
                {item.title}
              </h3>

              <p className="arhi-muted mt-7 max-w-xl leading-8">
                {item.text}
              </p>

              <div className="mt-10 inline-flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-[#C8A96A] md:text-sm">
                <span>{item.cta}</span>
                <span className="transition duration-500 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-32 md:mt-40">
        <div className="mb-12 max-w-4xl">
          <p className="arhi-label">Ce qu’ARHI relie</p>

          <h2 className="mt-7 text-3xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
            Une personne ne se comprend jamais hors environnement professionnel.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {readableElements.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.025] p-7 md:rounded-[34px] md:p-8"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-[#C8A96A]/70">
                {item.label}
              </p>

              <h3 className="mt-6 text-2xl font-light text-white md:text-3xl">
                {item.title}
              </h3>

              <p className="arhi-muted mt-6 leading-8">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="arhi-card relative mt-32 overflow-hidden pt-16 md:mt-40 md:pt-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,169,106,0.08),transparent_34%)]" />

        <div className="relative max-w-4xl">
          <p className="arhi-label">Décision</p>

          <h2 className="mt-7 text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
            Toute analyse ARHI commence par une organisation et un poste.
          </h2>

          <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:text-lg">
            Chaque lien candidat est généré depuis une situation de recrutement
            précise. La lecture obtenue n’est donc jamais standardisée.
          </p>

          <div className="mt-10">
            <Link
              href="/entreprise"
              className="arhi-button-primary inline-flex justify-center px-8 py-4 text-sm"
            >
              Ouvrir un environnement ARHI
            </Link>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}