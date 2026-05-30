"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  candidateId: string;
};

export function GenerateCompanyReadingButton({
  candidateId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!loading) return;

    const timers = [
      setTimeout(() => setStep(1), 4000),
      setTimeout(() => setStep(2), 12000),
      setTimeout(() => setStep(3), 22000),
      setTimeout(() => setStep(4), 32000),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [loading]);

  async function handleGenerate() {
    if (loading) return;

    setStep(0);
    setLoading(true);

    const response = await fetch(
      "/api/arhi/company-reading",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          candidateId,
        }),
      }
    );

    if (!response.ok) {
      setLoading(false);

      alert("Impossible de générer la lecture ARHI.");
      return;
    }

    router.refresh();
  }

  if (loading) {
    return (
      <div className="mt-8 rounded-[32px] border border-[#C8A96A]/20 bg-[#C8A96A]/[0.035] p-8 md:rounded-[40px] md:p-10">
        <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
          Lecture ARHI
        </p>

        <h3 className="mt-6 text-3xl font-light tracking-[-0.04em] text-white">
          Construction de la lecture contextualisée
        </h3>

        <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
          ARHI croise actuellement le fonctionnement candidat,
          le poste concerné et l’ADN organisationnel afin de
          produire une lecture de cohérence contextualisée.
        </p>

        <div className="mt-10 space-y-5">
          <div className="flex items-center gap-4">
            <span className="text-[#C8A96A]">
              {step >= 1 ? "✓" : "◌"}
            </span>

            <span className="text-white/75">
              Observation du fonctionnement candidat
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C8A96A]">
              {step >= 2 ? "✓" : "◌"}
            </span>

            <span className="text-white/75">
              Analyse du poste et de la fonction réelle
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C8A96A]">
              {step >= 3 ? "✓" : "◌"}
            </span>

            <span className="text-white/75">
              Croisement avec l’ADN organisationnel
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#C8A96A]">
              {step >= 4 ? "✓" : "◌"}
            </span>

            <span className="text-white/75">
              Construction de la lecture entreprise
            </span>
          </div>
        </div>

        <div className="mt-10 h-[2px] w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-[#C8A96A] transition-all duration-1000"
            style={{
              width:
                step === 0
                  ? "10%"
                  : step === 1
                  ? "35%"
                  : step === 2
                  ? "60%"
                  : step === 3
                  ? "85%"
                  : "95%",
            }}
          />
        </div>

        <p className="mt-5 text-sm text-white/45">
          Cette opération peut prendre jusqu’à une minute.
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={loading}
      className="arhi-button-primary inline-flex px-8 py-4 text-sm disabled:opacity-50"
    >
      Générer la lecture ARHI
    </button>
  );
}