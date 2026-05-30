import { LayoutShell } from "@/components/layout-shell";

const layers = [
  {
    label: "Lecture située",
    title: "Relier les réponses au réel",
    text: "ARHI n’analyse jamais une réponse seule. Le système la relie à l’organisation, au poste et aux conditions professionnelles dans lesquelles la collaboration devra exister.",
  },
  {
    label: "Signal humain",
    title: "Éviter la lecture mécanique",
    text: "Les réponses sont organisées pour faire émerger des tendances utiles, sans réduire le candidat à une note, un profil figé ou une conclusion automatique.",
  },
  {
    label: "Synthèse décisionnelle",
    title: "Rendre lisible ce qui compte",
    text: "ARHI transforme les données recueillies en lecture claire : compatibilités observées, points de vigilance et conditions favorables à la collaboration.",
  },
];

export default function TechnologiePage() {
  return (
    <LayoutShell>
      <section className="max-w-6xl">
        <p className="arhi-label">Technologie</p>

        <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          Une technologie discrète au service du discernement humain.
        </h1>

        <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:mt-12 md:text-xl md:leading-9">
          ARHI ne met pas la technologie au premier plan. Il l’utilise pour
          organiser les réponses, relier les informations et rendre lisibles les
          dynamiques humaines utiles à la décision.
        </p>
      </section>

      <section className="mt-28 grid gap-6 md:mt-36 md:grid-cols-3 md:gap-8">
        {layers.map((item) => (
          <div key={item.title} className="arhi-surface rounded-[30px] p-8 md:rounded-[36px] md:p-9">
            <p className="arhi-label">{item.label}</p>

            <h2 className="mt-8 text-2xl font-light leading-tight text-white md:text-3xl">
              {item.title}
            </h2>

            <p className="arhi-muted mt-7 leading-8">{item.text}</p>
          </div>
        ))}
      </section>

      <section className="arhi-card mt-32 pt-16 md:mt-40 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:gap-20">
          <div>
            <p className="arhi-label">Principe</p>
          </div>

          <div>
            <h2 className="text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
              La technologie ARHI ne décide pas à la place de l’entreprise. Elle
              structure une lecture plus juste.
            </h2>

            <p className="arhi-muted mt-8 text-base leading-8 md:mt-10 md:text-lg md:leading-9">
              Le système collecte les réponses, les relie à une situation de
              recrutement précise, puis organise les informations sous une forme
              lisible. L’objectif n’est pas de produire une vérité automatique,
              mais d’aider l’entreprise à mieux comprendre ce qui peut influencer
              durablement une collaboration.
            </p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}