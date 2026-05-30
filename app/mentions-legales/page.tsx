import { LayoutShell } from "@/components/layout-shell";

export default function MentionsLegalesPage() {
  return (
    <LayoutShell>
      <section className="mx-auto max-w-4xl">
        <p className="arhi-label">Informations légales</p>

        <h1 className="mt-8 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">
          Mentions légales.
        </h1>

        <div className="arhi-surface mt-12 rounded-[34px] p-7 text-sm leading-8 text-white/70 md:p-10">
          <h2 className="text-2xl font-light text-white">Éditeur du site</h2>

          <p className="mt-6">
            Le site <strong className="text-white">ARHI.fr</strong> est édité
            par <strong className="text-white">SASU CRESTEY ARNAUD</strong>.
          </p>

          <p className="mt-4">
            Adresse : 36 route du Coisel, La Personnerie, Viessoix, 14410
            Valdallière, France.
          </p>

          <p className="mt-4">Email : demande@arnaudcrestey.com</p>
          <p className="mt-4">Téléphone : 06 95 82 68 45</p>
          <p className="mt-4">SIRET : en cours d’attribution.</p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Responsable de publication
          </h2>

          <p className="mt-6">Arnaud Crestey.</p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Hébergement
          </h2>

          <p className="mt-6">
            Le site est hébergé par Hostinger International Ltd.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Propriété intellectuelle
          </h2>

          <p className="mt-6">
            L’ensemble des contenus présents sur le site ARHI.fr, incluant les
            textes, interfaces, éléments graphiques, concepts, structures,
            parcours et éléments de marque, sont protégés par le droit de la
            propriété intellectuelle.
          </p>

          <p className="mt-4">
            Toute reproduction, représentation, modification ou exploitation,
            totale ou partielle, sans autorisation préalable, est interdite.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Responsabilité
          </h2>

          <p className="mt-6">
            ARHI propose un outil d’aide à la lecture et à la décision. Les
            informations produites ne se substituent pas à l’appréciation finale
            de l’entreprise, qui demeure seule responsable de ses décisions de
            recrutement.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}