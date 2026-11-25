"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/site";

const setupPrompt = `Set up Studio SDK - ${SITE_URL}/setup-studio-sdk.txt`;

export default function SdkAgentSetup() {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimeout.current) clearTimeout(resetTimeout.current);
    },
    [],
  );

  async function copyPrompt() {
    if (resetTimeout.current) clearTimeout(resetTimeout.current);

    try {
      await navigator.clipboard.writeText(setupPrompt);
      setStatus("copied");
      resetTimeout.current = setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto mb-8 w-full !max-w-[760px] text-center">
      <p className="mb-3 text-sm font-medium text-[#cbc4d1]">
        Give this to your AI agent
      </p>
      <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-[#100c14]/80 p-2 pl-4 text-left shadow-lg shadow-black/10 sm:pl-5">
        <code className="min-w-0 flex-1 select-all font-mono text-xs leading-6 text-[#eee8f1] [overflow-wrap:anywhere] sm:text-sm">
          {setupPrompt}
        </code>
        <button
          type="button"
          onClick={copyPrompt}
          aria-label={
            status === "copied"
              ? "Setup prompt copied"
              : "Copy Studio SDK setup prompt"
          }
          data-ph-capture-attribute-placement="sdk-overview-agent-setup"
          data-ph-capture-attribute-cta="Copy setup prompt"
          className="inline-flex min-h-11 w-[92px] shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 text-xs font-medium text-[#eee8f1] transition-colors hover:border-[#b66bc4]/50 hover:bg-white/10 focus-visible:outline-offset-2"
        >
          {status === "copied" ? (
            <Check size={14} aria-hidden />
          ) : (
            <Copy size={14} aria-hidden />
          )}
          {status === "copied" ? "Copied!" : "Copy"}
        </button>
      </div>
      <p role="status" className="mt-2 text-xs leading-5 text-[#a59bad]">
        {status === "error"
          ? "Couldn’t copy. Select the prompt and copy it manually."
          : "Paste into Claude Code, Cursor, Codex, or your coding agent."}
        <span className="sr-only">
          {status === "copied" ? " Setup prompt copied to clipboard." : ""}
        </span>
      </p>
    </div>
  );
}
