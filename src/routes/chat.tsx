import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { toast } from "sonner";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { MalWordmark } from "@/components/mal/MalWordmark";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chat — Mal Workplace Assistant AI" },
      {
        name: "description",
        content:
          "Chat with Mal for workplace advice, professional writing, planning, and problem-solving. No account required.",
      },
      { property: "og:title", content: "AI Workplace Chat — Mal" },
      {
        property: "og:description",
        content:
          "Chat with Mal for workplace advice, writing support, planning, and problem-solving.",
      },
    ],
  }),
  component: ChatPage,
});

const EXAMPLES = [
  "Write a professional email",
  "Organise my tasks",
  "Summarise a document",
  "Prepare for a meeting",
  "Give productivity ideas",
];

const GREETING =
  "Hello, I'm Mal, your AI workplace assistant. How can I help you today?";

function messageText(message: UIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

function ChatPage() {
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat" }),
    [],
  );
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (error) =>
      toast.error(error instanceof Error ? error.message : "Mal couldn't respond. Please try again."),
  });

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    textareaRef.current?.focus();
  }, [status]);

  const send = (text: string) => {
    if (!text.trim() || isBusy) return;
    sendMessage({ text: text.trim() });
    setInput("");
  };

  const handleSubmit = (message: PromptInputMessage) => {
    send(message.text ?? input);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 sm:px-6">
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-brown text-brand-brown-foreground shadow-[var(--shadow-soft)]">
                <MalWordmark className="text-3xl" />
              </div>
              <p className="mt-5 max-w-md font-serif text-xl text-brand-brown">
                {GREETING}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => send(ex)}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-brand-brown transition-colors hover:border-brand-pink hover:text-brand-pink"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  {message.role === "assistant" ? (
                    <MessageResponse>{messageText(message)}</MessageResponse>
                  ) : (
                    <span className="whitespace-pre-wrap">{messageText(message)}</span>
                  )}
                </MessageContent>
              </Message>
            ))
          )}
          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent>
                <Shimmer>Mal is thinking...</Shimmer>
              </MessageContent>
            </Message>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="pb-4 pt-2">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputTextarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Mal anything about your work..."
            disabled={isBusy}
          />
          <PromptInputFooter className="justify-between">
            <span className="text-xs text-muted-foreground">
              Temporary session — your chat clears when you leave.
            </span>
            <PromptInputSubmit
              status={status}
              disabled={isBusy || input.trim().length === 0}
            />
          </PromptInputFooter>
        </PromptInput>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Mal provides suggestions and may not always be perfect. Review
          important information before making professional decisions.
        </p>
      </div>
    </div>
  );
}
