"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ClosePositionButtonProps = {
  positionId: string;
};

export function ClosePositionButton({ positionId }: ClosePositionButtonProps) {
  const router = useRouter();

  async function handleClosePosition() {
    const confirmed = window.confirm(
      "Confirmer la clôture de ce poste ? Il restera consultable dans les recrutements clôturés."
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("arhi_positions")
      .update({ status: "closed" })
      .eq("id", positionId);

    if (error) {
      alert("Impossible de clôturer ce poste pour le moment.");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleClosePosition}
      className="rounded-full border border-white/10 px-5 py-3 text-xs text-white/45 transition hover:border-[#C8A96A]/45 hover:text-[#F2E2BE]"
    >
      Clôturer
    </button>
  );
}
