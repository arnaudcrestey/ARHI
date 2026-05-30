type EnvironmentInput = {
  rythmeCollectif?: string;
  autonomieReelle?: string;
  structureDecisionnelle?: string;
  communicationInterne?: string;
  stabiliteRelationnelle?: string;
  gestionPression?: string;
};

type EnvironmentProfile = {
  alignement: number;
  communication: number;
  initiative: number;
  stabilite: number;
  autonomie: number;
  rapportAuCadre: number;
  dynamiqueCollective: number;
  rythme: number;
};

export function generateEnvironmentProfile(
  input: EnvironmentInput
): EnvironmentProfile {
  const profile: EnvironmentProfile = {
    alignement: 0,
    communication: 0,
    initiative: 0,
    stabilite: 0,
    autonomie: 0,
    rapportAuCadre: 0,
    dynamiqueCollective: 0,
    rythme: 0,
  };

  const rythme = input.rythmeCollectif?.toLowerCase() ?? "";
  const autonomie = input.autonomieReelle?.toLowerCase() ?? "";
  const structure = input.structureDecisionnelle?.toLowerCase() ?? "";
  const communication = input.communicationInterne?.toLowerCase() ?? "";
  const stabilite = input.stabiliteRelationnelle?.toLowerCase() ?? "";
  const pression = input.gestionPression?.toLowerCase() ?? "";

  // Rythme

  if (rythme.includes("rapide")) {
    profile.rythme += 35;
  }

  if (rythme.includes("intense")) {
    profile.rythme += 10;
  }

  // Autonomie

  if (autonomie.includes("forte")) {
    profile.autonomie += 40;
    profile.initiative += 20;
  }

  // Structure décisionnelle

  if (structure.includes("rapide")) {
    profile.rythme += 10;
    profile.initiative += 15;
  }

  if (structure.includes("validation")) {
    profile.rapportAuCadre += 25;
  }

  // Communication

  if (communication.includes("directe")) {
    profile.communication += 35;
  }

  if (communication.includes("collective")) {
    profile.dynamiqueCollective += 20;
  }

  // Stabilité

  if (stabilite.includes("stable")) {
    profile.stabilite += 40;
  }

  // Pression

  if (pression.includes("forte")) {
    profile.rythme += 15;
    profile.alignement += 10;
  }

  return profile;
}