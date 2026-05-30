import { LayoutShell } from "@/components/layout-shell";
import { generateEnvironmentProfile } from "@/lib/arhi/environnement";
import { generateMatching } from "@/lib/arhi/matching";

export default function ArhiFinalAnalysisPage() {
  const candidateProfile = {
    autonomie: 38,
    rythme: 18,
    stabilite: 34,
    communication: 28,
    rapportAuCadre: 32,
    dynamiqueCollective: 24,
    initiative: 26,
    alignement: 30,
  };

  const environmentProfile = generateEnvironmentProfile({
    rythmeCollectif: "rapide",
    autonomieReelle: "forte autonomie",
    structureDecisionnelle: "décision rapide",
    communicationInterne: "communication directe et collective",
    stabiliteRelationnelle: "stable",
    gestionPression: "forte",
  });

  const matching = generateMatching({
    candidate: candidateProfile,
    environment: environmentProfile,
  });

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <p className="arhi-label">Analyse croisée ARHI</p>

        <h1 className="mt-8 max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.06em] text-white md:text-8xl">
          Lecture de cohérence professionnelle.
        </h1>

        <p className="arhi-muted mt-10 max-w-3xl text-lg leading-9 md:text-xl md:leading-10">
          Cette analyse croise le fonctionnement observé du candidat avec les
          caractéristiques réelles de l’environnement professionnel décrit.
        </p>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-3">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">Cohérences observées</p>

          <ul className="mt-8 space-y-5">
            {matching.coherences.map((item) => (
              <li key={item} className="text-sm leading-7 text-white/75">
                — {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">Points de vigilance</p>

          <ul className="mt-8 space-y-5">
            {matching.vigilances.map((item) => (
              <li key={item} className="text-sm leading-7 text-white/75">
                — {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">Conditions favorables</p>

          <ul className="mt-8 space-y-5">
            {matching.conditionsFavorables.map((item) => (
              <li key={item} className="text-sm leading-7 text-white/75">
                — {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl rounded-[38px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.045] p-8 md:p-12">
        <p className="arhi-label">Lecture globale</p>

        <p className="mt-7 max-w-4xl text-lg font-light leading-9 text-white/85">
          La lecture croisée ne vise pas à qualifier un candidat comme adapté ou
          non adapté de manière absolue. Elle permet de mieux comprendre les
          conditions dans lesquelles une personne peut s’engager, contribuer et
          évoluer durablement dans un environnement professionnel donné.
        </p>
      </section>
    </LayoutShell>
  );
}