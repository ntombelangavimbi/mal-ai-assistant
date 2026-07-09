import { cn } from "@/lib/utils";

export function MalWordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-serif text-2xl font-semibold tracking-tight leading-none",
        className,
      )}
    >
      Mal
      <span className="text-brand-pink">.</span>
    </span>
  );
}
