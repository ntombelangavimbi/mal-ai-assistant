import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MarkdownView } from "./MarkdownView";
import { ResponsibleNotice } from "./ResponsibleNotice";
import { Copy, Check, Loader2, Pencil, Eye } from "lucide-react";
import { toast } from "sonner";

type RunFn = (args: { data: { input: string } }) => Promise<{ text: string }>;

export function ToolWorkspace({
  eyebrow,
  title,
  description,
  inputTitle,
  helper,
  placeholder,
  buttonLabel,
  run,
}: {
  eyebrow: string;
  title: string;
  description: string;
  inputTitle: string;
  helper: string;
  placeholder: string;
  buttonLabel: string;
  run: RunFn;
}) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [editing, setEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const mutation = useMutation({
    mutationFn: (value: string) => run({ data: { input: value } }),
    onSuccess: (data) => {
      setResult(data.text);
      setEditing(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
    },
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-pink">
          {eyebrow}
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-brand-brown sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-serif text-xl font-semibold text-brand-brown">
            {inputTitle}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{helper}</p>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="mt-4 min-h-[280px] resize-y bg-background text-[0.95rem] leading-relaxed"
          />
          <Button
            className="mt-4 w-full"
            disabled={mutation.isPending || input.trim().length === 0}
            onClick={() => mutation.mutate(input.trim())}
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mal is working...
              </>
            ) : (
              buttonLabel
            )}
          </Button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-semibold text-brand-brown">
              Mal's result
            </h2>
            {result && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing((v) => !v)}
                >
                  {editing ? (
                    <>
                      <Eye className="mr-1.5 h-4 w-4" /> Preview
                    </>
                  ) : (
                    <>
                      <Pencil className="mr-1.5 h-4 w-4" /> Edit
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <Check className="h-4 w-4 text-brand-pink" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4">
            {!result && !mutation.isPending && (
              <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-border text-center text-sm text-muted-foreground">
                <p className="max-w-xs px-4">
                  Your organised result will appear here once Mal has processed
                  your input.
                </p>
              </div>
            )}
            {mutation.isPending && (
              <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Organising your information...
              </div>
            )}
            {result && !mutation.isPending && (
              <>
                {editing ? (
                  <Textarea
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    className="min-h-[280px] resize-y bg-background font-mono text-sm"
                  />
                ) : (
                  <MarkdownView>{result}</MarkdownView>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <ResponsibleNotice />
      </div>
    </div>
  );
}
