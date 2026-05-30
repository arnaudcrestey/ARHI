"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type CandidateStartFormProps = {
  routeId: string;
  slug: string;
};

export function CandidateStartForm({
  routeId,
  slug,
}: CandidateStartFormProps) {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleStart() {
    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim() || null;

    if (!cleanFirstName || !cleanLastName || !cleanEmail) {
      alert("Merci de renseigner votre prénom, votre nom et votre email.");
      return;
    }

    if (!accepted) {
      alert("Merci de confirmer votre accord avant de commencer.");
      return;
    }

    setLoading(true);

    const { data: routeData, error: routeError } = await supabase
      .from("arhi_candidate_routes")
      .select("id, position_id, organisation_id")
      .eq("id", routeId)
      .single();

    if (routeError || !routeData) {
      console.error("Route candidat introuvable :", routeError);
      alert("Impossible de retrouver le contexte de candidature.");
      setLoading(false);
      return;
    }

    const { data: candidate, error: candidateError } = await supabase
      .from("arhi_candidates")
      .insert({
        candidate_route_id: routeId,
        position_id: routeData.position_id,
        organisation_id: routeData.organisation_id,
        first_name: cleanFirstName,
        last_name: cleanLastName,
        email: cleanEmail,
        phone: cleanPhone,
      })
      .select("id")
      .single();

    if (candidateError || !candidate?.id) {
      console.error("Erreur création candidat :", candidateError);
      alert("Une erreur est survenue. Merci de réessayer.");
      setLoading(false);
      return;
    }

    router.push(
      `/candidat/parcours/${slug}/lecture?candidateId=${candidate.id}`
    );
  }

  return (
    <div className="mt-10 rounded-[30px] border border-white/10 bg-black/10 p-6 md:p-8">
      <p className="arhi-label">Vos informations</p>

      <p className="arhi-muted mt-5 text-sm leading-7">
        Ces informations permettent de rattacher votre lecture ARHI au bon poste
        et à la bonne organisation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder="Prénom"
          autoComplete="given-name"
          className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/50"
        />

        <input
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          placeholder="Nom"
          autoComplete="family-name"
          className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/50"
        />

        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          type="email"
          autoComplete="email"
          className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/50"
        />

        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Téléphone optionnel"
          type="tel"
          autoComplete="tel"
          className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#C8A96A]/50"
        />
      </div>

      <label className="mt-6 flex gap-3 text-sm leading-7 text-white/55">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          className="mt-1 h-4 w-4 accent-[#C8A96A]"
        />

        <span>
          J’accepte que mes informations soient utilisées dans le cadre de ce
          parcours ARHI lié à ma candidature.
        </span>
      </label>

      <button
        type="button"
        onClick={handleStart}
        disabled={loading}
        className="arhi-button-primary mt-8 inline-flex w-full justify-center px-8 py-4 text-sm disabled:opacity-50 sm:w-auto"
      >
        {loading ? "Préparation..." : "Commencer la lecture"}
      </button>
    </div>
  );
}