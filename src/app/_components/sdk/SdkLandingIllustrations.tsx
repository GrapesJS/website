"use client";

import {
  ArrowDown,
  Bot,
  Check,
  ChevronDown,
  Code2,
  Image as ImageIcon,
  LoaderCircle,
  LockKeyhole,
  Server,
  Sparkles,
} from "lucide-react";
import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  ChatComposer,
  ChatMessage,
  ChatPanelHeader,
  ChatToolCard,
  editorShellText,
  editorShellTheme,
} from "../layouts/EditorShell";
import { Illustration, type IllustrationState } from "./SdkIllustrations";
import { theme } from "./theme";

function AiIllustration({
  label,
  steps,
  children,
}: {
  label: string;
  steps: string[];
  children: (state: IllustrationState) => ReactNode;
}) {
  return (
    <Illustration label={label} steps={steps}>
      {(state) => (
        <div
          className={cn(
            editorShellTheme,
            editorShellText,
            theme.illustrations.pairedViewport,
            "flex flex-col bg-[color:var(--editor-bg)] [--editor-unit:17px] [--editor-composer-height:82px]",
          )}
        >
          {children({
            ...state,
            step: state.reduced ? steps.length - 1 : state.step,
          })}
        </div>
      )}
    </Illustration>
  );
}

function PanelHeader({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className={cn(theme.illustrations.panelHeader, "shrink-0 gap-2")}>
      <Sparkles size={13} className="text-[#b494f4]" />
      <span className="min-w-0 flex-1 font-semibold text-[#ded3e6]">
        {title}
      </span>
      {caption && <span className="text-[9px] text-[#a99ab4]">{caption}</span>}
    </div>
  );
}

function ToolSpinner({ running }: { running: boolean }) {
  return (
    <LoaderCircle
      className="size-3 text-[#b597fa] motion-safe:animate-spin"
      style={{ animationPlayState: running ? "running" : "paused" }}
    />
  );
}

export function AiChatIllustration() {
  return (
    <AiIllustration
      label="Customize the AI assistant's labels, suggestions, and input"
      steps={["Your labels", "Your suggestions", "Your input"]}
    >
      {({ step }) => (
        <>
          <ChatPanelHeader
            title={step > 0 ? "YourBrand Assistant" : "AI Assistant"}
          />
          <div className="flex shrink-0 gap-2 border-b border-[color:var(--editor-border)] px-3 py-2 text-[9px]">
            {["Labels", "Suggestions", "Input"].map((label, index) => (
              <span
                key={label}
                className={cn(
                  "rounded-sm px-2 py-1 transition-colors duration-300 motion-reduce:transition-none",
                  index === step
                    ? "bg-[#8b5cf6]/20 text-[#d5bbf0]"
                    : "text-[#a99ab4]",
                )}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex min-h-0 flex-1 flex-col justify-center px-4 py-4 sm:px-6">
            <div className="mb-3 grid size-8 place-items-center rounded-lg bg-[#8b5cf6]/15 text-[#c5a8ec]">
              <Sparkles size={17} />
            </div>
            <p className="text-base font-semibold text-[#eee4f5]">
              {step > 0
                ? "Let's build your next campaign."
                : "What would you like to create?"}
            </p>
            <p className="mt-2 text-[11px] leading-5 text-[#b9a7c6]">
              An assistant shaped around your product.
            </p>
            <div className="mt-4 grid gap-2">
              {(step > 0
                ? ["Start from our brand kit", "Update our campaign offer"]
                : ["Create a hero section", "Add a contact form"]
              ).map((suggestion) => (
                <div
                  key={suggestion}
                  className="flex items-center gap-2 rounded-md border border-[color:var(--editor-border)] bg-[color:var(--editor-raised)] px-3 py-2 text-[11px] text-[#d4c7df]"
                >
                  <Sparkles size={11} className="text-[#b494f4]" />
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
          <ChatComposer
            draft={
              step === 2 ? "Update the offer for our latest campaign." : ""
            }
          />
        </>
      )}
    </AiIllustration>
  );
}

const modelTasks = [
  {
    label: "Chat assistant",
    model: "Your chat model",
    icon: Bot,
    prompt: "Use our brand voice. Keep your answers clear and useful.",
  },
  {
    label: "Code generation",
    model: "Your code model",
    icon: Code2,
    prompt: "Prefer our approved components and accessible markup.",
  },
  {
    label: "Image generation",
    model: "Your image model",
    icon: ImageIcon,
    prompt: "Follow our brand palette and product photography style.",
  },
];

export function AiModelsIllustration() {
  return (
    <AiIllustration
      label="Choose models and instructions for each AI task"
      steps={modelTasks.map((task) => task.label)}
    >
      {({ step }) => (
        <>
          <PanelHeader title="AI Settings" caption="Your workspace" />
          <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
            <p className="text-[11px] text-[#b9a7c6]">
              A model for every part of the workflow.
            </p>
            <div className="grid gap-2">
              {modelTasks.map(({ label, model, icon: Icon }, index) => (
                <div
                  key={label}
                  className={cn(
                    "flex items-center gap-3 rounded-lg border p-3 transition-colors duration-300 motion-reduce:transition-none",
                    step === index
                      ? "border-[#a88af2]/60 bg-[#8b5cf6]/10"
                      : "border-[color:var(--editor-border)] bg-[color:var(--editor-raised)]",
                  )}
                >
                  <Icon size={17} className="text-[#c5a8ec]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] text-[#a99ab4]">{label}</p>
                    <p className="mt-1 text-xs font-medium text-[#e6dcec]">
                      {model}
                    </p>
                  </div>
                  <ChevronDown size={13} />
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-[color:var(--editor-border)] bg-[#17121e] p-3">
              <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-[#c5a8ec]">
                Your instructions
              </p>
              <p className="text-[11px] leading-5 text-[#d1c1dc]">
                {modelTasks[step].prompt}
              </p>
            </div>
            <p className="mt-auto flex items-center gap-2 text-[9px] text-[#a99ab4]">
              <LockKeyhole size={11} />
              Provider credentials configured in AI Settings.
            </p>
          </div>
        </>
      )}
    </AiIllustration>
  );
}

export function AiToolsIllustration() {
  return (
    <AiIllustration
      label="Connect product context and editor actions with custom tools"
      steps={["Get product context", "Apply the result", "Ready to refine"]}
    >
      {({ step, running }) => (
        <>
          <ChatPanelHeader />
          <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
            <ChatMessage user>
              Use our latest campaign offer in this banner.
            </ChatMessage>
            <ChatToolCard
              label="getCampaignContext"
              done={step >= 1}
              status={<ToolSpinner running={running} />}
            >
              <div
                className={cn(
                  "px-3 pb-3 text-[11px] leading-5 transition-opacity duration-300 motion-reduce:transition-none",
                  step < 1 && "opacity-0",
                )}
              >
                <p className="text-[#d4c7df]">Autumn collection · Save 20%</p>
                <p className="mt-1 text-[9px] text-[#a99ab4]">
                  Server tool · your application data
                </p>
              </div>
            </ChatToolCard>
            <ChatToolCard
              label="updateEditorBlock"
              done={step >= 2}
              status={<ToolSpinner running={running && step >= 1} />}
            >
              <div
                className={cn(
                  "px-3 pb-3 text-[11px] leading-5 transition-opacity duration-300 motion-reduce:transition-none",
                  step < 2 && "opacity-0",
                )}
              >
                <p className="text-[#d4c7df]">
                  Banner updated with your campaign.
                </p>
                <p className="mt-1 text-[9px] text-[#a99ab4]">
                  Client tool · your editor action
                </p>
              </div>
            </ChatToolCard>
            <div
              className={cn(
                "text-[11px] leading-5 text-[#d1c1dc] transition-opacity duration-300 motion-reduce:transition-none",
                step < 2 && "opacity-0",
              )}
            >
              <ChatMessage>
                The offer is in place. You can keep refining it visually.
              </ChatMessage>
            </div>
            <p className="mt-auto text-[9px] text-[#a99ab4]">
              Custom functions connected through your AI backend.
            </p>
          </div>
        </>
      )}
    </AiIllustration>
  );
}

const backendNodes = [
  {
    title: "Studio editor",
    detail: "Messages and project context",
    icon: Sparkles,
  },
  {
    title: "Your backend",
    detail: "Authentication, tools, and instructions",
    icon: Server,
  },
  {
    title: "Your model provider",
    detail: "The models your team chooses",
    icon: Bot,
  },
];

export function AiBackendIllustration() {
  return (
    <AiIllustration
      label="Route editor requests through your own AI backend"
      steps={[
        "Editor context",
        "Your endpoint",
        "Your provider",
        "Stream to the editor",
      ]}
    >
      {({ step }) => (
        <>
          <PanelHeader title="Your AI endpoint" caption="POST /api/ai/chat" />
          <div className="flex min-h-0 flex-1 flex-col gap-3 p-4 sm:p-5">
            <div className="rounded-lg border border-[color:var(--editor-border)] bg-[#17121e] p-3 font-mono text-[10px] leading-5 text-[#c8b7d4]">
              <span className="text-[#c5a8ec]">createStreamResponse</span>({"{"}
              <br />
              <span className="pl-3">messages, projectContext,</span>
              <br />
              <span className="pl-3">model, tools, systemPrompt</span>
              <br />
              {"}"});
            </div>
            <div className="grid gap-1">
              {backendNodes.map(({ title, detail, icon: Icon }, index) => (
                <Fragment key={title}>
                  {index > 0 && (
                    <ArrowDown size={12} className="mx-auto text-[#9d79c4]" />
                  )}
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-lg border px-3 py-2 transition-colors duration-300 motion-reduce:transition-none",
                      (step === 3 ? index === 0 : index === step)
                        ? "border-[#a88af2]/60 bg-[#8b5cf6]/10"
                        : "border-[color:var(--editor-border)] bg-[color:var(--editor-raised)]",
                    )}
                  >
                    <Icon size={16} className="text-[#c5a8ec]" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-[#e6dcec]">
                        {title}
                      </p>
                      <p className="mt-0.5 text-[9px] text-[#a99ab4]">
                        {detail}
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <p className="mt-auto flex items-center gap-2 text-[10px] text-[#c5a8ec]">
              <Check size={12} />
              {step === 3
                ? "Stream results back into the editor."
                : "Your providers. Your tools. Your response flow."}
            </p>
          </div>
        </>
      )}
    </AiIllustration>
  );
}
