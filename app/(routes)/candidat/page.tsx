import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";

const foundations = [
  {
    title: "Une même base de questions",
    text: "Le parcours candidat repose sur une série structurée de questions. Ce qui change, c’est la manière dont les réponses sont analysées.",
  },
  {
    title: "Une lecture reliée au poste",
    text: "Les réponses sont interprétées en lien avec le poste concerné, ses exigences humaines et ses conditions réelles d’exercice.",
  },
  {
    title: "Une analyse non réductrice",
    text: "ARHI ne classe pas le candidat dans un profil. Il éclaire les compatibilités, les points de vigilance et les conditions favorables.",
  },
];

const process = [
  {
    step: "01",
    title: "Organisation",
    text: "L’entreprise renseigne son environnement réel : rythme, pression, communication, autonomie et stabilité.",
  },
  {
    step: "02",
    title: "Poste",
    text: "Le poste est relié à cet environnement afin que l’analyse reste située et exploitable.",
  },
  {
    step: "03",
    title: "Lien candidat",
    text: "ARHI génère un lien unique que l’entreprise transmet au candidat pour ouvrir son parcours.",
  },
];

const outcomes = [
  {
    title: "Compatibilités observées",
    text: "Identifier les conditions dans lesquelles une collaboration peut gagner en fluidité, en stabilité et en lisibilité.",
  },
  {
    title: "Points de vigilance",
    text: "Repérer les éléments susceptibles de créer de l’inconfort, de la friction ou une perte d’équilibre.",
  },
  {
    title: "Conditions favorables",
    text: "Relier les réponses du candidat aux besoins humains du poste et de l’organisation.",
  },
];

export default function CandidatPage() {
  return (
    <LayoutShell>
      <section className="max-w-6xl">
        <p className="arhi-label">Candidat</p>

        <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.04] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          Le candidat ne passe pas un test. Il répond à une analyse ARHI.
        </h1>

        <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 sm:text-lg md:mt-12 md:text-xl md:leading-9">
          ARHI ne cherche pas à réduire une personne à un profil. Les réponses
          du candidat sont analysées en lien avec l’organisation, le poste et
          les conditions réelles de la collaboration.
        </p>
      </section>

      <section className="mt-20 grid gap-6 sm:mt-24 md:mt-36 md:grid-cols-3 md:gap-8">
        {foundations.map((item) => (
          <article
            key={item.title}
            className="arhi-surface rounded-[28px] p-7 md:rounded-[34px] md:p-9"
          >
            <p className="arhi-label">Lecture</p>

            <h2 className="mt-7 text-2xl font-light leading-tight text-white md:text-3xl">
              {item.title}
            </h2>

            <p className="arhi-muted mt-6 text-sm leading-7 md:mt-7 md:text-base md:leading-8">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-24 md:mt-40">
        <div className="arhi-surface overflow-hidden rounded-[34px] p-7 md:rounded-[42px] md:p-14">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <p className="arhi-label">Accès candidat</p>
            </div>

            <div>
              <h2 className="max-w-4xl text-3xl font-light leading-[1.08] tracking-[-0.045em] text-white md:text-5xl">
                Le parcours candidat s’ouvre uniquement depuis un lien transmis
                par l’entreprise.
              </h2>

              <div className="arhi-muted mt-8 max-w-3xl space-y-5 text-base leading-8 md:text-lg md:leading-9">
                <p>
                  Ce lien associe automatiquement le candidat à l’organisation
                  et au poste concernés.
                </p>

                <p>
                  Le candidat répond aux questions dans un cadre professionnel
                  précis, sans scoring public, sans classement et sans lecture
                  isolée.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/entreprise"
                  className="arhi-button-primary inline-flex justify-center px-7 py-4 text-sm"
                >
                  Voir le parcours entreprise
                </Link>

                <Link
                  href="/"
                  className="arhi-button-secondary inline-flex justify-center px-7 py-4 text-sm"
                >
                  Retour à l’accueil
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
            {process.map((item) => (
              <article
                key={item.step}
                className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6 md:rounded-[30px] md:p-7"
              >
                <p className="text-xs tracking-[0.45em] text-[#C8A96A] md:text-sm">
                  {item.step}
                </p>

                <h3 className="mt-7 text-xl font-light leading-tight text-white md:mt-8 md:text-2xl">
                  {item.title}
                </h3>

                <p className="arhi-muted mt-6 text-sm leading-7">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-6 md:mt-40 md:grid-cols-3 md:gap-8">
        {outcomes.map((item) => (
          <article
            key={item.title}
            className="arhi-surface rounded-[28px] p-7 md:rounded-[34px] md:p-9"
          >
            <p className="arhi-label">Résultat</p>

            <h2 className="mt-7 text-2xl font-light leading-tight text-white md:text-3xl">
              {item.title}
            </h2>

            <p className="arhi-muted mt-6 text-sm leading-7 md:mt-7 md:text-base md:leading-8">
              {item.text}
            </p>
          </article>
        ))}
      </section>
    </LayoutShell>
  );
}