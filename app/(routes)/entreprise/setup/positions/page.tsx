"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutShell } from "@/components/layout-shell";
import { supabase } from "@/lib/supabase";

const positionDimensions = [
  "Autonomie attendue",
  "Rythme du poste",
  "Niveau d’interactions",
  "Exposition à la pression",
  "Adaptation aux imprévus",
  "Stabilité nécessaire",
];

const dimensionDescriptions: Record<string, string> = {
  "Autonomie attendue": "Capacité à avancer sans supervision permanente.",
  "Rythme du poste": "Intensité quotidienne, régularité et cadence de travail.",
  "Niveau d’interactions": "Fréquence des échanges internes, clients ou partenaires.",
  "Exposition à la pression": "Présence d’urgence, d’enjeux ou de contraintes fortes.",
  "Adaptation aux imprévus": "Capacité à absorber les changements et ajustements.",
  "Stabilité nécessaire": "Besoin de méthode, de continuité et de régularité.",
};

function createSlug(value: string) {
  return (
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") +
    "-" +
    Date.now()
  );
}

export default function EntreprisePositionsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [mainFunction, setMainFunction] = useState("");
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [organisationReady, setOrganisationReady] = useState(false);

  useEffect(() => {
    const organisationId = localStorage.getItem("arhi_organisation_id");

    if (!organisationId) {
      router.push("/entreprise/setup");
      return;
    }

    setOrganisationReady(true);
  }, [router]);

  const completionScore = useMemo(() => {
    let score = 0;

    if (title.trim()) score += 35;
    if (mainFunction.trim()) score += 35;
    if (selectedDimensions.length > 0) score += 30;

    return score;
  }, [title, mainFunction, selectedDimensions.length]);

  const toggleDimension = (dimension: string) => {
    setSelectedDimensions((current) =>
      current.includes(dimension)
        ? current.filter((item) => item !== dimension)
        : [...current, dimension]
    );
  };

  const resetForm = () => {
    setTitle("");
    setMainFunction("");
    setSelectedDimensions([]);
  };

  const handleSubmit = async () => {
    const organisationId = localStorage.getItem("arhi_organisation_id");

    if (!organisationId) {
      alert("Aucune organisation ARHI active. Merci de recommencer l’ouverture.");
      router.push("/entreprise/setup");
      return;
    }

    if (!title || !mainFunction || selectedDimensions.length === 0) {
      alert("Merci de compléter les informations du poste.");
      return;
    }

    setLoading(true);

    const slug = createSlug(title);

    const { error } = await supabase.from("arhi_positions").insert({
      organisation_id: organisationId,
      title,
      description: mainFunction,

      autonomie: selectedDimensions.includes("Autonomie attendue"),
      rythme: selectedDimensions.includes("Rythme du poste"),
      interactions: selectedDimensions.includes("Niveau d’interactions"),
      pression: selectedDimensions.includes("Exposition à la pression"),
      adaptation: selectedDimensions.includes("Adaptation aux imprévus"),
      stabilite: selectedDimensions.includes("Stabilité nécessaire"),

      slug,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Une erreur est survenue pendant l’enregistrement du poste.");
      return;
    }

    resetForm();
    router.push("/entreprise/dashboard");
  };

  if (!organisationReady) {
    return (
      <LayoutShell>
        <section className="mx-auto max-w-6xl">
          <p className="arhi-label">Postes</p>

          <h1 className="mt-8 text-4xl font-light text-white">
            Vérification de l’environnement ARHI...
          </h1>
        </section>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell>
      <section className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
        <div>
          <p className="arhi-label">Étape 03</p>

          <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
            Construction des postes contextualisés.
          </h1>

          <p className="arhi-muted mt-8 max-w-2xl text-base leading-8 md:text-lg md:leading-9">
            ARHI ne crée pas une fiche de poste classique. Le système cherche à
            comprendre le fonctionnement réel attendu dans chaque poste.
          </p>

          <div className="mt-10 rounded-[30px] border border-white/10 bg-white/[0.025] p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[#F2E2BE]">
              Lecture préparée
            </p>

            <div className="mt-6 space-y-4">
              {[
                "Autonomie réelle attendue",
                "Rythme quotidien du poste",
                "Interactions humaines dominantes",
                "Exposition aux tensions",
                "Adaptation aux imprévus",
                "Besoin de stabilité",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-white/65"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8A96A]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[30px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.055] p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs uppercase tracking-[0.28em] text-[#F2E2BE]">
                Avancement
              </p>

              <span className="text-xs text-white/45">{completionScore}%</span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#C8A96A] transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>

            <p className="mt-4 text-sm leading-6 text-white/55">
              Le poste pourra être enregistré dès que son intitulé, sa fonction
              principale et au moins une dimension ARHI seront renseignés.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            
            <Link
              href="/entreprise/setup/environnement"
              className="arhi-button-secondary inline-flex justify-center px-8 py-4 text-sm"
            >
              Retour
            </Link>
          </div>
        </div>

        <div className="arhi-surface rounded-[32px] p-6 md:rounded-[42px] md:p-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="arhi-label">Poste contextualisé</p>

              <h2 className="mt-6 text-3xl font-light leading-tight tracking-[-0.035em] text-white md:text-4xl">
                Définir le fonctionnement réel du poste.
              </h2>
            </div>

            <div className="hidden rounded-full border border-[#C8A96A]/25 bg-[#C8A96A]/10 px-4 py-2 text-xs text-[#F2E2BE] sm:block">
              ARHI
            </div>
          </div>

          <p className="arhi-muted mt-6 leading-8">
            Chaque poste enregistré servira de base à un futur parcours candidat
            contextualisé.
          </p>

          <form className="mt-10 space-y-7">
            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                Intitulé du poste
              </label>

              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex. Assistant de direction, comptable, responsable atelier..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
              />
            </div>

            <div>
              <label className="mb-3 block text-xs uppercase tracking-[0.28em] text-white/45">
                Fonction principale
              </label>

              <textarea
                value={mainFunction}
                onChange={(event) => setMainFunction(event.target.value)}
                placeholder="Décrire simplement ce que la personne devra réellement porter au quotidien."
                rows={5}
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-base text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/60 focus:bg-white/[0.055]"
              />
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.28em] text-white/45">
                  Dimensions du poste
                </p>

                <span className="text-xs text-white/35">
                  {selectedDimensions.length}/6 sélectionnée
                  {selectedDimensions.length > 1 ? "s" : ""}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {positionDimensions.map((item) => {
                  const isSelected = selectedDimensions.includes(item);

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleDimension(item)}
                      className={`group text-left rounded-2xl border p-5 transition ${
                        isSelected
                          ? "border-[#C8A96A]/60 bg-[#C8A96A]/10 text-white"
                          : "border-white/10 bg-white/[0.025] text-white/75 hover:border-[#C8A96A]/40 hover:bg-white/[0.045]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] transition ${
                            isSelected
                              ? "border-[#C8A96A] bg-[#C8A96A] text-[#06101F]"
                              : "border-white/20 text-transparent group-hover:border-[#C8A96A]/50"
                          }`}
                        >
                          ✓
                        </span>

                        <span>
                          <span className="block text-sm">{item}</span>
                          <span className="mt-2 block text-xs leading-5 text-white/42">
                            {dimensionDescriptions[item]}
                          </span>
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-black/15 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-[#F2E2BE]">
                Synthèse immédiate
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">
                    Poste
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {title.trim() || "En attente de l’intitulé du poste."}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">
                    Fonction
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {mainFunction.trim() ||
                      "La fonction principale apparaîtra ici pendant la saisie."}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">
                    Dimensions retenues
                  </p>

                  {selectedDimensions.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedDimensions.map((dimension) => (
                        <span
                          key={dimension}
                          className="rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/10 px-3 py-2 text-xs text-[#F2E2BE]"
                        >
                          {dimension}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-white/40">
                      Sélectionne au moins une dimension dominante du poste.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="arhi-button-primary inline-flex w-full justify-center px-8 py-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Enregistrement..." : "Enregistrer ce poste ARHI"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </LayoutShell>
  );
}