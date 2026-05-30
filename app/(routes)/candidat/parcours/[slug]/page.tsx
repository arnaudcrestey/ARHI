import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { CandidateStartForm } from "@/components/candidate-start-form";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CandidateRoutePage({ params }: Props) {
  const { slug } = await params;

  const { data: routeData, error: routeError } = await supabase
    .from("arhi_candidate_routes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (routeError || !routeData) {
    notFound();
  }

  const { data: organisation } = await supabase
    .from("arhi_organisations")
    .select("*")
    .eq("id", routeData.organisation_id)
    .single();

  const { data: environment } = await supabase
    .from("arhi_environnements")
    .select("*")
    .eq("organisation_id", routeData.organisation_id)
    .maybeSingle();

  const { data: position } = await supabase
    .from("arhi_positions")
    .select("*")
    .eq("id", routeData.position_id)
    .single();

  return (
    <LayoutShell>
      <section className="max-w-6xl">
        <p className="arhi-label">Parcours candidat</p>

        <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          {organisation?.company_name || "Organisation"}
        </h1>

        <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:mt-10 md:text-xl md:leading-9">
          Vous entrez dans un parcours ARHI relié à une organisation réelle, un
          poste précis et un environnement professionnel contextualisé.
        </p>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="arhi-surface rounded-[32px] p-7 md:rounded-[42px] md:p-14">
          <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
            <div>
              <p className="arhi-label">ADN organisationnel</p>

              <div className="mt-10 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                  Organisation
                </p>

                <p className="mt-5 text-2xl font-light text-white">
                  {organisation?.company_name || "Organisation non renseignée"}
                </p>
              </div>

              <div className="mt-5 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/35">
                  Poste
                </p>

                <p className="mt-5 text-2xl font-light text-white">
                  {position?.title || "Poste non renseigné"}
                </p>
              </div>

              <div className="mt-5 rounded-[26px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.045] p-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[#C8A96A]/80">
                  Étape préalable
                </p>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  Avant de commencer, merci de renseigner vos informations afin
                  que votre lecture soit correctement rattachée à votre
                  candidature.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
                L’environnement humain dans lequel le poste prend sens.
              </h2>

              <p className="arhi-muted mt-8 whitespace-pre-wrap text-base leading-8 md:text-lg md:leading-9">
                {environment?.organisation_dna ||
                  "L’ADN organisationnel sera affiché ici dès qu’il sera disponible."}
              </p>

              {position?.context && (
                <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
                  <p className="arhi-label">Poste contextualisé</p>

                  <p className="arhi-muted mt-6 text-base leading-8 md:text-lg md:leading-9">
                    {position.context}
                  </p>
                </div>
              )}

              <CandidateStartForm routeId={routeData.id} slug={slug} />
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}