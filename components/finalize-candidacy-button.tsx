"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type FinalizeCandidacyButtonProps = {
  candidateRouteId: string;
  positionId: string | null;
  organisationId: string | null;
  firstName: string | null;
  globalScore: number;
  compatibility: string;
  autonomieScore: number;
  rythmeScore: number;
  interactionsScore: number;
  pressionScore: number;
  adaptationScore: number;
  stabiliteScore: number;
  slug: string;
};

export function FinalizeCandidacyButton({
  candidateRouteId,
  positionId,
  organisationId,
  firstName,
  globalScore,
  compatibility,
  autonomieScore,
  rythmeScore,
  interactionsScore,
  pressionScore,
  adaptationScore,
  stabiliteScore,
  slug,
}: FinalizeCandidacyButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");

  const [loading, setLoading] = useState(false);

  async function handleFinalize() {
    if (loading) return;

    if (!candidateId) {
      alert("Candidat introuvable. Merci de recommencer le parcours.");
      return;
    }

    const firstNameFromUrl = searchParams.get("firstName");

    const cleanFirstName =
      firstName?.trim() || firstNameFromUrl?.trim() || "Candidat";

    setLoading(true);

    const { data: candidate, error } = await supabase
      .from("arhi_candidates")
      .update({
        candidate_route_id: candidateRouteId,
        position_id: positionId,
        organisation_id: organisationId,
        first_name: cleanFirstName,
        compatibility,
        global_score: globalScore,
        autonomie_score: autonomieScore,
        rythme_score: rythmeScore,
        interactions_score: interactionsScore,
        pression_score: pressionScore,
        adaptation_score: adaptationScore,
        stabilite_score: stabiliteScore,
      })
      .eq("id", candidateId)
      .select("id")
      .single();

    if (error || !candidate?.id) {
      console.error("Erreur finalisation candidature :", error);

      alert("La finalisation n’a pas pu être effectuée. Merci de réessayer.");

      setLoading(false);
      return;
    }

    router.push(`/candidat/parcours/${slug}/finalisation`);
  }

  return (
    <button
      type="button"
      onClick={handleFinalize}
      disabled={loading}
      className="arhi-button-primary inline-flex w-full items-center justify-center px-8 py-4 text-sm disabled:opacity-50 sm:w-auto"
    >
      {loading ? "Transmission..." : "Finaliser ma candidature"}
    </button>
  );
}