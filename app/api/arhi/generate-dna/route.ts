import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      collective_rhythm,
      autonomy_level,
      decision_structure,
      communication_style,
      relational_stability,
      pressure_level,
    } = body;

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: `
Tu es le moteur d’analyse ARHI.

Ta mission :
produire un ADN organisationnel premium, sobre, institutionnel et humain.

Éléments observés :

Rythme collectif :
${collective_rhythm}

Autonomie réelle :
${autonomy_level}

Structure décisionnelle :
${decision_structure}

Communication interne :
${communication_style}

Stabilité relationnelle :
${relational_stability}

Gestion de la pression :
${pressure_level}

Contraintes :
- pas de score
- pas de jargon RH lourd
- pas de diagnostic agressif
- style calme, premium et analytique
- 2 à 4 paragraphes maximum
- français professionnel
`,
    });

    return NextResponse.json({
      organisation_dna: response.output_text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erreur génération ADN ARHI",
      },
      {
        status: 500,
      }
    );
  }
}