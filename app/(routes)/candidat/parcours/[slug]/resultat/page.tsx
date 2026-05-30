import { LayoutShell } from "@/components/layout-shell";
import { createClient } from "@supabase/supabase-js";
import { FinalizeCandidacyButton } from "@/components/finalize-candidacy-button";

import {
  calculateArhiDimensions,
  calculateArhiScores,
} from "@/lib/arhi/scoring";
import { generateArhiPortrait } from "@/lib/arhi/portrait";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    candidateId?: string;
  }>;
};

const DIMENSION_LABELS: Record<string, string> = {
  rapportAuCadre: "Rapport au cadre",
  autonomie: "Autonomie",
  communication: "Communication",
  stabilite: "Stabilité",
  dynamiqueCollective: "Collectif",
  initiative: "Initiative",
  alignement: "Alignement",
  rythme: "Rythme",
};

function getIntensity(value: number) {
  if (value >= 40) return "Dominante forte";
  if (value >= 30) return "Appui marqué";
  if (value >= 20) return "Présence stable";
  return "Expression discrète";
}

function getIntensityWidth(value: number) {
  if (value >= 40) return "w-full";
  if (value >= 30) return "w-3/4";
  if (value >= 20) return "w-1/2";
  return "w-1/4";
}

function getDimensionDescription(key: string) {
  const descriptions: Record<string, string> = {
    rapportAuCadre: "Relation aux règles, repères et attentes explicites.",
    autonomie: "Capacité à avancer sans dépendance excessive au cadre.",
    communication: "Qualité d’ajustement, de clarté et de transmission.",
    stabilite: "Constance, fiabilité et continuité dans l’engagement.",
    dynamiqueCollective: "Positionnement dans les équilibres d’équipe.",
    initiative: "Capacité à proposer, décider et engager un mouvement.",
    alignement: "Cohérence entre posture, environnement et contribution.",
    rythme: "Rapport à la cadence, à la pression et au temps professionnel.",
  };

  return descriptions[key] ?? "Repère structurant du fonctionnement professionnel.";
}

export default async function CandidateResultPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { candidateId } = await searchParams;

  const { data: routeData, error: routeError } = await supabase
    .from("arhi_candidate_routes")
    .select("id, position_id, organisation_id")
    .eq("slug", slug)
    .single();

  if (routeError || !routeData || !candidateId) {
    return (
      <LayoutShell>
        <section className="mx-auto max-w-6xl">
          <p className="arhi-label">Résultat candidat</p>

          <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.05] tracking-[-0.05em] text-white md:text-7xl">
            Parcours introuvable.
          </h1>

          <p className="arhi-muted mt-8 max-w-3xl text-lg leading-8">
            Nous n’avons pas pu retrouver la candidature associée à ce lien.
          </p>
        </section>
      </LayoutShell>
    );
  }

  const { data: answers } = await supabase
    .from("arhi_candidate_answers")
    .select("answer_id, question_position")
    .eq("candidate_id", candidateId)
    .order("question_position", { ascending: true });

  const { data: candidate } = await supabase
  .from("arhi_candidates")
  .select("first_name")
  .eq("id", candidateId)
  .maybeSingle();  

  const answerIds = answers?.map((answer) => answer.answer_id) ?? [];

  const scores = calculateArhiScores(answerIds);
  const dimensions = calculateArhiDimensions(scores);
  const portrait = generateArhiPortrait(scores);

  const globalScore = Math.round(
    Object.values(dimensions).reduce((total, value) => total + value, 0) /
      Object.values(dimensions).length
  );

  const compatibility =
    globalScore >= 30
      ? "Compatibilité élevée"
      : globalScore >= 20
        ? "Compatibilité équilibrée"
        : "Compatibilité à explorer";

  const orderedDimensions = Object.entries(dimensions).sort(
    ([, valueA], [, valueB]) => valueB - valueA
  );

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <p className="arhi-label">Lecture professionnelle</p>

        <h1 className="mt-8 max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.06em] text-white md:text-8xl">
          Votre lecture professionnelle contextualisée.
        </h1>

        <p className="arhi-muted mt-10 max-w-3xl text-lg leading-9 md:text-xl md:leading-10">
          ARHI met en évidence des dynamiques de fonctionnement, d’engagement
          et d’équilibre professionnel à partir de votre parcours.
        </p>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[38px] border border-white/10 bg-white/[0.025] p-8 md:p-12">
          <p className="arhi-label">Portrait principal</p>

          <p className="mt-8 text-xl font-light leading-9 text-white md:text-2xl md:leading-10">
            {portrait.synthesis}
          </p>
        </div>

        <div className="grid gap-6">
          {portrait.dominantMarkers.slice(0, 3).map((marker) => (
            <div
              key={marker.code}
              className="rounded-[30px] border border-white/10 bg-white/[0.025] p-7"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                Marqueur dominant
              </p>

              <h2 className="mt-5 text-xl font-light leading-tight text-white">
                {marker.title}
              </h2>

              <p className="arhi-muted mt-4 text-sm leading-7">
                {marker.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-2">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">Compatibilité environnementale</p>

          <p className="arhi-muted mt-7 text-base leading-8">
            Votre fonctionnement semble davantage compatible avec :
          </p>

          <ul className="mt-7 space-y-5">
            {portrait.favorableConditions.map((condition) => (
              <li key={condition} className="text-sm leading-7 text-white/75">
                — {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">Points d’attention</p>

          <p className="arhi-muted mt-7 text-base leading-8">
            Certains contextes peuvent demander une vigilance particulière.
          </p>

          <ul className="mt-7 space-y-5">
            {portrait.vigilancePoints.map((point) => (
              <li key={point} className="text-sm leading-7 text-white/75">
                — {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.025]">
        <div className="border-b border-white/10 p-8 md:p-12">
          <p className="arhi-label">Cartographie professionnelle</p>

          <p className="arhi-muted mt-6 max-w-3xl text-base leading-8">
            Ces repères ne sont pas des notes. Ils indiquent les zones qui
            structurent le plus fortement votre fonctionnement professionnel.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/70">
              Architecture dominante
            </p>

            <div className="mt-10 space-y-8">
              {orderedDimensions.slice(0, 3).map(([key, value], index) => (
                <div key={key}>
                  <div className="flex items-end justify-between gap-6">
                    <div>
                      <p className="text-sm text-white/35">0{index + 1}</p>

                      <h3 className="mt-2 text-2xl font-light tracking-[-0.03em] text-white">
                        {DIMENSION_LABELS[key] ?? key}
                      </h3>
                    </div>

                    <p className="text-right text-[10px] uppercase tracking-[0.24em] text-[#C8A96A]/70">
                      {getIntensity(value)}
                    </p>
                  </div>

                  <div className="mt-5 h-px w-full bg-white/10">
                    <div
                      className={`h-px ${getIntensityWidth(value)} bg-[#C8A96A]/80`}
                    />
                  </div>

                  <p className="arhi-muted mt-4 text-sm leading-7">
                    {getDimensionDescription(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid divide-y divide-white/10 md:grid-cols-2 md:divide-x md:divide-y-0">
            <div>
              {orderedDimensions.slice(3, 6).map(([key, value]) => (
                <div
                  key={key}
                  className="border-b border-white/10 p-8 last:border-b-0"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    {getIntensity(value)}
                  </p>

                  <h3 className="mt-5 text-xl font-light text-white">
                    {DIMENSION_LABELS[key] ?? key}
                  </h3>

                  <p className="arhi-muted mt-4 text-sm leading-7">
                    {getDimensionDescription(key)}
                  </p>

                  <div className="mt-6 h-px w-full bg-white/10">
                    <div
                      className={`h-px ${getIntensityWidth(value)} bg-[#C8A96A]/65`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              {orderedDimensions.slice(6).map(([key, value]) => (
                <div
                  key={key}
                  className="border-b border-white/10 p-8 last:border-b-0"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/30">
                    {getIntensity(value)}
                  </p>

                  <h3 className="mt-5 text-xl font-light text-white">
                    {DIMENSION_LABELS[key] ?? key}
                  </h3>

                  <p className="arhi-muted mt-4 text-sm leading-7">
                    {getDimensionDescription(key)}
                  </p>

                  <div className="mt-6 h-px w-full bg-white/10">
                    <div
                      className={`h-px ${getIntensityWidth(value)} bg-[#C8A96A]/65`}
                    />
                  </div>
                </div>
              ))}

              <div className="p-8">
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#C8A96A]/70">
                  Lecture globale
                </p>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  L’équilibre général de ces repères permet de situer les
                  conditions dans lesquelles le profil peut contribuer avec le
                  plus de justesse.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl rounded-[38px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.045] p-8 md:p-12">
        <p className="arhi-label">Lecture ARHI</p>

        <p className="mt-7 max-w-4xl text-lg font-light leading-9 text-white/85">
          Cette lecture ne cherche pas à réduire un profil à une catégorie. Elle
          vise à mieux comprendre les conditions dans lesquelles une personne
          peut s’engager, contribuer et évoluer durablement dans un environnement
          professionnel donné.
        </p>
      </section>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-5 rounded-[28px] border border-[#C8A96A]/15 bg-[#C8A96A]/[0.035] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#C8A96A]/75">
            Candidature prête à transmettre
          </p>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/55">
            Votre lecture ARHI est associée à votre candidature. Elle sera
            transmise à l’organisation concernée après validation.
          </p>
        </div>

        <FinalizeCandidacyButton
          candidateRouteId={routeData.id}
          positionId={routeData.position_id}
          organisationId={routeData.organisation_id}
          firstName={candidate?.first_name ?? null}
          globalScore={globalScore}
          compatibility={compatibility}
          autonomieScore={dimensions.autonomie ?? 0}
          rythmeScore={dimensions.rythme ?? 0}
          interactionsScore={dimensions.dynamiqueCollective ?? 0}
          pressionScore={dimensions.rapportAuCadre ?? 0}
          adaptationScore={dimensions.initiative ?? 0}
          stabiliteScore={dimensions.stabilite ?? 0}
          slug={slug}
        />
      </div>
    </LayoutShell>
  );
}