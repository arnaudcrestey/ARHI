import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";

export default function CandidateFinalisationPage() {
  return (
    <LayoutShell>
      <section className="mx-auto flex min-h-[62vh] max-w-4xl flex-col items-center justify-center text-center">
        <p className="arhi-label">Candidature transmise</p>

        <h1 className="mt-8 text-6xl font-light leading-[0.98] tracking-[-0.07em] text-white md:text-8xl">
          Merci.
        </h1>

        <p className="arhi-muted mt-10 max-w-2xl text-base leading-8 md:text-xl md:leading-10">
          Votre lecture ARHI a bien été associée à votre candidature et
          transmise à l’organisation concernée.
        </p>

        <div className="arhi-surface mt-14 max-w-2xl rounded-[34px] p-8 md:p-10">
          <p className="arhi-label">Suite du processus</p>

          <p className="mt-6 text-sm leading-8 text-white/65 md:text-base md:leading-9">
            L’entreprise pourra consulter votre lecture dans son espace ARHI.
            Aucune autre action n’est nécessaire à cette étape.
          </p>
        </div>

        <Link
          href="/"
          className="arhi-button-primary mt-10 inline-flex px-9 py-4 text-sm"
        >
          Retour à l’accueil ARHI
        </Link>
      </section>
    </LayoutShell>
  );
}