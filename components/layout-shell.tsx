import Link from "next/link";
import { ArhiLogo } from "./arhi-logo";

const nav = [{ href: "/entreprise", label: "Entreprise" }, { href: "/candidat", label: "Candidat" }, { href: "/analyse", label: "Analyse" }, { href: "/dashboard", label: "Dashboard" }, { href: "/vision", label: "Vision" }, { href: "/technologie", label: "Technologie" }];

export function LayoutShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-6 md:px-10"><header className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><Link href="/"><ArhiLogo /></Link><nav className="flex flex-wrap gap-2 text-sm text-white/70">{nav.map((item) => <Link key={item.href} href={item.href} className="rounded-full border border-white/10 px-4 py-1.5 hover:border-white/30">{item.label}</Link>)}</nav></header>{children}</div>;
}
