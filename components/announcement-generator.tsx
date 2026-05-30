"use client";

import { useEffect, useState } from "react";

type Props = {
  format: string;
  organisationName: string;
  activity: string;
  organisationDna: string;
  positionTitle: string;
  positionDescription: string;
};

export function AnnouncementGenerator({
  format,
  organisationName,
  activity,
  organisationDna,
  positionTitle,
  positionDescription,
}: Props) {
  const [announcement, setAnnouncement] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    generateAnnouncement();
  }, [format]);

  async function generateAnnouncement() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/arhi/generate-announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          format,
          organisationName,
          activity,
          organisationDna,
          positionTitle,
          positionDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Impossible de générer l’annonce."
        );
      }

      setAnnouncement(data.announcement || "");
    } catch (err: any) {
      setError(
        err?.message || "Une erreur est survenue."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!announcement) return;

    await navigator.clipboard.writeText(announcement);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  if (loading) {
    return (
      <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm text-white/50">
          Préparation de l’annonce…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-[32px] border border-red-500/20 bg-red-500/5 p-8">
        <p className="text-sm text-red-200">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.03] p-6 md:p-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#C8A96A]">
            Texte généré
          </p>

          <h3 className="mt-4 text-2xl font-light tracking-[-0.03em] text-white">
            Annonce prête à diffuser
          </h3>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white transition hover:bg-white/15"
        >
          {copied ? "Texte copié" : "Copier le texte"}
        </button>
      </div>

      <div className="mt-10 whitespace-pre-wrap text-[15px] leading-8 text-white/78">
        {announcement}
      </div>
    </div>
  );
}