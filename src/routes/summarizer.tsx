import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/mal/ToolWorkspace";
import { summarizeNotes } from "@/lib/ai.functions";

export const Route = createFileRoute("/summarizer")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Mal Workplace Assistant AI" },
      {
        name: "description",
        content:
          "Paste your meeting notes and let Mal organise them into a clear summary with decisions, action items, and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Mal" },
      {
        property: "og:description",
        content:
          "Turn lengthy meeting notes into clear summaries, decisions, and action items.",
      },
    ],
  }),
  component: SummarizerPage,
});

function SummarizerPage() {
  return (
    <ToolWorkspace
      eyebrow="Meeting Notes Summarizer"
      title="Summarise your meeting"
      description="Transform lengthy meeting notes into clear summaries, decisions, action items, and deadlines."
      inputTitle="Paste your meeting notes"
      helper="Add your meeting notes or transcript and Mal will organise the important information for you."
      placeholder="Paste your meeting transcript, notes, or discussion points here..."
      buttonLabel="Summarise Notes"
      run={summarizeNotes}
    />
  );
}
