import { LayoutShell } from "@/components/layout-shell";
import { GenerateCompanyReadingButton } from "@/components/generate-company-reading-button";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function formatDate(value?: string | null) {
  if (!value) return "Date non renseignée";

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function CandidateCompanyPage({ params }: Props) {
  const { id } = await params;

  const { data: candidate } = await supabase
    .from("arhi_candidates")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!candidate) {
    notFound();
  }

  const { data: position } = candidate.position_id
    ? await supabase
        .from("arhi_positions")
        .select("*")
        .eq("id", candidate.position_id)
        .maybeSingle()
    : { data: null };

  const { data: organisation } = candidate.organisation_id
    ? await supabase
        .from("arhi_organisations")
        .select("*")
        .eq("id", candidate.organisation_id)
        .maybeSingle()
    : { data: null };

  const { data: reading } = await supabase
    .from("arhi_company_readings")
    .select("*")
    .eq("candidate_id", candidate.id)
    .maybeSingle();

  const candidateName =
    `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() ||
    "Candidat";

  const positionTitle = position?.title || "Poste non renseigné";

  const organisationName =
    organisation?.company_name || "Organisation non renseignée";

  const hasReading = Boolean(reading);

  const compatibilities = Array.isArray(reading?.compatibilities)
    ? reading.compatibilities
    : [];

  const vigilances = Array.isArray(reading?.vigilances)
    ? reading.vigilances
    : [];

  const favorableConditions = Array.isArray(reading?.engagement_conditions)
    ? reading.engagement_conditions
    : [];

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <p className="arhi-label">Fiche candidat</p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <h1 className="text-4xl font-light leading-[0.95] tracking-[-0.05em] text-white md:text-6xl">
              Analyse de compatibilité humaine
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg md:leading-9">
              Cette lecture aide l’entreprise à comprendre si la dynamique
              humaine du candidat semble compatible avec le poste, le rythme et
              l’environnement professionnel observé.
            </p>
          </div>

          <div className="arhi-surface rounded-[32px] p-7 md:rounded-[40px]">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Candidat analysé
              </p>

              <h2 className="mt-5 text-3xl font-light tracking-[-0.035em] text-white">
                {candidateName}
              </h2>
            </div>

            <div className="mt-7 grid gap-3 text-sm text-white/58">
              <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-4">
                <span className="text-white/35">Organisation</span>
                <span className="text-right text-white/72">
                  {organisationName}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-4">
                <span className="text-white/35">Poste</span>
                <span className="text-right text-white/72">
                  {positionTitle}
                </span>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-4">
                <span className="text-white/35">Transmission</span>
                <span className="text-right text-white/72">
                  {formatDate(candidate.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {!hasReading && (
          <section className="mt-14 rounded-[32px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.035] p-8 md:rounded-[40px] md:p-10">
            <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
              Lecture entreprise
            </p>

            <h2 className="mt-6 max-w-3xl text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-4xl">
              L’analyse de compatibilité n’a pas encore été générée.
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-white/65">
              Les données candidat, poste et organisation sont bien disponibles.
              Vous pouvez générer une lecture afin de croiser ces éléments et
              produire une analyse claire pour l’entreprise.
            </p>

            <GenerateCompanyReadingButton candidateId={candidate.id} />
          </section>
        )}

        {hasReading && (
          <>
            <section className="mt-14 rounded-[32px] border border-[#C8A96A]/25 bg-[#C8A96A]/[0.045] p-8 md:rounded-[44px] md:p-10">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Compatibilité humaine
              </p>

              <h2 className="mt-6 max-w-4xl text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
                Lecture contextualisée.
              </h2>

              <p className="mt-8 max-w-4xl whitespace-pre-line text-base leading-8 text-white/72">
                {reading.summary}
              </p>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="arhi-surface rounded-[32px] p-7 md:rounded-[40px]">
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  Compatibilités observées
                </p>

                <ul className="mt-6 space-y-4">
                  {compatibilities.map((item: string) => (
                    <li key={item} className="text-sm leading-7 text-white/65">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="arhi-surface rounded-[32px] p-7 md:rounded-[40px]">
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  Points de vigilance
                </p>

                <ul className="mt-6 space-y-4">
                  {vigilances.map((item: string) => (
                    <li key={item} className="text-sm leading-7 text-white/65">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="arhi-surface rounded-[32px] p-7 md:rounded-[40px]">
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  Conditions favorables
                </p>

                <ul className="mt-6 space-y-4">
                  {favorableConditions.map((item: string) => (
                    <li key={item} className="text-sm leading-7 text-white/65">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <article className="arhi-surface rounded-[32px] p-8 md:rounded-[40px] md:p-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  Cohérence avec le poste
                </p>

                <p className="mt-6 whitespace-pre-line text-base leading-8 text-white/70">
                  {reading.coherence}
                </p>
              </article>

              <article className="arhi-surface rounded-[32px] p-8 md:rounded-[40px] md:p-10">
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  Synthèse finale
                </p>

                <p className="mt-6 whitespace-pre-line text-base leading-8 text-white/72">
                  {reading.final_reading}
                </p>
              </article>
            </section>

            <section className="mt-6 rounded-[32px] border border-white/10 bg-white/[0.025] p-7 md:rounded-[40px] md:p-8">
              <p className="text-sm leading-7 text-white/48">
                Cette lecture constitue un outil d’éclairage à la décision. Elle
                croise les repères observés chez le candidat, les exigences du
                poste et l’environnement réel de l’organisation. La décision
                finale appartient exclusivement à l’entreprise.
              </p>
            </section>
          </>
        )}
      </section>
    </LayoutShell>
  );
}