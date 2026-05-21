import { LayoutShell } from "@/components/layout-shell";
import { DimensionCards } from "@/components/premium-sections";

const elements = ["Cohérence multidimensionnelle", "Dynamiques humaines", "Structures relationnelles", "Cohérences environnementales", "Intelligence comportementale", "Lecture contextuelle continue"];

export default function TechnologiePage() { return <LayoutShell><h1 className="text-4xl md:text-5xl">Technologie & Méthodologie</h1><p className="mt-4 max-w-3xl text-white/70">ARHI combine signaux contextuels, situations professionnelles et grilles de discernement afin de révéler des compatibilités profondes et actionnables.</p><section className="mt-10"><DimensionCards items={elements} /></section></LayoutShell>; }
