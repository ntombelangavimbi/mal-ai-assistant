import { Link } from "@tanstack/react-router";
import { MalWordmark } from "./MalWordmark";
import { ShieldCheck } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/summarizer", label: "Summarizer" },
  { to: "/planner", label: "Planner" },
  { to: "/chat", label: "Chat" },
] as const;

export function MalNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/20 bg-brand-brown text-brand-brown-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <MalWordmark />
          <span className="hidden text-sm font-medium opacity-80 sm:inline">
            Workplace Assistant AI
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-full px-3 py-1.5 text-sm font-medium opacity-80 transition-colors hover:bg-brand-brown-foreground/10 hover:opacity-100"
              activeProps={{
                className:
                  "rounded-full px-3 py-1.5 text-sm font-medium bg-brand-brown-foreground/15 opacity-100",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1.5 rounded-full bg-brand-brown-foreground/10 px-3 py-1.5 text-xs font-medium md:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          No account required
        </div>
      </div>
    </header>
  );
}
