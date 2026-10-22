import {
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Send,
  Sparkles,
  Workflow,
} from "lucide-react";

const frame = "overflow-hidden rounded-xl border border-white/10 bg-[#0c0a10]";
function WindowFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={frame} role="img" aria-label={title}>
      <div className="flex h-10 items-center gap-2 border-b border-white/[0.07] bg-[#141119] px-3">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="ml-2 truncate text-[11px] text-white/50">{title}</span>
        <MoreHorizontal className="ml-auto size-4 text-white/35" />
      </div>
      {children}
    </div>
  );
}

function Avatar({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`grid size-7 shrink-0 place-items-center rounded-full bg-[#80539b]/30 text-[10px] font-semibold text-[#edcff3] ${className}`}
    >
      {label}
    </span>
  );
}

export function AiChatIllustration() {
  return (
    <WindowFrame title="Page editor · AI assistant">
      <div className="grid min-h-[300px] grid-cols-[1fr_0.95fr] max-[520px]:grid-cols-1">
        <div className="relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#35223e_0%,#17121c_60%,#100d14_100%)] p-5 max-[520px]:hidden">
          <div className="w-full max-w-[290px] rounded-lg border border-white/10 bg-[#f8f6f8] p-4 text-[#26212a] shadow-[0_18px_50px_rgba(0,0,0,.4)]">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wide">
                NORTHSTAR
              </span>
              <div className="flex gap-2 text-[8px] text-[#77717c]">
                <span>Platform</span>
                <span>Resources</span>
                <span>Log in</span>
              </div>
            </div>
            <div className="rounded-md bg-[#eee7f4] px-3 py-5">
              <span className="rounded-full bg-white px-2 py-1 text-[7px] font-medium text-[#79558c]">
                Product update
              </span>
              <p className="mt-3 max-w-[170px] text-[17px] font-semibold leading-[1.15]">
                Build pages that move your team forward.
              </p>
              <p className="mt-2 max-w-[180px] text-[8px] leading-4 text-[#756b7a]">
                Turn your ideas into a clear, polished experience.
              </p>
              <span className="mt-3 inline-flex rounded bg-[#86539a] px-2.5 py-1.5 text-[7px] font-semibold text-white">
                Explore the platform
              </span>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="h-9 flex-1 rounded bg-[#f0edf1]" />
              <span className="h-9 flex-1 rounded bg-[#f0edf1]" />
            </div>
          </div>
          <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 text-[9px] text-white/50">
            <Sparkles className="size-3 text-[#d8a9e1]" />
            Live editor canvas
          </span>
        </div>
        <div className="flex flex-col border-l border-white/[0.07] bg-[#141119] max-[520px]:border-l-0">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-3">
            <span className="grid size-6 place-items-center rounded-md bg-[#a35ea9]/20">
              <Sparkles className="size-3.5 text-[#dca8e5]" />
            </span>
            <span className="text-[11px] font-semibold text-white/90">
              AI assistant
            </span>
            <span className="ml-auto rounded-full border border-white/10 px-2 py-0.5 text-[8px] text-white/45">
              Editor-aware
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-3">
            <div className="flex justify-end">
              <p className="max-w-[92%] rounded-xl rounded-tr-sm bg-[#624273] px-3 py-2 text-[10px] leading-4 text-white">
                Make the headline shorter and add a clear call to action.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Avatar label="AI" />
              <div className="rounded-xl rounded-tl-sm border border-white/[0.08] bg-[#1d1922] px-3 py-2 text-[10px] leading-4 text-white/75">
                I tightened the headline and added a button that matches your
                brand.
              </div>
            </div>
            <div className="ml-9 flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-300/[0.06] px-2.5 py-2 text-[9px] text-emerald-100">
              <Check className="size-3.5 text-emerald-300" />
              Updated hero section{" "}
              <span className="ml-auto text-white/40">Undo</span>
            </div>
          </div>
          <div className="mx-3 mb-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0d0b10] px-3 py-2 text-[9px] text-white/35">
            <span className="flex-1">Describe an edit...</span>
            <span className="grid size-6 place-items-center rounded-md bg-[#81518e] text-white">
              <Send className="size-3" />
            </span>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function AiModelsIllustration() {
  return (
    <WindowFrame title="Workspace settings · AI models">
      <div className="grid min-h-[300px] grid-cols-[0.72fr_1.28fr] max-[520px]:grid-cols-1">
        <aside className="border-r border-white/[0.07] bg-[#141119] p-4 max-[520px]:hidden">
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[.14em] text-white/40">
            Workspace
          </p>
          {["General", "Members", "AI models", "Usage"].map((item) => (
            <div
              key={item}
              className={`mb-1 rounded-md px-2.5 py-2 text-[10px] ${item === "AI models" ? "bg-[#9f5cae]/15 text-[#edc9f2]" : "text-white/45"}`}
            >
              {item}
            </div>
          ))}
        </aside>
        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-white/90">
                Available models
              </p>
              <p className="mt-1 text-[10px] text-white/45">
                Select a model for each AI task.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-md bg-[#d6a1df] px-2.5 py-1.5 text-[9px] font-semibold text-[#221427]">
              <Plus className="size-3" />
              Add model
            </span>
          </div>
          <div className="mt-5 space-y-2">
            {[
              {
                label: "Chat assistant",
                model: "Claude 3.7 Sonnet",
                mark: "A",
              },
              { label: "Code generation", model: "GPT-4.1 mini", mark: "O" },
              { label: "Image generation", model: "Studio default", mark: "✦" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.025] p-3"
              >
                <span className="grid size-7 place-items-center rounded-md bg-white/[0.07] text-[10px] font-semibold text-white/70">
                  {item.mark}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-white/45">{item.label}</p>
                  <p className="mt-0.5 truncate text-[11px] font-medium text-white/85">
                    {item.model}
                  </p>
                </div>
                <ChevronDown className="size-3.5 text-white/40" />
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-md border border-[#a273b2]/20 bg-[#9861a6]/[0.07] p-2.5 text-[9px] leading-4 text-white/55">
            <LockKeyhole className="mt-0.5 size-3 shrink-0 text-[#d4a0df]" />
            Provider credentials stay in your workspace. The editor receives
            model IDs, not API keys.
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function AiToolsIllustration() {
  return (
    <WindowFrame title="AI workflow · Product tools">
      <div className="grid min-h-[300px] grid-cols-[1fr_auto_1fr] items-center gap-3 bg-[radial-gradient(ellipse_at_center,rgba(114,70,132,.14),transparent_70%)] p-4 sm:gap-5 sm:p-6">
        <div className="space-y-2">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-white/80">
            <MessageSquareText className="size-3.5 text-[#d9a7e0]" />
            AI request
          </div>
          <div className="rounded-lg border border-white/10 bg-[#17131b] p-3 text-[9px] leading-4 text-white/60">
            “Find the customer's latest campaign and use its offer in this
            banner.”
          </div>
          <div className="flex items-center gap-1.5 text-[8px] text-white/35">
            <Sparkles className="size-3 text-[#d9a7e0]" />
            Assistant decides which tool to use
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 text-[#d29ad9]">
          <span className="h-12 w-px bg-gradient-to-b from-transparent via-[#a963b3] to-transparent" />
          <ArrowUpRight className="size-4" />
          <span className="text-[8px]">tool call</span>
        </div>
        <div className="space-y-2">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-white/80">
            <Workflow className="size-3.5 text-[#d9a7e0]" />
            Your product tools
          </div>
          {[
            { icon: Layers3, title: "getCampaignContext", state: "Completed" },
            { icon: Code2, title: "updateEditorBlock", state: "Ready" },
          ].map(({ icon: Icon, title, state }) => (
            <div
              key={title}
              className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-[#17131b] p-3"
            >
              <span className="grid size-7 place-items-center rounded-md bg-[#9f5cae]/15 text-[#d9a7e0]">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="truncate font-mono text-[9px] text-white/80">
                  {title}
                </p>
                <p className="mt-1 text-[8px] text-white/35">{state}</p>
              </div>
              <Check className="ml-auto size-3 text-emerald-300/75" />
            </div>
          ))}
          <div className="rounded-lg border border-dashed border-white/10 px-3 py-2 text-center text-[8px] text-white/35">
            Connect app data · execute editor actions
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

export function AiBackendIllustration() {
  return (
    <WindowFrame title="Your infrastructure · AI backend">
      <div className="grid min-h-[300px] grid-cols-[1fr_0.9fr] gap-4 p-4 sm:gap-6 sm:p-6 max-[520px]:grid-cols-1">
        <div className="flex flex-col justify-center">
          <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold text-white/80">
            <LockKeyhole className="size-3.5 text-[#d9a7e0]" />
            Private AI route
          </div>
          <div className="rounded-lg border border-white/10 bg-[#101017] p-3 font-mono text-[9px] leading-5 text-white/55">
            <p>
              <span className="text-[#d29ad9]">POST</span> /api/ai/chat
            </p>
            <p className="mt-2 text-white/35">
              // your API key stays server-side
            </p>
            <p>
              <span className="text-[#d29ad9]">const</span> result ={" "}
              <span className="text-emerald-200">createStreamResponse</span>(
              {"{"}
            </p>
            <p className="pl-3">messages, projectContext,</p>
            <p className="pl-3">model, tools, systemPrompt</p>
            <p>{"}"});</p>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[8px] text-white/40">
            <Check className="size-3 text-emerald-300" />
            Streaming response to the editor
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          {[
            {
              title: "Your app",
              sub: "Auth · product data · policy",
              icon: LockKeyhole,
            },
            {
              title: "AI SDK backend",
              sub: "Models · tools · prompt",
              icon: Bot,
            },
            {
              title: "Studio editor",
              sub: "Chat UI · project context",
              icon: Sparkles,
            },
          ].map(({ title, sub, icon: Icon }, index) => (
            <div
              key={title}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#17131b] p-3"
            >
              <span className="grid size-8 place-items-center rounded-md bg-[#9f5cae]/15 text-[#d9a7e0]">
                <Icon className="size-4" />
              </span>
              <div>
                <p className="text-[10px] font-medium text-white/80">{title}</p>
                <p className="mt-1 text-[8px] text-white/40">{sub}</p>
              </div>
              {index < 2 && (
                <span className="ml-auto text-[10px] text-[#d9a7e0]">↓</span>
              )}
            </div>
          ))}
          <span className="mt-1 text-center text-[8px] text-white/35">
            Keep full control on Business plans
          </span>
        </div>
      </div>
    </WindowFrame>
  );
}
