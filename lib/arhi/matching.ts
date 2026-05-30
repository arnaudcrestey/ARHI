type ArhiProfile = {
  alignement?: number;
  communication?: number;
  initiative?: number;
  stabilite?: number;
  autonomie?: number;
  rapportAuCadre?: number;
  dynamiqueCollective?: number;
  rythme?: number;
};

type MatchingInput = {
  candidate: ArhiProfile;
  environment: ArhiProfile;
};

type MatchingResult = {
  coherences: string[];
  vigilances: string[];
  conditionsFavorables: string[];
};

export function generateMatching(input: MatchingInput): MatchingResult {
  const coherences: string[] = [];
  const vigilances: string[] = [];
  const conditionsFavorables: string[] = [];

  const candidate = input.candidate;
  const environment = input.environment;

  if (
    (environment.autonomie ?? 0) >= 30 &&
    (candidate.autonomie ?? 0) >= 30
  ) {
    coherences.push(
      "Le niveau d’autonomie observé semble cohérent avec le fonctionnement attendu dans cet environnement professionnel."
    );
  }

  if (
    (environment.communication ?? 0) >= 25 &&
    (candidate.communication ?? 0) >= 25
  ) {
    coherences.push(
      "La dynamique de communication paraît compatible avec les interactions attendues dans le poste."
    );
  }

  if (
    (environment.dynamiqueCollective ?? 0) >= 20 &&
    (candidate.dynamiqueCollective ?? 0) >= 20
  ) {
    coherences.push(
      "Le rapport au collectif semble pouvoir s’inscrire de manière constructive dans l’environnement décrit."
    );
  }

  if (
    (environment.rythme ?? 0) >= 35 &&
    (candidate.rythme ?? 0) < 20
  ) {
    vigilances.push(
      "Le rythme opérationnel observé pourrait demander un temps d’adaptation ou des repères organisationnels plus explicites."
    );
  }

  if (
    (environment.autonomie ?? 0) >= 35 &&
    (candidate.rapportAuCadre ?? 0) >= 30
  ) {
    vigilances.push(
      "Un environnement très autonome pourrait nécessiter un cadre de départ suffisamment clair pour sécuriser l’engagement."
    );
  }

  if (
    (environment.communication ?? 0) >= 30 &&
    (candidate.communication ?? 0) < 20
  ) {
    vigilances.push(
      "La dynamique de communication attendue pourrait demander des ajustements dans les premiers temps d’intégration."
    );
  }

  if ((candidate.rapportAuCadre ?? 0) >= 25) {
    conditionsFavorables.push(
      "Des objectifs lisibles, des priorités explicites et un cadre de départ clair semblent favoriser l’engagement professionnel."
    );
  }

  if ((candidate.autonomie ?? 0) >= 30) {
    conditionsFavorables.push(
      "Une autonomie responsabilisante, associée à des repères simples, semble constituer un environnement favorable."
    );
  }

  if ((candidate.stabilite ?? 0) >= 30) {
    conditionsFavorables.push(
      "Une continuité dans les attentes et une stabilité relationnelle suffisante peuvent soutenir une contribution durable."
    );
  }

  if (coherences.length === 0) {
    coherences.push(
      "La lecture croisée fait apparaître une compatibilité à préciser davantage à partir du contexte réel du poste et des conditions d’intégration."
    );
  }

  if (vigilances.length === 0) {
    vigilances.push(
      "Aucune tension majeure ne ressort à ce stade, sous réserve d’un cadre d’intégration suffisamment clair."
    );
  }

  return {
    coherences,
    vigilances,
    conditionsFavorables,
  };
}