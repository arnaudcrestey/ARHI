import { LayoutShell } from "@/components/layout-shell";

export default function CookiesPage() {
  return (
    <LayoutShell>
      <section className="mx-auto max-w-4xl">
        <p className="arhi-label">Cookies</p>

        <h1 className="mt-8 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">
          Politique cookies.
        </h1>

        <div className="arhi-surface mt-12 rounded-[34px] p-7 text-sm leading-8 text-white/70 md:p-10">
          <h2 className="text-2xl font-light text-white">
            Utilisation des cookies
          </h2>

          <p className="mt-6">
            Le site ARHI.fr utilise uniquement les éléments techniques
            nécessaires à son bon fonctionnement.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Absence de cookies publicitaires
          </h2>

          <p className="mt-6">
            ARHI n’utilise pas de cookies publicitaires.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Absence d’outil d’analyse externe
          </h2>

          <p className="mt-6">
            ARHI n’utilise pas actuellement Google Analytics ni autre outil de
            mesure d’audience externe.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Gestion des cookies
          </h2>

          <p className="mt-6">
            L’utilisateur peut configurer son navigateur afin de bloquer ou
            supprimer les cookies. Certaines fonctionnalités techniques du site
            peuvent toutefois être affectées.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}