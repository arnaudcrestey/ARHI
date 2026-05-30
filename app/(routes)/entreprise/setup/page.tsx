"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { supabase } from "@/lib/supabase";

const steps = [
  "Identification",
  "Environnement",
  "Postes",
  "Parcours",
  "Lectures",
];

function createOrganisationSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function EntrepriseSetupPage() {
  const router = useRouter();

  const [companyName, setCompanyName] = useState("");
  const [activity, setActivity] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  useEffect(() => {
    const loadExistingOrganisation = async () => {
      const organisationId = localStorage.getItem("arhi_organisation_id");

      if (!organisationId) {
        setLoadingExisting(false);
        return;
      }

      const { data, error } = await supabase
        .from("arhi_organisations")
        .select("*")
        .eq("id", organisationId)
        .maybeSingle();

      if (error || !data) {
        localStorage.removeItem("arhi_organisation_id");
        setLoadingExisting(false);
        return;
      }

      setCompanyName(data.company_name || "");
      setActivity(data.activity || "");
      setCompanySize(data.company_size || "");
      setEmail(data.email || "");

      setLoadingExisting(false);
    };

    loadExistingOrganisation();
  }, []);

  const handleSubmit = async () => {
    if (!companyName || !activity || !companySize || !email) {
      alert("Merci de compléter les informations de l’organisation.");
      return;
    }

    const organisationSlug = createOrganisationSlug(companyName);

    setLoading(true);

    const existingOrganisationId = localStorage.getItem("arhi_organisation_id");

    if (existingOrganisationId) {
      const { data: existingOrganisation } = await supabase
        .from("arhi_organisations")
        .select("id")
        .eq("id", existingOrganisationId)
        .maybeSingle();

      if (existingOrganisation) {
        const { error } = await supabase
          .from("arhi_organisations")
          .update({
            company_name: companyName,
            activity,
            company_size: companySize,
            email,
            slug: organisationSlug,
          })
          .eq("id", existingOrganisationId);

        setLoading(false);

        if (error) {
          console.error(error);
          alert("Une erreur est survenue pendant la mise à jour.");
          return;
        }

        router.push("/entreprise/setup/environnement");
        return;
      }

      localStorage.removeItem("arhi_organisation_id");
    }

    const { data, error } = await supabase
      .from("arhi_organisations")
      .insert({
        company_name: companyName,
        activity,
        company_size: companySize,
        email,
        slug: organisationSlug,
      })
      .select("id")
      .single();

    setLoading(false);

    if (error || !data) {
      console.error(error);
      alert("Une erreur est survenue pendant l’enregistrement.");
      return;
    }

    localStorage.setItem("arhi_organisation_id", data.id);

    router.push("/entreprise/setup/environnement");
  };

  return (
    <LayoutShell>
      <section className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <div className="flex flex-col justify-between">
          <div>
            <p className="arhi-label">Création environnement</p>

            <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
              Création de votre environnement ARHI.
            </h1>

            <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
              Cette première étape permet d’identifier l’organisation avant de
              structurer progressivement son fonctionnement réel, ses postes et
              ses futurs parcours candidats contextualisés.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-5 lg:mt-20 lg:grid-cols-1">
            {steps.map((item, index) => (
              <div
                key={item}
                className={`rounded-2xl border px-5 py-4 ${
                  index === 0
                    ? "border-[#C8A96A]/50 bg-[#C8A96A]/10"
                    : "border-white/10 bg-white/[0.025]"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <p className="mt-3 text-sm text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <div className="mb-10">
            <p className="arhi-label">Étape 01</p>

            <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-4xl">
              Identifier l’organisation.
            </h2>

            <p className="arhi-muted mt-6 leading-8">
              Les informations demandées ici servent uniquement à créer le
              contexte de départ de l’environnement ARHI.
            </p>
          </div>

          {loadingExisting ? (
            <div className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm text-white/50">
                Chargement de l’environnement...
              </p>
            </div>
          ) : (
            <form className="space-y-6">
              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                  Nom de l’entreprise
                </label>

                <input
                  type="text"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="Ex. Atelier Durand"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                  Activité principale
                </label>

                <input
                  type="text"
                  value={activity}
                  onChange={(event) => setActivity(event.target.value)}
                  placeholder="Ex. Industrie, services, commerce, accompagnement..."
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                  Taille de la structure
                </label>

                <input
                  type="text"
                  value={companySize}
                  onChange={(event) => setCompanySize(event.target.value)}
                  placeholder="Ex. 1-10, 10-50, 50-250, 250+"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
                />
              </div>

              <div>
                <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                  Email référent
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="contact@entreprise.fr"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="arhi-button-primary inline-flex w-full justify-center px-8 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Enregistrement..."
                    : "Continuer la lecture environnementale"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-10 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
            <p className="text-sm leading-7 text-white/45">
              ARHI ne produit aucun score automatique à cette étape. Le système
              construit d’abord un contexte organisationnel lisible avant toute
              analyse candidat.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}