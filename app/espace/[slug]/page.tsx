import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: {
    slug: string;
  };
};

export default async function OrganisationSpacePage({
  params,
}: Props) {
  const { slug } = params;

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

  return (
    <LayoutShell>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="arhi-label">
            Environnement ARHI
          </p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            {organisation.company_name}
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            Cet espace rassemble l’environnement organisationnel,
            les postes contextualisés et les lectures candidates
            liées à cette structure.
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
          <p className="arhi-label">
            ADN organisationnel
          </p>

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
          <p className="arhi-label">
            Postes contextualisés
          </p>

          <h2 className="mt-6 max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
            Environnements professionnels actifs.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {positions?.map((position) => (
            <article
              key={position.id}
              className="arhi-surface rounded-[34px] p-8"
            >
              <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/80">
                Poste contextualisé
              </p>

              <h3 className="mt-5 text-3xl font-light leading-tight tracking-[-0.035em] text-white">
                {position.title}
              </h3>

              <p className="arhi-muted mt-6 text-sm leading-7">
                {position.description ||
                  position.main_function}
              </p>

              <div className="mt-8">
                <Link
                  href={`/entreprise/dashboard/postes/${position.id}`}
                  className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm"
                >
                  Voir les lectures
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </LayoutShell>
  );
}