"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { supabase } from "@/lib/supabase";

const questions = [
  {
    key: "collectiveRhythm",
    label: "Rythme collectif",
    placeholder:
      "Ex. rythme rapide, urgences fréquentes, fonctionnement stable, périodes de tension...",
  },
  {
    key: "autonomyLevel",
    label: "Autonomie réelle",
    placeholder:
      "Ex. forte autonomie, validation régulière, décisions partagées, cadre très structuré...",
  },
  {
    key: "decisionStructure",
    label: "Structure décisionnelle",
    placeholder:
      "Ex. décisions centralisées, décisions rapides, plusieurs niveaux de validation...",
  },
  {
    key: "communicationStyle",
    label: "Communication interne",
    placeholder:
      "Ex. communication directe, échanges informels, réunions fréquentes, faible circulation...",
  },
  {
    key: "relationalStability",
    label: "Stabilité relationnelle",
    placeholder:
      "Ex. équipe stable, tensions ponctuelles, ajustements fréquents, forte cohésion...",
  },
  {
    key: "pressureLevel",
    label: "Gestion de la pression",
    placeholder:
      "Ex. pression régulière, pics d’activité, charge mentale élevée, environnement calme...",
  },
] as const;

export default function EntrepriseEnvironmentPage() {
  const router = useRouter();

  const [environmentId, setEnvironmentId] = useState<string | null>(null);

  const [collectiveRhythm, setCollectiveRhythm] = useState("");
  const [autonomyLevel, setAutonomyLevel] = useState("");
  const [decisionStructure, setDecisionStructure] = useState("");
  const [communicationStyle, setCommunicationStyle] = useState("");
  const [relationalStability, setRelationalStability] = useState("");
  const [pressureLevel, setPressureLevel] = useState("");

  const [loading, setLoading] = useState(false);
  const [loadingExisting, setLoadingExisting] = useState(true);

  useEffect(() => {
    const loadExistingEnvironment = async () => {
      const organisationId = localStorage.getItem("arhi_organisation_id");

      if (!organisationId) {
        setLoadingExisting(false);
        return;
      }

      const { data } = await supabase
        .from("arhi_environnements")
        .select("*")
        .eq("organisation_id", organisationId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setEnvironmentId(data.id);
        setCollectiveRhythm(data.collective_rhythm || "");
        setAutonomyLevel(data.autonomy_level || "");
        setDecisionStructure(data.decision_structure || "");
        setCommunicationStyle(data.communication_style || "");
        setRelationalStability(data.relational_stability || "");
        setPressureLevel(data.pressure_level || "");
      }

      setLoadingExisting(false);
    };

    loadExistingEnvironment();
  }, []);

  const values = {
    collectiveRhythm,
    autonomyLevel,
    decisionStructure,
    communicationStyle,
    relationalStability,
    pressureLevel,
  };

  const setters = {
    collectiveRhythm: setCollectiveRhythm,
    autonomyLevel: setAutonomyLevel,
    decisionStructure: setDecisionStructure,
    communicationStyle: setCommunicationStyle,
    relationalStability: setRelationalStability,
    pressureLevel: setPressureLevel,
  };

  const generateOrganisationDna = async () => {
    const response = await fetch("/api/arhi/generate-dna", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collective_rhythm: collectiveRhythm,
        autonomy_level: autonomyLevel,
        decision_structure: decisionStructure,
        communication_style: communicationStyle,
        relational_stability: relationalStability,
        pressure_level: pressureLevel,
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur génération ADN ARHI");
    }

    const data = await response.json();

    return data.organisation_dna as string;
  };

  const handleSubmit = async () => {
    const organisationId = localStorage.getItem("arhi_organisation_id");

    if (!organisationId) {
      alert("Aucune organisation ARHI active. Merci de recommencer l’ouverture.");
      router.push("/entreprise/setup");
      return;
    }

    if (
      !collectiveRhythm ||
      !autonomyLevel ||
      !decisionStructure ||
      !communicationStyle ||
      !relationalStability ||
      !pressureLevel
    ) {
      alert("Merci de compléter les informations sur l’environnement professionnel.");
      return;
    }

    setLoading(true);

    try {
      const organisationDna = await generateOrganisationDna();

      const payload = {
        organisation_id: organisationId,
        collective_rhythm: collectiveRhythm,
        autonomy_level: autonomyLevel,
        decision_structure: decisionStructure,
        communication_style: communicationStyle,
        relational_stability: relationalStability,
        pressure_level: pressureLevel,
        organisation_dna: organisationDna,
      };

      let error = null;
      let savedEnvironmentId = environmentId;

      if (environmentId) {
        const result = await supabase
          .from("arhi_environnements")
          .update(payload)
          .eq("id", environmentId);

        error = result.error;
      } else {
        const result = await supabase
          .from("arhi_environnements")
          .insert(payload)
          .select("id")
          .single();

        error = result.error;
        savedEnvironmentId = result.data?.id || null;
      }

      if (error) {
        console.error(error);
        alert("Une erreur est survenue pendant l’enregistrement de l’environnement.");
        return;
      }

      if (savedEnvironmentId) {
        setEnvironmentId(savedEnvironmentId);
      }

      router.push("/entreprise/setup/positions");
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue pendant la génération de l’ADN ARHI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutShell>
      <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="arhi-label">Étape 02</p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Décrire l’environnement professionnel.
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            Cette étape permet de préciser le fonctionnement réel de
            l’organisation : rythme, autonomie, décision, communication,
            stabilité et pression.
          </p>

          <div className="mt-10">
            <Link
              href="/entreprise/setup"
              className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
            >
              Retour
            </Link>
          </div>
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <p className="arhi-label">Organisation</p>

          <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-4xl">
            Renseigner les repères humains de l’organisation.
          </h2>

          <p className="arhi-muted mt-6 leading-8">
            Ces informations permettent à ARHI de comprendre le fonctionnement
            réel de l’organisation avant toute analyse candidat.
          </p>

          {loadingExisting ? (
            <div className="mt-10 rounded-[26px] border border-white/10 bg-white/[0.025] p-6">
              <p className="text-sm text-white/50">
                Chargement de l’environnement ARHI...
              </p>
            </div>
          ) : (
            <form className="mt-10 space-y-6">
              {questions.map((question) => (
                <div key={question.key}>
                  <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                    {question.label}
                  </label>

                  <textarea
                    rows={3}
                    value={values[question.key]}
                    onChange={(event) =>
                      setters[question.key](event.target.value)
                    }
                    placeholder={question.placeholder}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
                  />
                </div>
              ))}

              <div className="pt-4">
  {loading ? (
    <div className="rounded-[26px] border border-[#C8A96A]/25 bg-[#C8A96A]/[0.06] p-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[#F2E2BE]">
          Préparation de l’environnement ARHI
        </p>

        <div className="h-4 w-4 animate-spin rounded-full border border-[#C8A96A]/25 border-t-[#C8A96A]" />
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C8A96A]/35 text-[10px] text-[#C8A96A]">
            ✓
          </span>
          <span>Enregistrement des repères humains</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/60">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#C8A96A]/35 text-[10px] text-[#C8A96A]">
            ✓
          </span>
          <span>Analyse du fonctionnement de l’organisation</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/45">
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/15 text-[10px] text-white/35">
            3
          </span>
          <span>Préparation de l’étape postes</span>
        </div>
      </div>
    </div>
  ) : (
    <button
      type="button"
      onClick={handleSubmit}
      disabled={loading}
      className="arhi-button-primary inline-flex w-full justify-center px-8 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
    >
      Continuer vers les postes
    </button>
  )}
</div>
      </form>
          )}
        </div>
      </section>
    </LayoutShell>
  );
}