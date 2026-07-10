import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MalWordmark } from "./MalWordmark";
import { ShieldCheck, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/summarizer", label: "Summarizer" },
  { to: "/planner", label: "Planner" },
  { to: "/chat", label: "Chat" },
] as const;

export function MalNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-brown/20 bg-brand-brown text-brand-brown-foreground">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <MalWordmark />
          <span className="hidden text-sm font-medium opacity-80 lg:inline">
            Workplace Assistant AI
          </span>
        </Link>

        {/* Desktop & tablet navigation — always visible, never collapsed */}
        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="hidden items-center gap-1.5 rounded-full bg-brand-brown-foreground/10 px-3 py-1.5 text-xs font-medium lg:flex">
          <ShieldCheck className="h-3.5 w-3.5" />
          No account required
        </div>

        {/* Mobile navigation — hamburger only on small screens */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-brand-brown-foreground/10"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-brand-brown text-brand-brown-foreground">
              <SheetHeader>
                <SheetTitle className="text-left text-brand-brown-foreground">
                  <MalWordmark />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-4">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: link.to === "/" }}
                    className="rounded-xl px-4 py-3 text-base font-medium opacity-80 transition-colors hover:bg-brand-brown-foreground/10 hover:opacity-100"
                    activeProps={{
                      className:
                        "rounded-xl px-4 py-3 text-base font-medium bg-brand-brown-foreground/15 opacity-100",
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-6 flex items-center gap-1.5 px-4 text-xs font-medium opacity-80">
                <ShieldCheck className="h-3.5 w-3.5" />
                No account required
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
