import { LayoutShell } from "@/components/layout-shell";

export default function CguPage() {
  return (
    <LayoutShell>
      <section className="mx-auto max-w-4xl">
        <p className="arhi-label">Conditions d’utilisation</p>

        <h1 className="mt-8 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">
          CGU.
        </h1>

        <div className="arhi-surface mt-12 rounded-[34px] p-7 text-sm leading-8 text-white/70 md:p-10">
          <h2 className="text-2xl font-light text-white">Objet</h2>

          <p className="mt-6">
            Les présentes conditions générales d’utilisation ont pour objet
            d’encadrer l’accès et l’utilisation de la plateforme ARHI.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Nature du service
          </h2>

          <p className="mt-6">
            ARHI est un outil d’aide à la lecture des dynamiques humaines
            professionnelles appliquées au recrutement.
          </p>

          <p className="mt-4">
            Le service vise à éclairer les décisions de l’entreprise sans se
            substituer à son jugement, à ses entretiens, ni à ses obligations
            légales en matière de recrutement.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Accès au service
          </h2>

          <p className="mt-6">
            L’accès à certaines fonctionnalités peut être réservé aux
            organisations disposant d’un environnement ARHI actif.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Responsabilité de l’utilisateur
          </h2>

          <p className="mt-6">
            L’utilisateur s’engage à fournir des informations exactes,
            pertinentes et non trompeuses dans le cadre de l’utilisation de la
            plateforme.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Décision finale
          </h2>

          <p className="mt-6">
            Les lectures produites par ARHI constituent un éclairage
            complémentaire. La décision finale de recrutement appartient
            exclusivement à l’entreprise.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Évolution du service
          </h2>

          <p className="mt-6">
            ARHI peut évoluer afin d’améliorer ses fonctionnalités, ses parcours
            et ses modalités d’accès.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}