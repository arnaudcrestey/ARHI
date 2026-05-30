import { LayoutShell } from "@/components/layout-shell";

export default function VisionPage() {
  return (
    <LayoutShell>
      <section className="max-w-6xl">
        <p className="arhi-label">Vision</p>

        <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          ARHI aide les organisations à mieux comprendre ce qui se joue dans une
          collaboration.
        </h1>

        <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:mt-12 md:text-xl md:leading-9">
          Le système ne remplace pas le discernement humain. Il rend plus
          lisibles les conditions qui peuvent favoriser ou fragiliser une
          relation professionnelle.
        </p>
      </section>

      <section className="mt-28 grid gap-10 md:mt-36 md:grid-cols-2 md:gap-20">
        <div>
          <p className="arhi-label">Constat</p>

          <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-5xl">
            Les organisations évaluent souvent les profils avant de comprendre
            leur environnement.
          </h2>

          <p className="arhi-muted mt-8 leading-8">
            Les outils classiques mesurent des compétences, des comportements ou
            des performances isolées. Ils rendent rarement visibles les rythmes,
            les tensions, les modes de décision et les équilibres humains qui
            influencent réellement une collaboration.
          </p>
        </div>

        <div className="arhi-surface rounded-[32px] p-8 md:rounded-[40px] md:p-10">
          <p className="arhi-label">Direction</p>

          <p className="mt-8 text-2xl font-light leading-relaxed text-white md:text-3xl">
            ARHI considère la compatibilité humaine comme une donnée stratégique
            de recrutement.
          </p>

          <p className="arhi-muted mt-8 leading-8">
            L’objectif n’est pas de classer les candidats, mais d’aider
            l’entreprise à mieux comprendre les conditions dans lesquelles une
            collaboration peut tenir, s’équilibrer ou se fragiliser.
          </p>
        </div>
      </section>

      <section className="arhi-card mt-32 pt-16 md:mt-40 md:pt-20">
        <div className="max-w-4xl">
          <p className="arhi-label">Positionnement</p>

          <h2 className="mt-7 text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
            ARHI n’est ni un ATS, ni un test de personnalité, ni un système de
            matching automatique.
          </h2>

          <p className="arhi-muted mt-8 text-base leading-8 md:mt-10 md:text-lg md:leading-9">
            ARHI est un outil d’éclairage à la décision. Il relie une
            organisation, un poste et un candidat afin de produire une lecture
            utile, située et exploitable par l’entreprise.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}