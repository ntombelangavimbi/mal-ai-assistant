import { Info } from "lucide-react";

export function ResponsibleNotice() {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm text-secondary-foreground">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
      <p>
        Mal Workplace Assistant AI provides productivity assistance and
        suggestions. AI-generated responses may not always be perfect. Always
        review important information before making professional decisions.
      </p>
    </div>
  );
}
