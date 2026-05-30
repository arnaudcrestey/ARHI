import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";

const dimensions = [
  {
    title: "Rythme collectif",
    text: "Identifier la vitesse réelle de fonctionnement, les cycles d’action et les besoins de stabilité.",
  },
  {
    title: "Décision",
    text: "Comprendre comment les décisions circulent, se clarifient et influencent le quotidien professionnel.",
  },
  {
    title: "Autonomie",
    text: "Mesurer la place laissée à l’initiative, à la responsabilité et à l’ajustement individuel.",
  },
  {
    title: "Communication",
    text: "Observer les modes d’échange, de coordination, de clarification et de continuité relationnelle.",
  },
  {
    title: "Stabilité humaine",
    text: "Lire les repères collectifs, les équilibres internes et les conditions de sécurité professionnelle.",
  },
  {
    title: "Pression",
    text: "Repérer l’intensité, les zones de tension et la manière dont l’organisation absorbe l’exigence.",
  },
];

const protocol = [
  {
    step: "01",
    title: "Organisation",
    text: "L’entreprise décrit son fonctionnement réel : rythme, pression, communication, autonomie et stabilité.",
  },
  {
    step: "02",
    title: "Lecture ARHI",
    text: "ARHI transforme ces éléments en lecture synthétique des équilibres humains de l’organisation.",
  },
  {
    step: "03",
    title: "Poste",
    text: "Chaque poste est relié à l’environnement dans lequel le candidat devra réellement évoluer.",
  },
  {
    step: "04",
    title: "Lien candidat",
    text: "ARHI génère un lien unique que l’entreprise transmet au candidat pour ouvrir son analyse.",
  },
];

const results = [
  {
    title: "Compatibilités observées",
    text: "Une lecture claire des points d’alignement entre l’organisation, le poste et le fonctionnement du candidat.",
  },
  {
    title: "Points de vigilance",
    text: "Une mise en évidence des zones pouvant créer de la friction, de l’inconfort ou une perte d’équilibre.",
  },
  {
    title: "Aide à la décision",
    text: "Un support de discernement humain, sans scoring automatique ni réduction du candidat à un profil.",
  },
];

export default function EntreprisePage() {
  return (
    <LayoutShell>
      <section className="max-w-6xl">
        <p className="arhi-label">Entreprise</p>

        <h1 className="mt-8 max-w-5xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-white sm:text-5xl md:text-7xl">
          Chaque organisation possède une architecture humaine implicite.
        </h1>

        <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:mt-12 md:text-xl md:leading-9">
          ARHI aide les entreprises à rendre lisibles leurs dynamiques humaines
          afin de mieux préparer leurs décisions de recrutement.
        </p>

        <div className="mt-10">
          <Link
            href="/entreprise/setup"
            className="arhi-button-primary inline-flex w-full justify-center px-8 py-4 text-sm sm:w-auto"
          >
            Ouvrir un environnement ARHI
          </Link>
        </div>
      </section>

      <section className="mt-24 md:mt-36">
        <div className="mb-10 max-w-4xl">
          <p className="arhi-label">Ce qu’ARHI rend visible</p>

          <h2 className="mt-7 text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
            Les mécanismes humains qui influencent durablement une
            collaboration.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {dimensions.map((item) => (
            <article
              key={item.title}
              className="arhi-surface rounded-[28px] p-7 md:rounded-[34px] md:p-9"
            >
              <p className="arhi-label">Dimension</p>

              <h3 className="mt-7 text-2xl font-light leading-tight text-white md:text-3xl">
                {item.title}
              </h3>

              <p className="arhi-muted mt-6 text-sm leading-7 md:text-base md:leading-8">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-28 md:mt-40">
        <div className="arhi-surface overflow-hidden rounded-[32px] p-7 md:rounded-[42px] md:p-14">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <div>
              <p className="arhi-label">Protocole ARHI</p>
            </div>

            <div>
              <h2 className="text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
                Avant d’analyser un candidat, ARHI analyse l’organisation.
              </h2>

              <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:text-lg md:leading-9">
                L’entreprise décrit d’abord son fonctionnement réel. Le poste et
                le candidat sont ensuite lus à partir de cette réalité
                professionnelle.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {protocol.map((item) => (
              <article
                key={item.step}
                className="rounded-[26px] border border-white/10 bg-white/[0.025] p-6 md:rounded-[30px] md:p-7"
              >
                <p className="text-xs tracking-[0.45em] text-[#C8A96A] md:text-sm">
                  {item.step}
                </p>

                <h3 className="mt-7 text-xl font-light leading-tight text-white md:mt-8 md:text-2xl">
                  {item.title}
                </h3>

                <p className="arhi-muted mt-6 text-sm leading-7">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-6 md:mt-40 md:grid-cols-3 md:gap-8">
        {results.map((item) => (
          <article
            key={item.title}
            className="arhi-surface rounded-[28px] p-7 md:rounded-[34px] md:p-9"
          >
            <p className="arhi-label">Résultat</p>

            <h2 className="mt-7 text-2xl font-light leading-tight text-white md:text-3xl">
              {item.title}
            </h2>

            <p className="arhi-muted mt-6 text-sm leading-7 md:text-base md:leading-8">
              {item.text}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-28 md:mt-40">
        <div className="arhi-surface relative overflow-hidden rounded-[32px] p-7 md:rounded-[42px] md:p-14">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#C8A96A]/10 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <p className="arhi-label">Ouverture</p>

            <h2 className="mt-7 text-3xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
              Une décision de recrutement commence par la compréhension de
              l’organisation.
            </h2>

            <p className="arhi-muted mt-8 max-w-3xl text-base leading-8 md:text-lg md:leading-9">
              ARHI prépare l’analyse en reliant l’organisation, le poste et le
              candidat. L’entreprise obtient ainsi une lecture située,
              exploitable et utile à la décision.
            </p>

            <div className="mt-10">
              <Link
                href="/entreprise/setup"
                className="arhi-button-primary inline-flex w-full justify-center px-8 py-4 text-sm sm:w-auto"
              >
                Ouvrir un environnement ARHI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}