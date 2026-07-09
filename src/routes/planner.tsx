import { createFileRoute } from "@tanstack/react-router";
import { ToolWorkspace } from "@/components/mal/ToolWorkspace";
import { planTasks } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Mal Workplace Assistant AI" },
      {
        name: "description",
        content:
          "Tell Mal about your tasks, goals, and deadlines to get a smart daily and weekly plan with priorities and productivity advice.",
      },
      { property: "og:title", content: "AI Task Planner — Mal" },
      {
        property: "og:description",
        content:
          "Create smart daily and weekly plans while prioritising important tasks.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <ToolWorkspace
      eyebrow="AI Task Planner"
      title="Plan your work with Mal"
      description="Create smart daily and weekly plans while prioritising important tasks."
      inputTitle="Tell Mal about your work"
      helper="Tell Mal about your tasks, goals, deadlines, and available time."
      placeholder="e.g. I have a client proposal due Friday, three meetings this week, and I want to prepare a Q3 report. I have about 6 focused hours a day..."
      buttonLabel="Create Plan"
      run={planTasks}
    />
  );
}
