"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ClosePositionButtonProps = {
  positionId: string;
};

export function ClosePositionButton({ positionId }: ClosePositionButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClosePosition() {
    const confirmed = window.confirm(
      "Confirmer la clôture de ce poste ? Il restera consultable dans les recrutements clôturés."
    );

    if (!confirmed || loading) return;

    setLoading(true);

    const response = await fetch("/api/arhi/close-position", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ positionId }),
    });

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || "Impossible de clôturer ce poste.");
      setLoading(false);
      return;
    }

    router.refresh();
    setLoading(false);
  }

  return (
    <button
      type="button"
      onClick={handleClosePosition}
      disabled={loading}
      className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/45 transition hover:border-[#C8A96A]/45 hover:text-[#F2E2BE] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {loading ? "Clôture..." : "Clôturer"}
    </button>
  );
}
