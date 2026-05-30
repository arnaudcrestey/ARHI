import { LayoutShell } from "@/components/layout-shell";

export default function ConfidentialitePage() {
  return (
    <LayoutShell>
      <section className="mx-auto max-w-4xl">
        <p className="arhi-label">Données personnelles</p>

        <h1 className="mt-8 text-5xl font-light tracking-[-0.05em] text-white md:text-7xl">
          Politique de confidentialité.
        </h1>

        <div className="arhi-surface mt-12 rounded-[34px] p-7 text-sm leading-8 text-white/70 md:p-10">
          <h2 className="text-2xl font-light text-white">
            Données collectées
          </h2>

          <p className="mt-6">
            ARHI peut collecter les informations transmises volontairement par
            les entreprises et les candidats dans le cadre de l’utilisation de
            la plateforme.
          </p>

          <p className="mt-4">
            Ces informations peuvent notamment comprendre : le nom de
            l’organisation, son activité, les informations liées aux postes, les
            réponses candidates et les données nécessaires à la génération des
            lectures ARHI.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Finalité du traitement
          </h2>

          <p className="mt-6">
            Les données sont utilisées afin de permettre la création d’un
            environnement ARHI, la génération de parcours candidats et la
            production de lectures contextualisées destinées à éclairer les
            décisions de recrutement.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Conservation des données
          </h2>

          <p className="mt-6">
            Les données sont conservées pendant la durée nécessaire à
            l’utilisation du service et au suivi des environnements créés par
            les organisations.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Partage des données
          </h2>

          <p className="mt-6">
            Les données ne sont pas vendues à des tiers. Elles peuvent être
            traitées par les prestataires techniques nécessaires au bon
            fonctionnement du service.
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Droits des utilisateurs
          </h2>

          <p className="mt-6">
            Conformément à la réglementation applicable, chaque utilisateur peut
            demander l’accès, la rectification ou la suppression de ses données
            personnelles.
          </p>

          <p className="mt-4">
            Toute demande peut être adressée à : demande@arnaudcrestey.com
          </p>

          <h2 className="mt-10 text-2xl font-light text-white">
            Absence de paiement en ligne
          </h2>

          <p className="mt-6">
            À ce stade, ARHI ne collecte aucune donnée bancaire et ne propose
            pas de paiement en ligne.
          </p>
        </div>
      </section>
    </LayoutShell>
  );
}