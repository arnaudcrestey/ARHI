"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutShell } from "@/components/layout-shell";
import { ARHI_QUESTIONS } from "@/lib/arhi/questions";
import { shuffleArray } from "@/lib/arhi/randomize";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CandidateLecturePage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const candidateId = searchParams.get("candidateId");

  const randomizedQuestions = useMemo(() => {
    return shuffleArray(ARHI_QUESTIONS).map((question: any) => ({
      ...question,
      answers: shuffleArray(question.answers),
    }));
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [routeId, setRouteId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const currentQuestion = randomizedQuestions[currentIndex];
  const progress = currentIndex + 1;
  const total = randomizedQuestions.length;
  const progressPercent = Math.round((progress / total) * 100);

  useEffect(() => {
    async function fetchRoute() {
      const { data, error } = await supabase
        .from("arhi_candidate_routes")
        .select("id")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        console.error("Route candidat introuvable :", error);
        return;
      }

      setRouteId(data.id);
    }

    if (slug) {
      fetchRoute();
    }
  }, [slug]);

  async function handleAnswer(answerId: string) {
    if (!routeId || !candidateId || isSaving) return;

    setSelectedAnswerId(answerId);
    setIsSaving(true);

    const { error } = await supabase.from("arhi_candidate_answers").insert({
      route_id: routeId,
      candidate_id: candidateId,
      question_id: currentQuestion.id,
      answer_id: answerId,
      question_position: progress,
    });

    if (error) {
      console.error("Erreur sauvegarde réponse :", error);
      setSelectedAnswerId(null);
      setIsSaving(false);
      return;
    }

    setTimeout(() => {
      if (currentIndex < total - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedAnswerId(null);
        setIsSaving(false);
        return;
      }

      router.push(`./resultat?candidateId=${candidateId}`);
    }, 260);
  }

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="arhi-label">Lecture candidat</p>

            <h1 className="mt-8 max-w-4xl text-4xl font-light leading-[1.04] tracking-[-0.055em] text-white sm:text-5xl md:text-7xl">
              Une lecture progressive du fonctionnement professionnel.
            </h1>
          </div>

          <div className="rounded-full border border-white/10 bg-white/[0.025] px-5 py-3 text-xs uppercase tracking-[0.28em] text-white/45">
            {progress} / {total}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10">
          <div
            className="h-px bg-[#C8A96A] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-6xl md:mt-24">
        <div
          key={currentQuestion.id}
          className="animate-[fadeIn_260ms_ease-out]"
        >
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <aside className="order-2 lg:order-1">
              <div className="sticky top-10 space-y-5">
                <div className="rounded-[30px] border border-white/10 bg-white/[0.025] p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A96A]/75">
                    Situation {String(progress).padStart(2, "0")}
                  </p>

                  <p className="mt-6 text-2xl font-light leading-tight tracking-[-0.035em] text-white">
                    {currentQuestion.dimension}
                  </p>

                  <p className="arhi-muted mt-5 text-sm leading-7">
                    Cette étape affine progressivement la lecture de votre
                    rapport au travail, au rythme et à l’environnement.
                  </p>
                </div>

                <div className="rounded-[30px] border border-[#C8A96A]/15 bg-[#C8A96A]/[0.04] p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#C8A96A]/75">
                    Progression
                  </p>

                  <p className="mt-5 text-4xl font-light tracking-[-0.05em] text-white">
                    {progressPercent}%
                  </p>
                </div>
              </div>
            </aside>

            <div className="order-1 lg:order-2">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
                Question guidée
              </p>

              <h2 className="mt-6 text-4xl font-light leading-[1.04] tracking-[-0.055em] text-white md:text-6xl">
                {currentQuestion.title}
              </h2>

              <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:text-lg md:leading-9">
                {currentQuestion.context}
              </p>

              <div className="mt-12 grid gap-4">
                {currentQuestion.answers.map((answer: any, index: number) => {
                  const isSelected = selectedAnswerId === answer.id;

                  return (
                    <button
                      key={answer.id}
                      onClick={() => handleAnswer(answer.id)}
                      disabled={isSaving || !routeId || !candidateId}
                      className={[
                        "group rounded-[26px] border p-5 text-left transition duration-300 md:p-6",
                        "bg-white/[0.025] hover:bg-white/[0.055]",
                        isSelected
                          ? "border-[#C8A96A]/70 bg-[#C8A96A]/[0.08]"
                          : "border-white/10 hover:border-white/25",
                        "disabled:cursor-not-allowed disabled:opacity-60",
                      ].join(" ")}
                    >
                      <div className="flex gap-5">
                        <span className="mt-1 text-xs uppercase tracking-[0.25em] text-[#C8A96A]/65">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm leading-7 text-white/72 transition group-hover:text-white md:text-base md:leading-8">
                          {answer.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!candidateId && (
                <p className="mt-8 rounded-[24px] border border-red-400/20 bg-red-400/10 px-5 py-4 text-sm leading-7 text-red-100/80">
                  Impossible d’identifier cette candidature. Merci de reprendre
                  le parcours depuis le lien transmis par l’entreprise.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}