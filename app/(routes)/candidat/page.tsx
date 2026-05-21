import { LayoutShell } from "@/components/layout-shell";
import { DimensionCards } from "@/components/premium-sections";
const situations = ["Contexte d&apos;urgence", "Ambiguïté stratégique", "Conflit silencieux", "Décision impopulaire", "Transmission de cap", "Stabilisation d&apos;équipe"];
export default function CandidatPage() { return <LayoutShell><h1 className="text-4xl md:text-5xl">Expérience Candidat</h1><p className="mt-4 max-w-3xl text-white/70">Une exploration fluide de situations professionnelles : jamais un test, toujours une lecture fine du fonctionnement humain.</p><section className="mt-12"><DimensionCards items={situations} /></section></LayoutShell>; }
