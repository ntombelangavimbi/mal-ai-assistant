import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { MalWordmark } from "@/components/mal/MalWordmark";
import {
  FileText,
  CalendarCheck,
  MessagesSquare,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mal Workplace Assistant AI — Your intelligent workplace companion" },
      {
        name: "description",
        content:
          "Summarise meetings, plan tasks, and chat with Mal. A premium, guest-access AI workplace assistant. No account required.",
      },
      { property: "og:title", content: "Mal Workplace Assistant AI — Your intelligent workplace companion" },
      {
        property: "og:description",
        content:
          "Summarise meetings, plan tasks, and chat with Mal. A premium, guest-access AI workplace assistant. No account required.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: FileText,
    title: "Meeting Notes Summarizer",
    to: "/summarizer" as const,
    description:
      "Transform lengthy meeting notes into clear summaries, decisions, action items, and deadlines.",
    benefits: [
      "Save time reviewing meetings",
      "Extract important information",
      "Track responsibilities",
    ],
    cta: "Summarise Notes",
  },
  {
    icon: CalendarCheck,
    title: "AI Task Planner",
    to: "/planner" as const,
    description:
      "Create smart daily and weekly plans while prioritising important tasks.",
    benefits: ["Organise workload", "Manage deadlines", "Improve productivity"],
    cta: "Create Plan",
  },
  {
    icon: MessagesSquare,
    title: "AI Workplace Chat",
    to: "/chat" as const,
    description:
      "Chat with Mal for workplace advice, writing support, planning, and problem-solving.",
    benefits: [
      "Get professional assistance",
      "Generate ideas",
      "Improve communication",
    ],
    cta: "Chat with Mal",
  },
];

function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: "var(--gradient-warm)" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-brand-brown/15 bg-card/70 px-4 py-1.5 text-sm font-medium text-brand-brown backdrop-blur">
            <ShieldCheck className="h-4 w-4 text-brand-pink" />
            Start using your AI workplace assistant instantly. No account required.
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight text-brand-brown sm:text-6xl">
            Welcome to <MalWordmark className="text-4xl sm:text-6xl" /> Workplace
            Assistant AI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Your intelligent workplace companion for organising tasks,
            summarising information, and improving productivity with AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/chat">
                Chat with Mal <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/summarizer">Summarise a meeting</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-brand-pink">
                <f.icon className="h-6 w-6" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-brand-brown">
                {f.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              <ul className="mt-4 space-y-2">
                {f.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-brand-pink" />
                    {b}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-6 w-full">
                <Link to={f.to}>{f.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
