import { LayoutShell } from "@/components/layout-shell";
import { createClient } from "@supabase/supabase-js";

import {
  calculateArhiDimensions,
  calculateArhiScores,
} from "@/lib/arhi/scoring";

import { generateEnvironmentProfile } from "@/lib/arhi/environnement";
import { generateMatching } from "@/lib/arhi/matching";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CandidateAnalysisPage({
  params,
}: Props) {
  const { slug } = await params;

  const { data: routeData, error: routeError } = await supabase
    .from("arhi_candidate_routes")
    .select("id")
    .eq("slug", slug)
    .single();

  if (routeError || !routeData) {
    return (
      <LayoutShell>
        <section className="mx-auto max-w-6xl">
          <p className="arhi-label">Analyse croisée ARHI</p>

          <h1 className="mt-8 text-5xl font-light text-white">
            Parcours introuvable.
          </h1>
        </section>
      </LayoutShell>
    );
  }

  const { data: answers } = await supabase
    .from("arhi_candidate_answers")
    .select("answer_id, question_position")
    .eq("route_id", routeData.id)
    .order("question_position", { ascending: true });

  const answerIds =
    answers?.map((answer) => answer.answer_id) ?? [];

  const scores = calculateArhiScores(answerIds);

  const candidateProfile =
    calculateArhiDimensions(scores);

  const environmentProfile = generateEnvironmentProfile({
    rythmeCollectif: "rapide",
    autonomieReelle: "forte autonomie",
    structureDecisionnelle: "décision rapide",
    communicationInterne:
      "communication directe et collective",
    stabiliteRelationnelle: "stable",
    gestionPression: "forte",
  });

  const matching = generateMatching({
    candidate: candidateProfile,
    environment: environmentProfile,
  });

  const analysisResponse = await fetch(
    "http://localhost:3000/api/arhi/final-analysis",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        coherences: matching.coherences,
        vigilances: matching.vigilances,
        conditions:
          matching.conditionsFavorables,
      }),

      cache: "no-store",
    }
  );

  const analysisData =
    await analysisResponse.json();

  const aiText =
    analysisData.text ??
    "La synthèse ARHI n’a pas pu être générée.";

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <p className="arhi-label">
          Analyse croisée ARHI
        </p>

        <h1 className="mt-8 max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.06em] text-white md:text-8xl">
          Lecture de cohérence professionnelle.
        </h1>

        <p className="arhi-muted mt-10 max-w-3xl text-lg leading-9 md:text-xl md:leading-10">
          Cette analyse croise le fonctionnement
          observé du candidat avec les
          caractéristiques réelles de
          l’environnement professionnel décrit.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-6xl overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.025]">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-white/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
            <p className="arhi-label">
              Lecture de cohérence
            </p>

            <h2 className="mt-7 max-w-3xl text-4xl font-light leading-[1.05] tracking-[-0.05em] text-white md:text-6xl">
              Ce profil semble pouvoir
              contribuer dans cet environnement
              sous certaines conditions
              d’intégration.
            </h2>

            <p className="arhi-muted mt-8 max-w-2xl text-base leading-8">
              ARHI ne produit pas un verdict.
              Le système met en relation des
              dynamiques de fonctionnement avec
              un contexte professionnel réel,
              afin d’identifier les cohérences,
              les points de vigilance et les
              conditions favorables à une
              contribution durable.
            </p>
          </div>

          <div className="grid divide-y divide-white/10">
            <div className="p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/70">
                Cohérences observées
              </p>

              <ul className="mt-7 space-y-5">
                {matching.coherences.map(
                  (item) => (
                    <li
                      key={item}
                      className="text-sm leading-7 text-white/75"
                    >
                      — {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="p-8 md:p-10">
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/70">
                Points de vigilance
              </p>

              <ul className="mt-7 space-y-5">
                {matching.vigilances.map(
                  (item) => (
                    <li
                      key={item}
                      className="text-sm leading-7 text-white/75"
                    >
                      — {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[0.025] p-8 md:p-10">
          <p className="arhi-label">
            Conditions favorables
          </p>

          <ul className="mt-8 space-y-5">
            {matching.conditionsFavorables.map(
              (item) => (
                <li
                  key={item}
                  className="text-sm leading-7 text-white/75"
                >
                  — {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="rounded-[34px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.045] p-8 md:p-10">
          <p className="arhi-label">
            Lecture globale
          </p>

          <p className="mt-7 text-lg font-light leading-9 text-white/85 whitespace-pre-line">
            {aiText}
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}