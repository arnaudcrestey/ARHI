export const ARHI_QUESTIONS = [
  {
    id: "Q01",
    dimension: "Dynamique de travail",
    title: "Le rythme professionnel demande de l’ajustement.",
    context:
      "Une journée démarre avec plusieurs demandes simultanées et des priorités qui évoluent rapidement.",
    answers: [
      {
        id: "Q01A",
        text: "Je préfère prendre un moment pour clarifier ce qui est réellement prioritaire avant d’avancer.",
        codes: { RYT_STABLE: 3, CAD_STRUCTURE: 2, RYT_REACTIF: -1 },
      },
      {
        id: "Q01B",
        text: "J’avance progressivement en réorganisant mes tâches au fil de la journée.",
        codes: { RYT_ADAPT: 3, CAD_REPERE: 2 },
      },
      {
        id: "Q01C",
        text: "Je m’adapte facilement aux changements et je réagis rapidement aux nouvelles demandes.",
        codes: { RYT_REACTIF: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q01D",
        text: "L’intensité et le mouvement me stimulent plutôt qu’ils ne me freinent.",
        codes: { RYT_INTENSE: 3, INI_PROACTIF: 2, STA_STABLE: 1 },
      },
    ],
  },

  {
    id: "Q02",
    dimension: "Dynamique de travail",
    title: "L’environnement reste partiellement flou.",
    context:
      "Un projet avance vite et certaines informations restent incomplètes pendant plusieurs jours.",
    answers: [
      {
        id: "Q02A",
        text: "Je ressens le besoin d’obtenir rapidement une vision plus claire avant d’aller plus loin.",
        codes: { CAD_STRUCTURE: 3, ALI_SECURITE: 2, CAD_INCERTITUDE: -2 },
      },
      {
        id: "Q02B",
        text: "Je continue d’avancer tout en ajustant ma compréhension au fur et à mesure.",
        codes: { RYT_ADAPT: 3, AUT_ORGANISE: 1 },
      },
      {
        id: "Q02C",
        text: "Le flou temporaire ne me dérange pas particulièrement tant que le mouvement continue.",
        codes: { CAD_INCERTITUDE: 3, RYT_REACTIF: 2 },
      },
      {
        id: "Q02D",
        text: "Je prends facilement des décisions même lorsque tout n’est pas totalement stabilisé.",
        codes: { AUT_DECISION: 3, INI_PROACTIF: 2, STA_RESILIENT: 1 },
      },
    ],
  },

  {
    id: "Q03",
    dimension: "Dynamique de travail",
    title: "Une période intense s’installe.",
    context:
      "Une période particulièrement intense impose un rythme soutenu pendant plusieurs semaines.",
    answers: [
      {
        id: "Q03A",
        text: "Je peux tenir le rythme, mais j’ai besoin de préserver des temps de récupération clairs.",
        codes: { STA_RECUL: 3, RYT_STABLE: 2 },
      },
      {
        id: "Q03B",
        text: "Je m’organise pour maintenir une régularité malgré l’intensité.",
        codes: { AUT_ORGANISE: 3, STA_STABLE: 2 },
      },
      {
        id: "Q03C",
        text: "Je fonctionne souvent efficacement dans les périodes dynamiques et soutenues.",
        codes: { RYT_REACTIF: 3, STA_RESILIENT: 2 },
      },
      {
        id: "Q03D",
        text: "Les périodes de forte intensité renforcent généralement mon engagement et ma motivation.",
        codes: { RYT_INTENSE: 3, ALI_ENGAGEMENT: 2, INI_TRANSFORMATION: 1 },
      },
    ],
  },

  {
    id: "Q04",
    dimension: "Rapport au cadre",
    title: "Les méthodes de travail sont peu formalisées.",
    context:
      "Vous intégrez un environnement où les méthodes de travail évoluent régulièrement.",
    answers: [
      {
        id: "Q04A",
        text: "J’ai besoin de comprendre précisément les attentes avant de me sentir pleinement efficace.",
        codes: { CAD_STRUCTURE: 3, ALI_SECURITE: 2 },
      },
      {
        id: "Q04B",
        text: "Je construis progressivement mes propres repères pour trouver un fonctionnement stable.",
        codes: { CAD_REPERE: 3, AUT_ORGANISE: 2 },
      },
      {
        id: "Q04C",
        text: "Je peux avancer même si les méthodes ne sont pas encore totalement définies.",
        codes: { CAD_SOUPELESSE: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q04D",
        text: "Je suis généralement à l’aise dans les environnements qui se construisent en mouvement.",
        codes: { CAD_INCERTITUDE: 3, RYT_REACTIF: 2, INI_PROACTIF: 1 },
      },
    ],
  },

  {
    id: "Q05",
    dimension: "Rapport au cadre",
    title: "Une consigne laisse une grande liberté.",
    context:
      "Une consigne donnée reste volontairement large afin de laisser de la liberté dans la manière de faire.",
    answers: [
      {
        id: "Q05A",
        text: "Je préfère clarifier davantage les attentes pour éviter de partir dans une mauvaise direction.",
        codes: { CAD_STRUCTURE: 3, COM_PRUDENT: 1 },
      },
      {
        id: "Q05B",
        text: "Je définis une méthode personnelle avant de commencer à avancer.",
        codes: { AUT_ORGANISE: 3, CAD_REPERE: 2 },
      },
      {
        id: "Q05C",
        text: "Je suis à l’aise avec une certaine liberté d’interprétation dans l’exécution.",
        codes: { CAD_SOUPELESSE: 3, AUT_DECISION: 2 },
      },
      {
        id: "Q05D",
        text: "J’apprécie particulièrement les contextes qui laissent de l’espace à l’initiative personnelle.",
        codes: { AUT_MOTEUR: 3, INI_PROACTIF: 2 },
      },
    ],
  },

  {
    id: "Q06",
    dimension: "Rapport au cadre",
    title: "Les processus internes changent régulièrement.",
    context:
      "L’organisation modifie certains processus afin de s’adapter à son évolution.",
    answers: [
      {
        id: "Q06A",
        text: "Les changements trop fréquents peuvent me déstabiliser si les repères deviennent flous.",
        codes: { RYT_STABLE: 2, CAD_STRUCTURE: 2, CAD_INCERTITUDE: -2 },
      },
      {
        id: "Q06B",
        text: "J’ai besoin d’un temps d’ajustement avant d’intégrer de nouvelles façons de fonctionner.",
        codes: { RYT_ADAPT: 3, STA_RECUL: 1 },
      },
      {
        id: "Q06C",
        text: "Je m’adapte assez naturellement lorsque les évolutions sont cohérentes et expliquées.",
        codes: { CAD_SOUPELESSE: 2, ALI_COHERENCE: 2 },
      },
      {
        id: "Q06D",
        text: "Je considère souvent les changements comme des opportunités d’amélioration.",
        codes: { INI_PROGRESSIF: 2, INI_PROACTIF: 2, RYT_REACTIF: 1 },
      },
    ],
  },

  {
    id: "Q07",
    dimension: "Autonomie professionnelle",
    title: "Une mission avance sans suivi rapproché.",
    context:
      "Une mission importante doit avancer alors que votre responsable reste peu disponible pendant plusieurs jours.",
    answers: [
      {
        id: "Q07A",
        text: "Je préfère attendre certains retours avant de prendre des décisions importantes.",
        codes: { AUT_ACCOMPAGNE: 3, CAD_STRUCTURE: 1 },
      },
      {
        id: "Q07B",
        text: "J’avance sur les éléments les plus clairs en préparant les points à valider ensuite.",
        codes: { AUT_ORGANISE: 3, CAD_REPERE: 1 },
      },
      {
        id: "Q07C",
        text: "Je peux avancer de manière autonome tant que l’objectif reste compréhensible.",
        codes: { AUT_DECISION: 3, ALI_COHERENCE: 1 },
      },
      {
        id: "Q07D",
        text: "Je prends naturellement des initiatives pour maintenir le mouvement du projet.",
        codes: { AUT_MOTEUR: 3, INI_PROACTIF: 2 },
      },
    ],
  },

  {
    id: "Q08",
    dimension: "Autonomie professionnelle",
    title: "Le travail n’est pas suivi quotidiennement.",
    context:
      "Vous devez organiser votre travail sans méthode imposée ni suivi quotidien.",
    answers: [
      {
        id: "Q08A",
        text: "J’ai besoin de repères réguliers pour rester pleinement efficace.",
        codes: { AUT_ACCOMPAGNE: 3, CAD_STRUCTURE: 2 },
      },
      {
        id: "Q08B",
        text: "Je mets progressivement en place mon propre cadre d’organisation.",
        codes: { AUT_ORGANISE: 3, CAD_REPERE: 2 },
      },
      {
        id: "Q08C",
        text: "Je gère facilement mon rythme et mes priorités de manière autonome.",
        codes: { AUT_DECISION: 3, RYT_ADAPT: 1 },
      },
      {
        id: "Q08D",
        text: "J’apprécie particulièrement les environnements qui laissent une grande liberté d’action.",
        codes: { AUT_MOTEUR: 3, CAD_SOUPELESSE: 2 },
      },
    ],
  },

  {
    id: "Q09",
    dimension: "Autonomie professionnelle",
    title: "Une décision opérationnelle doit être prise.",
    context:
      "Une décision doit être prise rapidement alors que plusieurs options restent possibles.",
    answers: [
      {
        id: "Q09A",
        text: "Je préfère consulter avant de décider lorsqu’il existe encore des incertitudes.",
        codes: { AUT_ACCOMPAGNE: 2, COM_PRUDENT: 2 },
      },
      {
        id: "Q09B",
        text: "J’analyse les options avant de choisir la solution la plus cohérente.",
        codes: { AUT_ORGANISE: 2, ALI_COHERENCE: 2 },
      },
      {
        id: "Q09C",
        text: "Je peux décider rapidement lorsque la situation l’exige.",
        codes: { AUT_DECISION: 3, RYT_REACTIF: 1 },
      },
      {
        id: "Q09D",
        text: "Je suis généralement à l’aise avec la prise de décision rapide et l’ajustement ensuite.",
        codes: { AUT_MOTEUR: 2, CAD_INCERTITUDE: 2, RYT_REACTIF: 1 },
      },
    ],
  },

  {
    id: "Q10",
    dimension: "Communication",
    title: "Un désaccord apparaît dans l’équipe.",
    context:
      "Un désaccord apparaît au sein d’une équipe sur la manière de gérer une situation importante.",
    answers: [
      {
        id: "Q10A",
        text: "Je préfère observer et comprendre avant d’intervenir dans l’échange.",
        codes: { COM_PRUDENT: 3, COO_OBSERVATION: 2 },
      },
      {
        id: "Q10B",
        text: "Je cherche un équilibre permettant de préserver une bonne coopération.",
        codes: { COM_EQUILIBRE: 3, COO_ADAPTATION: 2 },
      },
      {
        id: "Q10C",
        text: "J’exprime assez directement ma vision lorsque cela me semble utile.",
        codes: { COM_DIRECT: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q10D",
        text: "Je suis à l’aise pour faire avancer rapidement les discussions même dans les tensions.",
        codes: { COM_IMPULSION: 3, STA_RESILIENT: 1 },
      },
    ],
  },

  {
    id: "Q11",
    dimension: "Communication",
    title: "Une information sensible doit être transmise.",
    context:
      "Vous devez transmettre une information sensible à un collègue ou à un client.",
    answers: [
      {
        id: "Q11A",
        text: "Je prends du temps pour formuler précisément les choses afin d’éviter les tensions inutiles.",
        codes: { COM_PRUDENT: 3, STA_RECUL: 1 },
      },
      {
        id: "Q11B",
        text: "Je cherche une manière claire et constructive d’aborder la situation.",
        codes: { COM_EQUILIBRE: 3, COO_ADAPTATION: 1 },
      },
      {
        id: "Q11C",
        text: "Je préfère être direct tout en restant respectueux.",
        codes: { COM_DIRECT: 3, ALI_COHERENCE: 1 },
      },
      {
        id: "Q11D",
        text: "Je considère qu’une communication rapide et transparente reste prioritaire même si elle peut être inconfortable.",
        codes: { COM_IMPULSION: 2, COM_DIRECT: 2 },
      },
    ],
  },

  {
    id: "Q12",
    dimension: "Communication",
    title: "Toutes les idées ne sont pas entendues.",
    context:
      "Dans une réunion, plusieurs personnes prennent facilement la parole alors que certaines idées restent peu entendues.",
    answers: [
      {
        id: "Q12A",
        text: "Je préfère intervenir lorsque j’ai suffisamment de recul sur la situation.",
        codes: { COM_PRUDENT: 2, STA_RECUL: 2 },
      },
      {
        id: "Q12B",
        text: "J’essaie de faire circuler les échanges de manière équilibrée.",
        codes: { COM_EQUILIBRE: 3, COO_LIEN: 1 },
      },
      {
        id: "Q12C",
        text: "Je prends naturellement la parole lorsqu’un point important doit être clarifié.",
        codes: { COM_DIRECT: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q12D",
        text: "Je suis souvent moteur dans les échanges collectifs et les dynamiques de groupe.",
        codes: { COM_IMPULSION: 3, COO_LIEN: 2 },
      },
    ],
  },

  {
    id: "Q13",
    dimension: "Gestion des tensions",
    title: "Une période d’incertitude crée des tensions.",
    context:
      "Une période d’incertitude professionnelle crée des tensions dans l’équipe.",
    answers: [
      {
        id: "Q13A",
        text: "Les contextes instables peuvent fortement impacter mon énergie mentale.",
        codes: { STA_SENSIBLE: 3, CAD_STRUCTURE: 1 },
      },
      {
        id: "Q13B",
        text: "J’ai besoin de retrouver certains repères pour rester pleinement serein.",
        codes: { STA_RECUL: 2, CAD_REPERE: 2 },
      },
      {
        id: "Q13C",
        text: "Je garde généralement une certaine stabilité même lorsque l’environnement devient tendu.",
        codes: { STA_STABLE: 3, COO_ADAPTATION: 1 },
      },
      {
        id: "Q13D",
        text: "Je parviens souvent à rester mobilisé et actif même dans les périodes difficiles.",
        codes: { STA_RESILIENT: 3, RYT_REACTIF: 1 },
      },
    ],
  },

  {
    id: "Q14",
    dimension: "Gestion des tensions",
    title: "Un retour critique est formulé.",
    context:
      "Un retour critique est formulé sur votre travail après plusieurs semaines d’investissement.",
    answers: [
      {
        id: "Q14A",
        text: "Les critiques peuvent me toucher durablement même lorsque je les comprends.",
        codes: { STA_SENSIBLE: 3, STA_RECUL: 1 },
      },
      {
        id: "Q14B",
        text: "J’ai besoin d’un temps de recul pour intégrer ce type de retour.",
        codes: { STA_RECUL: 3, COM_PRUDENT: 1 },
      },
      {
        id: "Q14C",
        text: "Je considère généralement les retours comme des éléments utiles d’ajustement.",
        codes: { STA_STABLE: 3, RYT_ADAPT: 1 },
      },
      {
        id: "Q14D",
        text: "Les retours directs ou exigeants ne remettent pas facilement mon engagement en question.",
        codes: { STA_RESILIENT: 3, ALI_ENGAGEMENT: 1 },
      },
    ],
  },

  {
    id: "Q15",
    dimension: "Gestion des tensions",
    title: "Plusieurs imprévus arrivent en même temps.",
    context:
      "Plusieurs imprévus surviennent simultanément alors qu’une échéance importante approche.",
    answers: [
      {
        id: "Q15A",
        text: "Je ressens rapidement une surcharge lorsque trop d’éléments se cumulent.",
        codes: { STA_SENSIBLE: 3, RYT_STABLE: 1 },
      },
      {
        id: "Q15B",
        text: "Je tente de réorganiser les priorités pour retrouver progressivement de la stabilité.",
        codes: { STA_RECUL: 2, AUT_ORGANISE: 2 },
      },
      {
        id: "Q15C",
        text: "Je garde généralement ma capacité d’action malgré la pression.",
        codes: { STA_STABLE: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q15D",
        text: "Les contextes complexes et intenses renforcent souvent ma concentration.",
        codes: { STA_RESILIENT: 3, RYT_INTENSE: 2 },
      },
    ],
  },

  {
    id: "Q16",
    dimension: "Fonctionnement collectif",
    title: "Plusieurs profils doivent se coordonner.",
    context:
      "Un projet nécessite une forte coordination entre plusieurs profils très différents.",
    answers: [
      {
        id: "Q16A",
        text: "Les dynamiques collectives très mouvantes peuvent parfois me fatiguer.",
        codes: { COO_DISTANCE: 2, STA_SENSIBLE: 2 },
      },
      {
        id: "Q16B",
        text: "Je cherche d’abord à comprendre le fonctionnement de chacun pour mieux collaborer.",
        codes: { COO_OBSERVATION: 3, COM_EQUILIBRE: 1 },
      },
      {
        id: "Q16C",
        text: "Je m’adapte assez facilement aux différents styles de travail.",
        codes: { COO_ADAPTATION: 3, CAD_SOUPELESSE: 1 },
      },
      {
        id: "Q16D",
        text: "J’aime créer du lien et faire avancer les dynamiques collectives.",
        codes: { COO_LIEN: 3, COM_IMPULSION: 1 },
      },
    ],
  },

  {
    id: "Q17",
    dimension: "Fonctionnement collectif",
    title: "Un collègue rencontre une difficulté.",
    context:
      "Un collègue rencontre des difficultés importantes sur une mission commune.",
    answers: [
      {
        id: "Q17A",
        text: "Je préfère éviter de trop intervenir tant que cela ne remet pas directement le projet en difficulté.",
        codes: { COO_DISTANCE: 3, AUT_DECISION: 1 },
      },
      {
        id: "Q17B",
        text: "J’essaie d’apporter un soutien équilibré tout en maintenant mes propres priorités.",
        codes: { COO_ADAPTATION: 2, COM_EQUILIBRE: 2 },
      },
      {
        id: "Q17C",
        text: "Je m’implique naturellement pour aider à rétablir une dynamique collective stable.",
        codes: { COO_LIEN: 2, STA_STABLE: 1 },
      },
      {
        id: "Q17D",
        text: "Je prends facilement un rôle actif pour remobiliser l’équipe si nécessaire.",
        codes: { COO_LIEN: 3, COM_IMPULSION: 2 },
      },
    ],
  },

  {
    id: "Q18",
    dimension: "Fonctionnement collectif",
    title: "Vous intégrez une équipe déjà soudée.",
    context:
      "Vous intégrez une équipe déjà très soudée avec ses propres habitudes de fonctionnement.",
    answers: [
      {
        id: "Q18A",
        text: "J’ai besoin de temps avant de trouver pleinement ma place dans un collectif déjà structuré.",
        codes: { COO_OBSERVATION: 2, STA_RECUL: 2 },
      },
      {
        id: "Q18B",
        text: "J’observe progressivement les dynamiques avant de m’intégrer naturellement.",
        codes: { COO_OBSERVATION: 3, COM_PRUDENT: 1 },
      },
      {
        id: "Q18C",
        text: "Je m’adapte généralement assez vite aux nouveaux environnements humains.",
        codes: { COO_ADAPTATION: 3, CAD_SOUPELESSE: 1 },
      },
      {
        id: "Q18D",
        text: "Je crée facilement des connexions même dans des groupes déjà établis.",
        codes: { COO_LIEN: 3, COM_IMPULSION: 1 },
      },
    ],
  },

  {
    id: "Q19",
    dimension: "Initiative",
    title: "Une amélioration possible apparaît.",
    context:
      "Vous identifiez une amélioration possible dans un fonctionnement interne accepté depuis longtemps.",
    answers: [
      {
        id: "Q19A",
        text: "Je préfère attendre de bien comprendre le contexte avant de proposer des changements.",
        codes: { INI_PRUDENT: 3, CAD_REPERE: 1 },
      },
      {
        id: "Q19B",
        text: "J’évoque progressivement mes idées lorsque le moment semble pertinent.",
        codes: { INI_PROGRESSIF: 3, COM_EQUILIBRE: 1 },
      },
      {
        id: "Q19C",
        text: "Je propose assez naturellement des pistes d’amélioration lorsque j’en vois l’intérêt.",
        codes: { INI_PROACTIF: 3, AUT_MOTEUR: 1 },
      },
      {
        id: "Q19D",
        text: "J’aime impulser du mouvement et transformer les façons de faire lorsque cela paraît utile.",
        codes: { INI_TRANSFORMATION: 3, COM_IMPULSION: 1 },
      },
    ],
  },

  {
    id: "Q20",
    dimension: "Initiative",
    title: "Un fonctionnement pourrait être optimisé.",
    context:
      "Une mission fonctionne correctement mais pourrait probablement être optimisée.",
    answers: [
      {
        id: "Q20A",
        text: "Je préfère maintenir un fonctionnement stable lorsqu’il produit déjà des résultats satisfaisants.",
        codes: { INI_PRUDENT: 3, RYT_STABLE: 1 },
      },
      {
        id: "Q20B",
        text: "J’améliore progressivement les choses sans bouleverser l’équilibre existant.",
        codes: { INI_PROGRESSIF: 3, ALI_COHERENCE: 1 },
      },
      {
        id: "Q20C",
        text: "Je cherche souvent des moyens d’améliorer l’efficacité ou la fluidité.",
        codes: { INI_PROACTIF: 3, AUT_MOTEUR: 1 },
      },
      {
        id: "Q20D",
        text: "J’ai naturellement tendance à remettre en question les systèmes pour les faire évoluer.",
        codes: { INI_TRANSFORMATION: 3, CAD_INCERTITUDE: 1 },
      },
    ],
  },

  {
    id: "Q21",
    dimension: "Initiative",
    title: "Une opportunité inattendue apparaît.",
    context:
      "Une opportunité inattendue apparaît alors qu’elle n’était pas prévue initialement.",
    answers: [
      {
        id: "Q21A",
        text: "J’ai besoin de temps avant de sortir du cadre prévu.",
        codes: { INI_PRUDENT: 2, CAD_STRUCTURE: 2 },
      },
      {
        id: "Q21B",
        text: "J’évalue progressivement les implications avant de modifier la trajectoire.",
        codes: { INI_PROGRESSIF: 3, STA_RECUL: 1 },
      },
      {
        id: "Q21C",
        text: "Je peux saisir rapidement une opportunité lorsqu’elle semble cohérente.",
        codes: { INI_PROACTIF: 3, ALI_COHERENCE: 1 },
      },
      {
        id: "Q21D",
        text: "Les nouvelles possibilités stimulent généralement fortement mon engagement.",
        codes: { INI_TRANSFORMATION: 2, ALI_ENGAGEMENT: 2 },
      },
    ],
  },

  {
    id: "Q22",
    dimension: "Compatibilité contextuelle",
    title: "L’environnement attendu ne correspond pas totalement à vos habitudes.",
    context:
      "Vous découvrez que le poste implique un fonctionnement différent de celui dans lequel vous êtes habituellement le plus à l’aise.",
    answers: [
      {
        id: "Q22A",
        text: "J’ai besoin de vérifier que cet environnement pourra réellement me convenir dans la durée.",
        codes: { ALI_SECURITE: 3, STA_RECUL: 1 },
      },
      {
        id: "Q22B",
        text: "Je cherche à comprendre les écarts pour voir comment je peux m’ajuster progressivement.",
        codes: { ALI_COHERENCE: 3, RYT_ADAPT: 1 },
      },
      {
        id: "Q22C",
        text: "Je peux m’adapter si le sens du poste et les attentes sont clairs.",
        codes: { ALI_COMPATIBLE: 3, CAD_REPERE: 1 },
      },
      {
        id: "Q22D",
        text: "Un environnement différent peut devenir stimulant s’il ouvre de vraies possibilités d’évolution.",
        codes: { ALI_ENGAGEMENT: 2, INI_PROACTIF: 2 },
      },
    ],
  },

  {
    id: "Q23",
    dimension: "Compatibilité contextuelle",
    title: "Le poste exige une posture durable.",
    context:
      "Le poste semble demander une implication régulière, une certaine endurance et une bonne cohérence avec l’environnement.",
    answers: [
      {
        id: "Q23A",
        text: "Je fais attention à ne pas m’engager dans un contexte qui risque de m’user avec le temps.",
        codes: { ALI_SECURITE: 3, STA_SENSIBLE: 1 },
      },
      {
        id: "Q23B",
        text: "J’ai besoin de sentir une cohérence entre le rôle, l’équipe et les attentes réelles.",
        codes: { ALI_COHERENCE: 3, CAD_STRUCTURE: 1 },
      },
      {
        id: "Q23C",
        text: "Je peux m’investir durablement lorsque le cadre et la mission sont suffisamment lisibles.",
        codes: { ALI_COMPATIBLE: 3, STA_STABLE: 1 },
      },
      {
        id: "Q23D",
        text: "Lorsque je me sens aligné avec un environnement, mon engagement devient naturellement très fort.",
        codes: { ALI_ENGAGEMENT: 3, AUT_MOTEUR: 1 },
      },
    ],
  },

  {
    id: "Q24",
    dimension: "Compatibilité contextuelle",
    title: "Vous vous projetez dans l’organisation.",
    context:
      "Vous essayez d’imaginer votre place réelle dans cette organisation, au-delà de la fiche de poste.",
    answers: [
      {
        id: "Q24A",
        text: "J’ai besoin de sentir que l’environnement sera suffisamment sécurisant pour m’y projeter.",
        codes: { ALI_SECURITE: 3, CAD_STRUCTURE: 1 },
      },
      {
        id: "Q24B",
        text: "Je cherche surtout à comprendre si mon fonctionnement peut trouver une place cohérente.",
        codes: { ALI_COHERENCE: 3, COO_OBSERVATION: 1 },
      },
      {
        id: "Q24C",
        text: "Je peux me projeter lorsque je perçois une compatibilité claire avec l’équipe et le poste.",
        codes: { ALI_COMPATIBLE: 3, COO_ADAPTATION: 1 },
      },
      {
        id: "Q24D",
        text: "Je me projette fortement lorsque je sens que le contexte peut nourrir mon évolution.",
        codes: { ALI_ENGAGEMENT: 3, INI_TRANSFORMATION: 1 },
      },
    ],
  },
];