import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { AnnouncementGenerator } from "@/components/announcement-generator";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Props = {
  params: Promise<{
    positionId: string;
  }>;
  searchParams: Promise<{
    format?: string;
  }>;
};

const formats = {
  site: {
    label: "Site emploi",
    title: "Version structurée",
    description:
      "Une annonce claire, lisible et adaptée aux plateformes de recrutement.",
  },
  linkedin: {
    label: "LinkedIn",
    title: "Version sociale",
    description:
      "Une annonce plus directe, adaptée à une diffusion professionnelle visible.",
  },
  court: {
    label: "Version courte",
    title: "Diffusion rapide",
    description:
      "Une version synthétique pour une prise de contact ou une diffusion rapide.",
  },
  humain: {
    label: "Plus humaine",
    title: "Version incarnée",
    description:
      "Une annonce plus sensible, centrée sur la réalité humaine du collectif.",
  },
};

function getSelectedFormat(value?: string) {
  if (value === "linkedin") return "linkedin";
  if (value === "court") return "court";
  if (value === "humain") return "humain";
  return "site";
}



export default async function PositionDiffusionPage({
  params,
  searchParams,
}: Props) {
  const resolvedParams = await params;

const { positionId } = resolvedParams;
  const resolvedSearchParams = await searchParams;

const selectedFormat = getSelectedFormat(
  typeof resolvedSearchParams?.format === "string"
    ? resolvedSearchParams.format
    : undefined
);

  const { data: position } = await supabase
    .from("arhi_positions")
    .select("*")
    .eq("id", positionId)
    .maybeSingle();

  if (!position) {
    notFound();
  }

  const { data: organisation } = await supabase
    .from("arhi_organisations")
    .select("*")
    .eq("id", position.organisation_id)
    .maybeSingle();

  const { data: environment } = await supabase
    .from("arhi_environnements")
    .select("*")
    .eq("organisation_id", position.organisation_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const organisationName =
    organisation?.company_name || "L’organisation";

  const activity =
    organisation?.activity || "Activité non renseignée";

  const positionTitle =
    position.title || "Poste non renseigné";

  const positionDescription =
    position.description ||
    position.main_function ||
    "Fonction principale non renseignée.";

  const current = formats[selectedFormat];

  

  return (
    <LayoutShell>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="arhi-label">Diffusion contextualisée</p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Préparer une annonce contextualisée.
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            ARHI prépare une version de diffusion à partir du poste, de
            l’organisation et du contexte professionnel réel.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/entreprise/dashboard"
              className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
            >
              Retour à l’environnement
            </Link>
          </div>
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <p className="arhi-label">Version préparée</p>

          <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-4xl">
            {current.title}
          </h2>

          <p className="mt-6 text-sm leading-8 text-white/60">
            {current.description}
          </p>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
              Poste
            </p>

            <p className="mt-4 text-xl font-light text-white">
              {positionTitle}
            </p>

            <p className="mt-4 text-sm leading-8 text-white/60">
              {positionDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="arhi-label">Annonce préparée</p>

            <h2 className="mt-6 text-4xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
              {current.label}
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {Object.entries(formats).map(([key, format]) => (
              <Link
                key={key}
                href={`/entreprise/diffusion/${positionId}?format=${key}`}
                className={`rounded-full border px-5 py-3 text-sm transition ${
                  selectedFormat === key
                    ? "border-[#C8A96A]/50 bg-[#C8A96A]/10 text-[#E5D1A1]"
                    : "border-white/10 text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                {format.label}
              </Link>
            ))}
          </div>
        </div>

        <AnnouncementGenerator
  format={selectedFormat}
  organisationName={organisationName}
  activity={activity}
  organisationDna={environment?.organisation_dna || ""}
  positionTitle={positionTitle}
  positionDescription={positionDescription}
/>

        
      </section>
    </LayoutShell>
  );
}
