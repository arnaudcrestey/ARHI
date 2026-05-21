import Link from "next/link";
import { LayoutShell } from "@/components/layout-shell";
import { Hero, DimensionCards, CtaPanel } from "@/components/premium-sections";

const pillars = ["Limites du recrutement classique", "Vision ARHI", "Cohérence professionnelle", "Intelligence relationnelle", "Expérience immersive", "Fonctionnement institutionnel"];

export default function HomePage() {
  return <LayoutShell><Hero /><section className="mt-16 space-y-6"><p className="text-sm uppercase tracking-[0.3em] text-mist">Fondamentaux</p><DimensionCards items={pillars} /></section><section className="mt-14 grid gap-4 md:grid-cols-3">{["Entreprise", "Candidat", "Analyse"].map((x) => <Link key={x} href={`/${x.toLowerCase()}`} className="card p-6"><p className="text-sm text-white/60">Expérience</p><h3 className="mt-2 text-2xl">{x}</h3></Link>)}</section><CtaPanel /></LayoutShell>;
}
