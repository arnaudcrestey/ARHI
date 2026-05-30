"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LayoutShell } from "@/components/layout-shell";
import { supabase } from "@/lib/supabase";

type Organisation = {
  id: string;
  company_name: string | null;
  activity: string | null;
  slug: string | null;
  plan?: string | null;
  founder_access?: boolean | null;
};

type Environment = {
  organisation_dna: string | null;
};

type Position = {
  id: string;
  title: string | null;
  description?: string | null;
  main_function?: string | null;
  autonomie?: boolean;
  rythme?: boolean;
  interactions?: boolean;
  pression?: boolean;
  adaptation?: boolean;
  stabilite?: boolean;
  slug?: string | null;
  status?: "active" | "closed" | string | null;
};

type CandidateRoute = {
  id: string;
  position_id: string | null;
  slug: string;
};

function createSecureCandidateSlug() {
  const code =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `arhi-${code}`;
}

function getPositionDescription(position: Position) {
  return (
    position.description ||
    position.main_function ||
    "Fonction principale non renseignée."
  );
}

function getPositionMarkers(position: Position) {
  const markers = [];

  if (position.autonomie) markers.push("Autonomie");
  if (position.rythme) markers.push("Rythme");
  if (position.interactions) markers.push("Interactions");
  if (position.pression) markers.push("Pression");
  if (position.adaptation) markers.push("Adaptation");
  if (position.stabilite) markers.push("Stabilité");

  return markers;
}

export default function EntrepriseDashboardPage() {
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [environment, setEnvironment] = useState<Environment | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [candidateRoutes, setCandidateRoutes] = useState<
    Record<string, CandidateRoute>
  >({});
  const [loading, setLoading] = useState(true);
  const [generatingPositionId, setGeneratingPositionId] = useState<string | null>(
    null
  );
  const [updatingPositionId, setUpdatingPositionId] = useState<string | null>(
    null
  );
  const [copiedPositionId, setCopiedPositionId] = useState<string | null>(null);
  const [copiedEnvironmentLink, setCopiedEnvironmentLink] = useState(false);

  const activePositions = useMemo(() => {
    return positions.filter((position) => position.status !== "closed");
  }, [positions]);

  const closedPositions = useMemo(() => {
    return positions.filter((position) => position.status === "closed");
  }, [positions]);

  const environmentUrl = useMemo(() => {
    if (!organisation?.slug) return null;

    if (typeof window === "undefined") {
      return `/espace/${organisation.slug}`;
    }

    return `${window.location.origin}/espace/${organisation.slug}`;
  }, [organisation?.slug]);

  const loadDashboard = async () => {
    const organisationId = localStorage.getItem("arhi_organisation_id");

    if (!organisationId) {
      setLoading(false);
      return;
    }

    const { data: organisationData } = await supabase
      .from("arhi_organisations")
      .select("*")
      .eq("id", organisationId)
      .maybeSingle();

    const { data: environmentData } = await supabase
      .from("arhi_environnements")
      .select("*")
      .eq("organisation_id", organisationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data: positionsData } = await supabase
      .from("arhi_positions")
      .select("*")
      .eq("organisation_id", organisationId)
      .order("created_at", { ascending: false });

    const { data: routesData } = await supabase
      .from("arhi_candidate_routes")
      .select("*")
      .eq("organisation_id", organisationId);

    const routesByPosition: Record<string, CandidateRoute> = {};

    routesData?.forEach((route) => {
      if (route.position_id) {
        routesByPosition[route.position_id] = route;
      }
    });

    setOrganisation(organisationData);
    setEnvironment(environmentData);
    setPositions(positionsData || []);
    setCandidateRoutes(routesByPosition);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const generateCandidateRoute = async (position: Position) => {
    if (!organisation) {
      alert("Organisation manquante.");
      return;
    }

    if (position.status === "closed") {
      alert("Ce poste est clôturé.");
      return;
    }

    const existingRoute = candidateRoutes[position.id];

    if (existingRoute) return;

    setGeneratingPositionId(position.id);

    const slug = createSecureCandidateSlug();

    const { data, error } = await supabase
      .from("arhi_candidate_routes")
      .insert({
        organisation_id: organisation.id,
        position_id: position.id,
        slug,
      })
      .select("*")
      .single();

    setGeneratingPositionId(null);

    if (error || !data) {
      console.error(error);
      alert("Erreur génération du lien candidat.");
      return;
    }

    setCandidateRoutes((current) => ({
      ...current,
      [position.id]: data,
    }));
  };

  const updatePositionStatus = async (
    positionId: string,
    status: "active" | "closed"
  ) => {
    setUpdatingPositionId(positionId);

    const { error } = await supabase
      .from("arhi_positions")
      .update({ status })
      .eq("id", positionId);

    setUpdatingPositionId(null);

    if (error) {
      console.error(error);
      alert("Impossible de modifier l’état du poste.");
      return;
    }

    setPositions((current) =>
      current.map((position) =>
        position.id === positionId ? { ...position, status } : position
      )
    );
  };

  const copyEnvironmentLink = async () => {
    if (!environmentUrl) return;

    await navigator.clipboard.writeText(environmentUrl);
    setCopiedEnvironmentLink(true);

    setTimeout(() => {
      setCopiedEnvironmentLink(false);
    }, 1800);
  };

  const copyCandidateLink = async (position: Position) => {
    const route = candidateRoutes[position.id];

    if (!route) return;

    const url = `${window.location.origin}/candidat/parcours/${route.slug}`;

    await navigator.clipboard.writeText(url);
    setCopiedPositionId(position.id);

    setTimeout(() => {
      setCopiedPositionId(null);
    }, 1800);
  };

  if (loading) {
    return (
      <LayoutShell>
        <section className="mx-auto max-w-6xl">
          <p className="arhi-label">Espace entreprise</p>

          <h1 className="mt-8 text-4xl font-light text-white">
            Chargement de l’environnement ARHI...
          </h1>
        </section>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="arhi-label">Espace entreprise</p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Votre environnement ARHI est actif.
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            L’organisation dispose désormais d’un noyau environnemental, de
            postes contextualisés et d’une base exploitable pour générer des
            parcours candidats propres à chaque poste.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                Postes
              </p>
              <p className="mt-3 text-3xl font-light text-white">
                {positions.length}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                Actifs
              </p>
              <p className="mt-3 text-3xl font-light text-white">
                {activePositions.length}
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-white/35">
                Clôturés
              </p>
              <p className="mt-3 text-3xl font-light text-white">
                {closedPositions.length}
              </p>
            </div>
          </div>

          {environmentUrl && (
            <div className="mt-8 rounded-[30px] border border-[#C8A96A]/25 bg-[#C8A96A]/[0.07] p-6 shadow-[0_0_80px_rgba(200,169,106,0.08)]">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Lien privé de votre environnement ARHI
              </p>

              <h2 className="mt-5 text-2xl font-light leading-tight tracking-[-0.035em] text-white md:text-3xl">
                Conservez ce lien pour revenir à votre espace.
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/60">
                Ce lien permet à l’entreprise de retrouver son ADN
                organisationnel, ses postes et les lectures candidates associées.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                <p className="break-all text-sm leading-7 text-[#E5D1A1]">
                  {environmentUrl}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={copyEnvironmentLink}
                  className="arhi-button-primary inline-flex justify-center px-8 py-4 text-sm"
                >
                  {copiedEnvironmentLink
                    ? "Lien ARHI copié"
                    : "Copier mon lien ARHI"}
                </button>

                <Link
                  href="/entreprise/setup/environnement"
                  className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
                >
                  Modifier l’environnement
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <p className="arhi-label">Synthèse organisationnelle</p>

          <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-4xl">
            ADN organisationnel initial.
          </h2>

          <div className="mt-10 space-y-6">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                Organisation
              </p>

              <p className="mt-4 text-2xl font-light text-white">
                {organisation?.company_name || "Organisation non définie"}
              </p>

              <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/40">
                {organisation?.activity || "Activité non renseignée"}
              </p>
              <div className="mt-6 rounded-[22px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.07] p-5">
  <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]">
    Programme Fondateur
  </p>

  <p className="mt-3 text-sm leading-7 text-white/70">
    ARHI est actuellement accessible avant son ouverture commerciale.
  </p>

  <div className="mt-5 grid gap-3 text-sm text-white/65">
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <span>Mise en place ARHI</span>
      <span className="text-[#E5D1A1]">490 €</span>
    </div>

    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <span>ARHI Recrutement</span>
      <span className="text-[#E5D1A1]">99 €/mois</span>
    </div>
  </div>
</div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                ADN organisationnel
              </p>

              <p className="mt-4 whitespace-pre-line text-sm leading-8 text-white/75">
                {environment?.organisation_dna ||
                  "L’ADN organisationnel sera généré après la lecture environnementale."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="arhi-label">Postes contextualisés</p>

            <h2 className="mt-6 max-w-3xl text-4xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
              Piloter les parcours candidats par poste.
            </h2>

            <p className="arhi-muted mt-5 max-w-2xl text-sm leading-7">
              Chaque poste peut disposer d’un lien candidat dédié et d’un espace
              de lecture associé.
            </p>
          </div>

          <Link
            href="/entreprise/setup/positions"
            className="arhi-button-primary inline-flex justify-center px-8 py-4 text-sm"
          >
            Ajouter un poste
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {positions.length === 0 ? (
            <div className="arhi-surface rounded-[34px] p-8">
              <p className="text-sm leading-7 text-white/60">
                Aucun poste n’a encore été enregistré.
              </p>
            </div>
          ) : (
            positions.map((position) => {
              const route = candidateRoutes[position.id];
              const markers = getPositionMarkers(position);
              const candidateUrl = route
                ? `/candidat/parcours/${route.slug}`
                : null;
              const isClosed = position.status === "closed";

              return (
                <article
                  key={position.id}
                  className={`arhi-surface rounded-[34px] p-7 md:p-8 ${
                    isClosed ? "opacity-65" : ""
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.32em] text-[#C8A96A]/80">
                        Poste contextualisé
                      </p>

                      <h3 className="mt-5 text-3xl font-light leading-tight tracking-[-0.035em] text-white">
                        {position.title || "Poste sans titre"}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] ${
                        isClosed
                          ? "border-white/10 text-white/35"
                          : route
                          ? "border-[#C8A96A]/25 bg-[#C8A96A]/10 text-[#E5D1A1]"
                          : "border-white/10 text-white/45"
                      }`}
                    >
                      {isClosed
                        ? "Clôturé"
                        : route
                        ? "Lien actif"
                        : "Lien à générer"}
                    </span>
                  </div>

                  <p className="arhi-muted mt-6 text-sm leading-7">
                    {getPositionDescription(position)}
                  </p>

                  {markers.length > 0 && (
                    <div className="mt-7 flex flex-wrap gap-2">
                      {markers.map((marker) => (
                        <span
                          key={marker}
                          className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/[0.06] px-4 py-2 text-xs text-[#E5D1A1]"
                        >
                          {marker}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 rounded-[24px] border border-white/10 bg-black/10 p-5">
                    <p className="text-[10px] uppercase tracking-[0.32em] text-white/35">
                      Accès candidat
                    </p>

                    {isClosed ? (
                      <>
                        <p className="mt-4 text-sm leading-7 text-white/55">
                          Ce poste est clôturé. Les lectures restent consultables
                          pour conserver la mémoire de ce recrutement.
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                          <Link
                            href={`/entreprise/dashboard/postes/${position.id}`}
                            className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm"
                          >
                            Voir les lectures
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              updatePositionStatus(position.id, "active")
                            }
                            disabled={updatingPositionId === position.id}
                            className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm disabled:opacity-50"
                          >
                            {updatingPositionId === position.id
                              ? "Réactivation..."
                              : "Réactiver"}
                          </button>
                        </div>
                      </>
                    ) : candidateUrl ? (
                      <>
                        <p className="mt-4 break-all text-sm leading-7 text-[#C8A96A]">
                          {candidateUrl}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                          <button
                            type="button"
                            onClick={() => copyCandidateLink(position)}
                            className="arhi-button-primary inline-flex justify-center px-6 py-3 text-sm"
                          >
                            {copiedPositionId === position.id
                              ? "Lien copié"
                              : "Copier"}
                          </button>

                          <Link
                            href={candidateUrl}
                            className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm"
                          >
                            Ouvrir
                          </Link>

                          <Link
                            href={`/entreprise/dashboard/postes/${position.id}`}
                            className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm"
                          >
                            Candidats
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              updatePositionStatus(position.id, "closed")
                            }
                            disabled={updatingPositionId === position.id}
                            className="arhi-button-secondary inline-flex justify-center px-6 py-3 text-sm disabled:opacity-50"
                          >
                            {updatingPositionId === position.id
                              ? "Clôture..."
                              : "Clôturer"}
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => generateCandidateRoute(position)}
                        disabled={generatingPositionId === position.id}
                        className="mt-4 rounded-full border border-[#C8A96A]/30 px-5 py-3 text-sm text-[#C8A96A] transition hover:bg-[#C8A96A]/10 disabled:opacity-50"
                      >
                        {generatingPositionId === position.id
                          ? "Génération..."
                          : "Générer le lien candidat"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <section className="mt-24">
  <article className="arhi-surface overflow-hidden rounded-[34px] p-7 md:p-9">
    <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-stretch">
      <div className="flex min-h-[360px] flex-col justify-between">
        <div>
          <p className="arhi-label">Diffusion contextualisée</p>

          <h2 className="mt-6 max-w-2xl text-4xl font-light leading-tight tracking-[-0.045em] text-white md:text-5xl">
            Préparer une annonce cohérente avec le poste.
          </h2>

          <p className="arhi-muted mt-6 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            ARHI transforme la lecture du poste en versions d’annonce adaptées :
            sobre, professionnelle, humaine et prête à diffuser.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {[
            {
              title: "Site emploi",
              text: "Version structurée pour une annonce complète.",
            },
            {
              title: "LinkedIn",
              text: "Format plus direct pour publication réseau.",
            },
            {
              title: "Version courte",
              text: "Synthèse rapide pour diffusion légère.",
            },
            {
              title: "Plus humaine",
              text: "Angle relationnel et attractivité du poste.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[22px] border border-white/10 bg-black/15 p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#C8A96A]">
                {item.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/52">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-black/20 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/35">
            Postes disponibles
          </p>

          <span className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#E5D1A1]">
            {activePositions.length} actif
            {activePositions.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="mt-5 grid gap-3">
          {activePositions.length === 0 ? (
            <p className="rounded-2xl border border-white/10 bg-black/20 px-5 py-5 text-center text-sm text-white/45">
              Aucun poste actif disponible.
            </p>
          ) : (
            activePositions.map((position) => (
              <Link
                key={position.id}
                href={`/entreprise/diffusion/${position.id}`}
                className="group rounded-[20px] border border-white/10 bg-white/[0.025] px-5 py-4 transition duration-300 hover:border-[#C8A96A]/35 hover:bg-[#C8A96A]/[0.055]"
              >
                <div className="flex items-center justify-between gap-5">
                  <span className="line-clamp-1 text-sm text-white/72 transition group-hover:text-white">
                    {position.title || "Poste sans titre"}
                  </span>

                  <span className="shrink-0 text-[10px] uppercase tracking-[0.24em] text-[#C8A96A]">
                    Préparer
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>

        <div className="mt-6 rounded-[22px] border border-[#C8A96A]/15 bg-[#C8A96A]/[0.045] p-5">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#C8A96A]">
            Logique ARHI
          </p>

          <p className="mt-3 text-sm leading-7 text-white/58">
            Chaque annonce reste reliée à l’ADN organisationnel et aux exigences
            réelles du poste.
          </p>
        </div>
      </div>
    </div>
  </article>
</section>
    </LayoutShell>
  );
}