import { LayoutShell } from "@/components/layout-shell";
import { DimensionCards, CtaPanel } from "@/components/premium-sections";
const dims = ["Rythme", "Structure", "Autonomie", "Pression", "Communication", "Stabilité", "Adaptation", "Projection", "Décision", "Énergie sociale"];
export default function EntreprisePage() { return <LayoutShell><h1 className="text-4xl md:text-5xl">Expérience Entreprise</h1><p className="mt-4 max-w-3xl text-white/70">Un parcours qui révèle l&apos;ADN humain de l&apos;organisation à travers des situations nuancées, des arbitrages et des dynamiques collectives.</p><section className="mt-12"><DimensionCards items={dims} /></section><CtaPanel /></LayoutShell>; }
