import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type Candidate = {
  id: string;
  created_at: string;
  first_name: string | null;
  last_name: string | null;
  compatibility: string | null;
};

function getCandidateName(candidate: Candidate) {
  return (
    `${candidate.first_name ?? ""} ${candidate.last_name ?? ""}`.trim() ||
    "Candidat"
  );
}

export default async function PosteCandidatesPage({ params }: Props) {
  const { slug } = await params;

  const { data: position } = await supabase
    .from("arhi_positions")
    .select("*")
    .eq("id", slug)
    .maybeSingle();

  if (!position) {
    notFound();
  }

  const { data: candidates } = await supabase
    .from("arhi_candidates")
    .select("id, created_at, first_name, last_name, compatibility")
    .eq("position_id", position.id)
    .order("created_at", { ascending: false });

  const candidateList = (candidates || []) as Candidate[];

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <Link
          href="/entreprise/dashboard"
          className="text-sm text-white/45 transition hover:text-white"
        >
          ← Retour dashboard
        </Link>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="arhi-label">Candidatures reçues</p>

            <h1 className="mt-6 text-5xl font-light leading-[1.02] tracking-[-0.06em] text-white md:text-7xl">
              {position.title || "Poste sans titre"}
            </h1>

            <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
              Les profils ci-dessous ont finalisé leur parcours ARHI pour ce
              poste. Cette zone devient l’espace de lecture décisionnelle de
              l’entreprise.
            </p>
          </div>

          <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-8">
            <p className="arhi-label">Lecture poste</p>

            <p className="mt-5 text-2xl font-light leading-tight tracking-[-0.035em] text-white md:text-3xl">
              {candidateList.length === 0
                ? "Aucun profil transmis pour le moment."
                : `${candidateList.length} profil${
                    candidateList.length > 1 ? "s" : ""
                  } transmis pour ce contexte professionnel.`}
            </p>

            <p className="arhi-muted mt-5 text-sm leading-7">
              Les fiches permettent d’éclairer la cohérence humaine entre un
              candidat, un poste et l’ADN organisationnel associé.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6">
          {candidateList.length === 0 ? (
            <div className="arhi-surface rounded-[34px] p-8 md:p-10">
              <p className="arhi-label">En attente</p>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                Aucun candidat n’a encore finalisé sa lecture ARHI pour ce
                poste. Les profils apparaîtront ici automatiquement après
                transmission.
              </p>
            </div>
          ) : (
            candidateList.map((candidate) => (
              <article
                key={candidate.id}
                className="arhi-surface rounded-[34px] p-6 md:p-8"
              >
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/80">
                      Candidat analysé
                    </p>

                    <h2 className="mt-4 text-3xl font-light tracking-[-0.04em] text-white">
                      {getCandidateName(candidate)}
                    </h2>

                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/[0.06] px-4 py-2 text-xs text-[#E5D1A1]">
                        {candidate.compatibility || "Compatibilité à analyser"}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/entreprise/dashboard/candidats/${candidate.id}`}
                    className="arhi-button-primary inline-flex justify-center px-7 py-4 text-sm"
                  >
                    Ouvrir la fiche
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </LayoutShell>
  );
}
