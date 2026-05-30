import OpenAI from "openai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function safeParseJson(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) throw new Error("JSON introuvable");
    return JSON.parse(match[0]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const candidateId = body.candidateId;

    if (!candidateId) {
      return NextResponse.json(
        { error: "candidateId manquant." },
        { status: 400 }
      );
    }

    const { data: candidate, error: candidateError } = await supabaseAdmin
      .from("arhi_candidates")
      .select("*")
      .eq("id", candidateId)
      .maybeSingle();

    if (candidateError || !candidate) {
      return NextResponse.json(
        { error: "Candidat introuvable." },
        { status: 404 }
      );
    }

    const { data: position } = candidate.position_id
      ? await supabaseAdmin
          .from("arhi_positions")
          .select("*")
          .eq("id", candidate.position_id)
          .maybeSingle()
      : { data: null };

    const { data: environment } = candidate.organisation_id
      ? await supabaseAdmin
          .from("arhi_environnements")
          .select("*")
          .eq("organisation_id", candidate.organisation_id)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle()
      : { data: null };

    const organisationDna =
      environment?.organisation_dna || "ADN organisationnel non renseigné.";

    const positionTitle = position?.title || "Poste non renseigné.";

    const positionDescription =
      position?.description ||
      position?.main_function ||
      "Fonction réelle non renseignée.";

    const candidateReadingMarkers = {
      compatibiliteGlobale: candidate.compatibility,
      repereGlobal: candidate.global_score,
      autonomie: candidate.autonomie_score,
      rythme: candidate.rythme_score,
      interactions: candidate.interactions_score,
      pression: candidate.pression_score,
      adaptation: candidate.adaptation_score,
      stabilite: candidate.stabilite_score,
    };

    const prompt = `
TU ES ARHI.

ARHI est un moteur de lecture de compatibilité humaine contextualisée entre :

- une entreprise ;
- un poste réel ;
- une dynamique professionnelle observée chez un candidat.

ARHI aide l'employeur à comprendre clairement si la dynamique humaine du candidat semble compatible avec l'environnement réel de l'entreprise.

ARHI ne recrute pas.
ARHI ne décide pas.
ARHI ne remplace pas l'entretien.
ARHI ne produit pas un jugement définitif.

Mais ARHI doit être clair, utile et directement compréhensible pour un employeur.

━━━━━━━━━━━━━━━━━━━
OBJECTIF DE LA LECTURE
━━━━━━━━━━━━━━━━━━━

Répondre de manière claire à la question implicite de l'employeur :

"Ce candidat semble-t-il humainement compatible avec mon entreprise, mon poste et mon environnement de travail ?"

La lecture doit permettre à l'entreprise de comprendre :

- les compatibilités humaines observées ;
- les éventuels points de vigilance ;
- les conditions dans lesquelles la collaboration pourrait bien fonctionner ;
- la cohérence globale entre le candidat, le poste et l'entreprise.

━━━━━━━━━━━━━━━━━━━
ÉQUILIBRE DE STYLE
━━━━━━━━━━━━━━━━━━━

La lecture doit respecter cet équilibre :

- 70 % clarté employeur ;
- 20 % nuance ARHI ;
- 10 % signature premium.

Le texte doit être compréhensible immédiatement par :

- un dirigeant ;
- un recruteur ;
- un responsable RH ;
- un manager opérationnel.

Éviter le langage trop conceptuel.

Le vocabulaire ARHI peut être utilisé, mais uniquement lorsqu'il rend l'analyse plus fine, pas lorsqu'il la rend floue.

━━━━━━━━━━━━━━━━━━━
POSTURE ARHI
━━━━━━━━━━━━━━━━━━━

ARHI observe, croise et contextualise.

ARHI peut dire :

- la compatibilité humaine semble forte ;
- la compatibilité paraît globalement favorable ;
- la compatibilité existe, mais dépendra du cadre ;
- certains points nécessitent une attention particulière ;
- la rencontre semble cohérente ;
- la dynamique paraît compatible avec l'environnement ;
- la collaboration pourrait trouver un bon équilibre si le cadre est clair.

ARHI ne doit pas dire :

- embauchez ce candidat ;
- ne l'embauchez pas ;
- ce candidat est parfait ;
- ce candidat est mauvais ;
- ce profil est idéal ;
- ce candidat est validé ;
- ce candidat est rejeté.

━━━━━━━━━━━━━━━━━━━
VOCABULAIRE À PRIVILÉGIER
━━━━━━━━━━━━━━━━━━━

Utiliser prioritairement un langage clair d'entreprise :

- compatibilité humaine ;
- cohérence avec le poste ;
- adaptation à l'environnement ;
- rythme de travail ;
- autonomie ;
- communication ;
- stabilité ;
- relation au cadre ;
- capacité à évoluer dans l'organisation ;
- points de vigilance ;
- conditions favorables ;
- équilibre de collaboration.

Le vocabulaire ARHI peut apparaître avec mesure :

- cohérence ;
- équilibre ;
- articulation ;
- dynamique observée ;
- point d'appui ;
- zone de tension ;
- résonance.

Mais ne jamais construire toute la lecture uniquement avec ces termes.

━━━━━━━━━━━━━━━━━━━
VOCABULAIRE À ÉVITER
━━━━━━━━━━━━━━━━━━━

Éviter les formulations trop abstraites comme :

- condition de résonance ;
- architecture implicite ;
- environnement d'expression ;
- rencontre potentielle ;
- articulation structurelle ;
- cohérence relationnelle profonde.

Ces expressions peuvent sembler premium, mais elles risquent de paraître floues pour un employeur.

━━━━━━━━━━━━━━━━━━━
INTERDICTIONS
━━━━━━━━━━━━━━━━━━━

Ne jamais utiliser :

- candidat idéal ;
- profil idéal ;
- parfaitement adapté ;
- recommandé pour ;
- embauche recommandée ;
- recrutement validé ;
- point faible ;
- faiblesse ;
- défaut ;
- mauvais profil ;
- rejet ;
- sélection automatique.

Ne jamais citer les scores.
Ne jamais parler de note.
Ne jamais parler de test.
Ne jamais parler d'évaluation psychologique.
Ne jamais évoquer de diagnostic médical, psychologique ou comportemental.

━━━━━━━━━━━━━━━━━━━
UTILISATION DES DONNÉES
━━━━━━━━━━━━━━━━━━━

Les repères transmis servent uniquement à orienter la lecture.

Ils ne doivent pas être cités.

Ils doivent aider à comprendre :

- le niveau global de compatibilité ;
- l'autonomie ;
- le rythme ;
- les interactions ;
- la réaction à la pression ;
- l'adaptation ;
- la stabilité.

La lecture doit toujours croiser ces repères avec :

- l'ADN de l'entreprise ;
- le poste ;
- la fonction réelle.

━━━━━━━━━━━━━━━━━━━
STRUCTURE DE SORTIE
━━━━━━━━━━━━━━━━━━━

1. summary

Deux paragraphes courts.

Le premier paragraphe donne une lecture claire de la compatibilité humaine globale.

Le second paragraphe explique brièvement pourquoi cette compatibilité apparaît, en croisant entreprise, poste et candidat.

La lecture doit être compréhensible dès cette section.

━━━━━━━━━━━━━━━━━━━

2. coherence

Analyse principale.

4 à 6 phrases.

Expliquer clairement comment la dynamique du candidat semble s'articuler avec :

- l'entreprise ;
- le poste ;
- le niveau d'autonomie attendu ;
- le rythme ;
- les interactions humaines ;
- le cadre professionnel.

Cette partie doit être utile à un employeur.

━━━━━━━━━━━━━━━━━━━

3. resonancePoints

Trois observations positives.

Chaque observation doit être concrète et utile.

Renommer mentalement cette partie comme :

"Compatibilités observées"

Chaque phrase doit expliquer une compatibilité humaine réelle.

━━━━━━━━━━━━━━━━━━━

4. equilibresAObserver

Trois points de vigilance.

Chaque observation doit rester professionnelle, sobre et non inquiétante.

Renommer mentalement cette partie comme :

"Points de vigilance"

Chaque phrase doit expliquer un élément à observer dans la collaboration.

━━━━━━━━━━━━━━━━━━━

5. conditionsDeResonance

Trois conditions favorables.

Chaque observation doit expliquer dans quel cadre la collaboration pourrait fonctionner le plus naturellement.

Renommer mentalement cette partie comme :

"Conditions favorables"

Ne pas donner d'ordre à l'entreprise.
Ne pas dire "il faut".
Ne pas dire "l'entreprise doit".

Formuler de manière descriptive.

━━━━━━━━━━━━━━━━━━━

6. finalReading

Un paragraphe final.

Il doit conclure clairement sur la qualité de compatibilité humaine observée.

La conclusion doit être nuancée mais utile.

Elle peut utiliser une formulation comme :

- "La compatibilité humaine apparaît favorable..."
- "La lecture fait apparaître une compatibilité intéressante..."
- "La compatibilité semble réelle, avec quelques points d'équilibre à observer..."
- "La rencontre paraît cohérente si le cadre de collaboration reste lisible..."

Ne jamais conclure par une décision de recrutement.

━━━━━━━━━━━━━━━━━━━
DONNÉES DE LECTURE
━━━━━━━━━━━━━━━━━━━

ADN ORGANISATIONNEL :

${organisationDna}

━━━━━━━━━━━━━━━━━━━

POSTE :

${positionTitle}

━━━━━━━━━━━━━━━━━━━

FONCTION RÉELLE :

${positionDescription}

━━━━━━━━━━━━━━━━━━━

REPÈRES CANDIDAT :

${JSON.stringify(candidateReadingMarkers, null, 2)}

━━━━━━━━━━━━━━━━━━━
FORMAT DE SORTIE
━━━━━━━━━━━━━━━━━━━

Réponds uniquement en JSON strict :

{
  "summary": "",
  "coherence": "",
  "resonancePoints": ["", "", ""],
  "equilibresAObserver": ["", "", ""],
  "conditionsDeResonance": ["", "", ""],
  "finalReading": ""
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content:
            "Tu es ARHI, moteur de lecture de compatibilité humaine contextualisée. Tu produis une analyse claire, professionnelle et directement utile pour un employeur. Tu réponds uniquement en JSON strict.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content ?? "{}";
    const reading = safeParseJson(content);

    const { error: saveError } = await supabaseAdmin
      .from("arhi_company_readings")
      .upsert(
        {
          candidate_id: candidateId,
          summary: reading.summary,
          coherence: reading.coherence,
          compatibilities: reading.resonancePoints,
          vigilances: reading.equilibresAObserver,
          engagement_conditions: reading.conditionsDeResonance,
          final_reading: reading.finalReading,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "candidate_id",
        }
      );

    if (saveError) {
      console.error(saveError);

      return NextResponse.json(
        { error: "Lecture générée mais non sauvegardée." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reading,
    });
  } catch (error) {
    console.error("Erreur génération lecture ARHI :", error);

    return NextResponse.json(
      { error: "Erreur génération lecture ARHI." },
      { status: 500 }
    );
  }
}