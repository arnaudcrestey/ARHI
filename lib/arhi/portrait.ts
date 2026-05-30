import { ARHI_LABELS } from "@/lib/arhi/labels";

type ArhiScores = Record<string, number>;

type PortraitResult = {
  synthesis: string;

  dominantMarkers: {
    code: string;
    value: number;
    title: string;
    description: string;
  }[];

  favorableConditions: string[];

  vigilancePoints: string[];
};

export function generateArhiPortrait(
  scores: ArhiScores
): PortraitResult {
  const sortedScores = Object.entries(scores).sort(
    ([, valueA], [, valueB]) => valueB - valueA
  );

  const topScores = sortedScores.slice(0, 5);

  const hasStructure = (scores.CAD_STRUCTURE ?? 0) >= 6;
  const hasStability = (scores.STA_STABLE ?? 0) >= 6;
  const hasAdaptation = (scores.COO_ADAPTATION ?? 0) >= 6;
  const hasAutonomy = (scores.AUT_DECISION ?? 0) >= 5;
  const hasSecurity = (scores.ALI_SECURITE ?? 0) >= 6;
  const hasBalancedCommunication =
    (scores.COM_EQUILIBRE ?? 0) >= 5;

  const synthesisParts = [
    hasStructure
      ? "Votre profil indique un fonctionnement professionnel qui gagne en efficacité dans un environnement clair, structuré et lisible."
      : "",

    hasStability
      ? "Vous semblez disposer d’une base de stabilité appréciable, avec une capacité à rester fiable et constant dans la durée."
      : "",

    hasAdaptation
      ? "Votre lecture montre également une capacité d’adaptation collective utile dans des contextes évolutifs."
      : "",

    hasAutonomy
      ? "Vous pouvez avancer avec une certaine autonomie lorsque les attentes sont suffisamment explicites."
      : "",

    hasBalancedCommunication
      ? "Votre communication apparaît plutôt équilibrée, avec une capacité à ajuster votre posture selon les situations."
      : "",

    hasSecurity
      ? "La qualité du cadre et la lisibilité de l’environnement semblent jouer un rôle important dans votre engagement."
      : "",
  ].filter(Boolean);

  const synthesis =
    synthesisParts.length > 0
      ? synthesisParts.join(" ")
      : "Votre profil met en évidence plusieurs équilibres professionnels qui devront être mis en perspective avec le contexte réel du poste.";

  const favorableConditions: string[] = [];

  if (hasStructure) {
    favorableConditions.push(
      "un cadre de travail clair et organisé"
    );
  }

  if (hasStability) {
    favorableConditions.push(
      "une organisation stable avec des repères constants"
    );
  }

  if (hasSecurity) {
    favorableConditions.push(
      "un environnement professionnel lisible et rassurant"
    );
  }

  if (hasAutonomy) {
    favorableConditions.push(
      "des objectifs explicites laissant une marge d’autonomie"
    );
  }

  if (hasAdaptation) {
    favorableConditions.push(
      "une équipe capable d’ajuster ses modes de fonctionnement"
    );
  }

  const vigilancePoints: string[] = [];

  if (hasSecurity) {
    vigilancePoints.push(
      "Un environnement trop flou ou instable pourrait limiter votre confort professionnel."
    );
  }

  if (!hasAutonomy) {
    vigilancePoints.push(
      "Le besoin de validation ou de repères pourrait ralentir certaines prises d’initiative."
    );
  }

  if (vigilancePoints.length === 0) {
    vigilancePoints.push(
      "Cette lecture devra être reliée au poste, au management et à la dynamique collective réelle."
    );
  }

  return {
    synthesis,

    dominantMarkers: topScores.map(([code, value]) => ({
      code,
      value,
      title: ARHI_LABELS[code]?.title ?? code,
      description:
        ARHI_LABELS[code]?.description ?? "",
    })),

    favorableConditions,

    vigilancePoints,
  };
}