"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SITE_URL } from "@/lib/site";

const setupPrompt = `Set up Studio SDK - ${SITE_URL}/setup-sdk.txt`;

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
    <div className="mx-auto mb-8 w-fit !max-w-full text-center">
      <p className="mb-3 text-sm text-[#cbc4d1]">
        or ask your AI agent to set up Studio SDK
      </p>
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#100c14]/50 p-1.5 pl-5 text-left shadow-lg shadow-black/10 backdrop-blur-md sm:pl-6">
        <code
          title={setupPrompt}
          className="min-w-0 flex-1 select-all truncate font-mono text-[11px] leading-5 text-[#b9b0c2] sm:text-xs"
        >
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
          className="inline-flex min-h-9 w-[88px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-[#eee8f1] transition-colors hover:border-[#b66bc4]/50 hover:bg-white/10 focus-visible:outline-offset-2"
        >
          {status === "copied" ? (
            <Check size={14} className="shrink-0" aria-hidden />
          ) : (
            <Copy size={14} className="shrink-0" aria-hidden />
          )}
          {status === "copied" ? "Copied!" : "Copy"}
        </button>
      </div>
      <p
        role="status"
        className={
          status === "error"
            ? "mt-2 text-xs leading-5 text-[#a59bad]"
            : "sr-only"
        }
      >
        {status === "error"
          ? "Couldn’t copy. Select the prompt and copy it manually."
          : status === "copied"
            ? "Setup prompt copied to clipboard."
            : ""}
      </p>
    </div>
  );
}
