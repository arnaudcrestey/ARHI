import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";
import { ClosePositionButton } from "@/components/close-position-button";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function OrganisationSpacePage({ params }: Props) {
  const { slug } = await params;

  const { data: organisation } = await supabase
    .from("arhi_organisations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!organisation) {
    notFound();
  }

  const { data: environment } = await supabase
    .from("arhi_environnements")
    .select("*")
    .eq("organisation_id", organisation.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { data: positions } = await supabase
    .from("arhi_positions")
    .select("*")
    .eq("organisation_id", organisation.id)
    .order("created_at", { ascending: false });

  const activePositions =
    positions?.filter((position) => position.status !== "closed") || [];

  const closedPositions =
    positions?.filter((position) => position.status === "closed") || [];

  return (
    <LayoutShell>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="arhi-label">Environnement ARHI</p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            {organisation.company_name}
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            Cet espace rassemble l’environnement organisationnel, les postes
            contextualisés et les lectures candidates liées à cette structure.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/entreprise/setup/positions"
              className="arhi-button-primary inline-flex justify-center px-8 py-4 text-sm"
            >
              Ajouter un poste
            </Link>

            <Link
              href="/entreprise/setup/environnement"
              className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
            >
              Modifier l’environnement
            </Link>
          </div>
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <p className="arhi-label">ADN organisationnel</p>

          <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
            <p className="whitespace-pre-line text-sm leading-8 text-white/75">
              {environment?.organisation_dna ||
                "Aucune lecture organisationnelle disponible."}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div>
          <p className="arhi-label">Postes contextualisés</p>

          <h2 className="mt-6 max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
            Environnements professionnels actifs.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {activePositions.length > 0 ? (
            activePositions.map((position) => (
              <article key={position.id} className="arhi-surface rounded-[34px] p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/80">
                    Poste contextualisé
                  </p>

                  <span className="rounded-full border border-[#C8A96A]/25 px-4 py-2 text-[9px] uppercase tracking-[0.24em] text-[#C8A96A]/80">
                    Actif
                  </span>
                </div>

                <h3 className="mt-5 text-3xl font-light leading-tight tracking-[-0.035em] text-white">
                  {position.title}
                </h3>

                <p className="arhi-muted mt-6 text-sm leading-7">
                  {position.description || position.main_function}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/entreprise/dashboard/postes/${position.id}`}
                    className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm"
                  >
                    Voir les lectures
                  </Link>

                  <Link
                    href={`/entreprise/diffusion/${position.id}`}
                    className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/45 transition hover:border-white/25 hover:text-white"
                  >
                    Diffuser
                  </Link>

                  <ClosePositionButton positionId={position.id} />
                </div>
              </article>
            ))
          ) : (
            <div className="arhi-surface rounded-[34px] p-8 lg:col-span-2">
              <p className="text-sm leading-7 text-white/50">
                Aucun poste actif pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {closedPositions.length > 0 && (
        <section className="mt-20">
          <div>
            <p className="arhi-label">Historique</p>

            <h2 className="mt-6 max-w-3xl text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-4xl">
              Recrutements clôturés.
            </h2>
          </div>

          <div className="mt-8 grid gap-4">
            {closedPositions.map((position) => (
              <article
                key={position.id}
                className="rounded-[26px] border border-white/[0.06] bg-white/[0.018] p-6"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-white/28">
                      Poste clôturé
                    </p>

                    <h3 className="mt-3 text-xl font-light text-white/70">
                      {position.title}
                    </h3>
                  </div>

                  <Link
                    href={`/entreprise/dashboard/postes/${position.id}`}
                    className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/45 transition hover:border-white/25 hover:text-white"
                  >
                    Consulter l’historique
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </LayoutShell>
  );
}
