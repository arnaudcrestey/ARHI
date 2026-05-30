import { NextResponse } from "next/server";
import OpenAI from "openai";

type AnnouncementFormat = "site" | "linkedin" | "court" | "humain";

function normalizeFormat(format: unknown): AnnouncementFormat {
  if (format === "linkedin") return "linkedin";
  if (format === "court") return "court";
  if (format === "humain") return "humain";
  return "site";
}

function getFormatInstructions(format: AnnouncementFormat) {
  if (format === "court") {
    return `
FORMAT COURT — CONTRAINTE ABSOLUE :
- maximum 5 lignes courtes ;
- aucun titre ;
- aucune section ;
- aucune liste ;
- aucun gras Markdown ;
- pas d'introduction ;
- pas de formule commerciale ;
- texte directement utilisable pour une diffusion rapide ;
- chaque phrase doit apporter une information concrète.
`;
  }

  if (format === "linkedin") {
    return `
FORMAT LINKEDIN :
- ton professionnel, fluide, humain et sobre ;
- 3 à 5 paragraphes courts ;
- pas de hashtags ;
- pas d'emojis ;
- pas de formulation de start-up ;
- pas de phrase creuse du type "entreprise dynamique en forte croissance" ;
- ne pas commencer par une accroche marketing ;
- donner envie par la justesse, pas par la séduction ;
- faire sentir la réalité du poste et du collectif.
`;
  }

  if (format === "humain") {
    return `
FORMAT PLUS HUMAIN :
- ton incarné, sensible, sobre et maîtrisé ;
- centré sur la réalité du collectif, du rythme et de la place à prendre ;
- éviter le pathos ;
- éviter les grandes promesses ;
- 4 à 6 paragraphes courts ;
- doit sembler écrit par une organisation lucide et attentive ;
- ne jamais basculer dans le récit émotionnel ou l'effet de style.
`;
  }

  return `
FORMAT SITE EMPLOI :
- annonce structurée et claire ;
- sections autorisées : Présentation, Poste, Profil recherché, Environnement ;
- pas de Markdown ;
- pas de gras ;
- pas de listes trop longues ;
- texte professionnel prêt à publier sur un site emploi ;
- chaque section doit être utile, concrète et crédible.
`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Clé OpenAI manquante." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const format = normalizeFormat(body?.format);

    const organisationName =
      typeof body?.organisationName === "string" && body.organisationName.trim()
        ? body.organisationName.trim()
        : "L’organisation";

    const activity =
      typeof body?.activity === "string" && body.activity.trim()
        ? body.activity.trim()
        : "Activité non renseignée";

    const organisationDna =
      typeof body?.organisationDna === "string"
        ? body.organisationDna.trim()
        : "";

    const positionTitle =
      typeof body?.positionTitle === "string" && body.positionTitle.trim()
        ? body.positionTitle.trim()
        : "Poste non renseigné";

    const positionDescription =
      typeof body?.positionDescription === "string" &&
      body.positionDescription.trim()
        ? body.positionDescription.trim()
        : "Fonction réelle non renseignée";

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.45,
      messages: [
        {
          role: "system",
          content: `
Tu écris des annonces de recrutement contextualisées dans l'esprit ARHI.

ARHI ne doit jamais être mentionné.
L'IA ne doit jamais être mentionnée.
Le texte doit sembler rédigé par une organisation professionnelle, lucide et humaine.

Positionnement :
- pas un ATS ;
- pas une annonce RH générique ;
- pas une communication artificielle ;
- pas de promesses creuses ;
- pas de vocabulaire corporate vide.

Le texte ne doit jamais ressembler à :
- une annonce RH standard ;
- un copier-coller LinkedIn ;
- une communication de cabinet de recrutement ;
- un texte produit par une IA générique.

Éviter absolument les formulations comme :
- "nous recherchons une personne motivée" ;
- "rejoignez une équipe dynamique" ;
- "vous aimez les défis" ;
- "environnement stimulant" ;
- "candidat idéal" ;
- "entreprise en croissance" ;
- "si vous souhaitez relever un nouveau challenge" ;
- "nous serions ravis de recevoir votre candidature".

L'écriture doit donner la sensation :
- d'une organisation réelle ;
- d'un fonctionnement concret ;
- d'un collectif existant ;
- d'un besoin professionnel authentique ;
- d'une parole humaine maîtrisée.

Le texte doit sembler écrit :
- par quelqu'un qui connaît réellement le poste ;
- par une organisation lucide ;
- pas par un service marketing RH.

Style attendu :
- français naturel ;
- sobre ;
- précis ;
- premium ;
- humain ;
- concret ;
- crédible ;
- sans exagération ;
- sans emojis ;
- sans hashtags ;
- sans Markdown visible.

Privilégier :
- les réalités de fonctionnement ;
- les interactions concrètes ;
- le rythme réel ;
- la place du poste dans le collectif ;
- les attentes implicites du quotidien ;
- les responsabilités réelles.

Règles importantes :
- ne jamais inventer de diplôme obligatoire ;
- ne jamais inventer de salaire ;
- ne jamais inventer de lieu ;
- ne jamais inventer de contrat ;
- ne jamais inventer d'avantages ;
- ne jamais parler de score, compatibilité ou analyse ;
- ne jamais utiliser "candidat idéal" ;
- éviter "passionné" sauf si le poste le justifie clairement ;
- valoriser la réalité du poste sans l'embellir excessivement ;
- faire sentir le contexte organisationnel sans exposer l'ADN comme un rapport.

La qualité du texte dépend davantage :
- de la justesse ;
- de la lucidité ;
- de la crédibilité ;

que de la séduction.
          `,
        },
        {
          role: "user",
          content: `
Prépare une annonce de recrutement contextualisée.

${getFormatInstructions(format)}

Données disponibles :

Organisation :
${organisationName}

Activité :
${activity}

Poste :
${positionTitle}

Fonction réelle du poste :
${positionDescription}

ADN organisationnel à utiliser discrètement :
${organisationDna || "Non renseigné"}

Important :
Le texte final doit uniquement contenir l'annonce.
Aucun commentaire avant.
Aucun commentaire après.
Aucun titre ajouté si le format ne le demande pas.
Aucun Markdown.
          `,
        },
      ],
    });

    const announcement =
      completion.choices[0]?.message?.content?.trim() ||
      "Annonce indisponible.";

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error("Erreur génération annonce ARHI :", error);

    return NextResponse.json(
      { error: "Impossible de préparer l’annonce." },
      { status: 500 }
    );
  }
}