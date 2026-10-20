"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  ArrowRight,
  Braces,
  Check,
  Database,
  FileJson,
  FileText,
  Globe,
  Image,
  Mail,
  LoaderCircle,
  Palette,
  Pause,
  Play,
  Server,
  Sparkles,
  Square,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";
import { theme } from "./theme";
import {
  CanvasToolbar,
  ChatPanelHeader,
  ChatBrandDetails,
  ChatComposer,
  ChatMessage,
  ChatToolCard,
  EditorSidebar,
  PagesPanel,
  PropertyField,
  StylesPanel,
  editorShellText,
  editorShellTheme,
} from "../layouts/EditorShell";

export type IllustrationProps = { withControls?: boolean };

type DemoState = { step: number; reduced: boolean; running: boolean };

/** Only the visible illustrations run. Manual steps remain available with reduced motion. */
function Illustration({
  label,
  steps,
  children,
  className,
  withControls = false,
}: IllustrationProps & {
  label: string;
  steps: string[];
  children: (state: DemoState) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.3 });
  const pageVisible = usePageInView();
  const reduced = !!useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(0);
  const running = visible && pageVisible && !paused && !reduced;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(
      () => setStep((value) => (value + 1) % steps.length),
      3800,
    );
    return () => window.clearTimeout(timer);
  }, [running, step, steps.length]);

  return (
    <div
      ref={ref}
      data-sdk-illustration={label}
      data-step={step}
      data-running={running}
      className={cn(
        "overflow-hidden rounded-lg pointer-events-none select-none",
        theme.illustrations.shell,
        className,
      )}
    >
      <div role="img" aria-label={label}>
        <div aria-hidden>{children({ step, reduced, running })}</div>
      </div>
      {withControls && (
        <div
          className={cn(
            "pointer-events-auto flex min-h-11 items-center gap-2 px-3 py-2",
            theme.illustrations.controls,
          )}
        >
          <div className="flex shrink-0 gap-1">
            {steps.map((name, index) => (
              <button
                key={name}
                type="button"
                aria-label={`${label}: ${name}`}
                aria-pressed={step === index}
                onClick={() => {
                  setStep(index);
                  setPaused(true);
                }}
                className="flex h-7 w-6 items-center justify-center rounded-md hover:bg-white/5"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === step ? "w-4 bg-[#c28bda]" : "w-1.5 bg-[#5d4c69]",
                  )}
                />
              </button>
            ))}
          </div>
          <span className="min-w-0 flex-1 text-[10px] font-medium leading-snug text-[#a99ab4] sm:text-[11px]">
            {steps[step]}
          </span>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              aria-label={`${paused ? "Play" : "Pause"} ${label.toLowerCase()}`}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[#b9aac4] transition-colors hover:bg-white/10 hover:text-white"
            >
              {paused ? (
                <Play size={12} aria-hidden />
              ) : (
                <Pause size={12} aria-hidden />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Line({
  width = "100%",
  light = false,
}: {
  width?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "h-1.5 rounded-full",
        light ? "bg-[#715c80]/60" : "bg-[#5e496c]/50",
      )}
      style={{ width }}
    />
  );
}

function MiniLanding({
  selected = false,
  className,
  accent = "#c49cde",
}: {
  selected?: boolean;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-[#17121e] p-[8%] text-[#f3eaf8]",
        className,
      )}
    >
      <div className="mb-[12%] flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-tight">
          YourBrand<span style={{ color: accent }}>.</span>
        </span>
        <div className="flex w-[42%] gap-2">
          <Line light />
          <Line light />
          <Line light />
        </div>
      </div>
      <div
        className="mb-[5%] text-[7px] font-semibold uppercase tracking-[0.15em]"
        style={{ color: accent }}
      >
        A little more possibility
      </div>
      <div
        className={cn(
          "relative mb-[6%] text-[clamp(15px,2.4cqw,27px)] font-semibold leading-[1.1] tracking-tight",
          selected && "outline outline-1 outline-[#a26bc7] outline-offset-4",
        )}
      >
        Make room
        <br />
        for bright ideas.
        {selected && (
          <span className="absolute -left-1 -top-[17px] flex items-center gap-1 rounded-t bg-[#9763b9] px-1.5 py-0.5 text-[7px] font-normal tracking-normal text-white">
            <TypeIcon />
            Heading
          </span>
        )}
      </div>
      <div className="mb-[8%] space-y-1">
        <Line width="90%" light />
        <Line width="70%" light />
      </div>
      <div
        className="inline-flex items-center gap-3 rounded px-3 py-1.5 text-[7px] font-semibold text-[#211629]"
        style={{ background: accent }}
      >
        Start creating <ArrowRight size={8} />
      </div>
      <div className="mt-[12%] grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-[#2a1e35] p-2">
            <div
              className="mb-2 h-3 w-3 rounded-sm"
              style={{ background: accent, opacity: 0.5 }}
            />
            <Line width="85%" light />
            <div className="mt-1">
              <Line width="60%" light />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeIcon() {
  return <span className="font-serif font-bold">T</span>;
}

const layoutSteps = [
  "Start with the built-in layout",
  "Add a sidebar with React",
  "Bring your own UI components",
];

function LayoutCode({ step, reduced }: { step: number; reduced: boolean }) {
  const lines = [
    { text: "<StudioEditor withComponents>", indent: 0 },
    {
      text: step === 2 ? "<YourToolbar />" : "<StudioSidebarTop />",
      indent: 1,
      changed: step === 2,
    },
    { text: '<div className="flex flex-1">', indent: 1 },
    ...(step > 0
      ? [
          { text: "<StudioSidebarLeft>", indent: 2, changed: true },
          {
            text: step === 2 ? "<YourBrandPanel />" : "<StudioPanelPages />",
            indent: 3,
            changed: true,
          },
          { text: "</StudioSidebarLeft>", indent: 2, changed: true },
        ]
      : []),
    { text: '<StudioCanvas className="flex-1" />', indent: 2 },
    { text: "</div>", indent: 1 },
    { text: "</StudioEditor>", indent: 0 },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 py-6 font-mono text-[clamp(8px,1.08cqw,12px)] leading-[2.25] text-[#bca8cc]">
        <AnimatePresence initial={false} mode="popLayout">
          {lines.map(({ text, indent, changed }) => (
            <motion.div
              layout={!reduced}
              key={text}
              initial={{ opacity: 0, x: reduced ? 0 : -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
              className={cn(
                "flex whitespace-pre px-2 sm:px-3",
                changed && "bg-[#ad6ec3]/10 text-[#e1b9f4]",
              )}
            >
              <span className="mr-3 w-3 shrink-0 select-none text-right text-[#5e4c6c]">
                {lines.findIndex((line) => line.text === text) + 1}
              </span>
              <code style={{ paddingLeft: `${indent * 0.85}em` }}>{text}</code>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LayoutPreview({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-[280px] min-w-0 flex-col overflow-hidden border-t border-[color:var(--editor-border)] bg-[color:var(--editor-canvas)] [--editor-unit:9px] md:border-l md:border-t-0",
        editorShellTheme,
        editorShellText,
      )}
    >
      {step === 2 ? (
        <div className="flex h-[30px] shrink-0 items-center gap-2 border-b border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] px-2.5 text-[9px] text-[color:var(--editor-text)]">
          <span className="flex size-4 items-center justify-center rounded-sm bg-[#b494f4] text-[9px] font-semibold text-[#261b35]">
            Y
          </span>
          <span className="font-semibold">YourBrand</span>
          <span className="ml-auto rounded-sm bg-[#8b5cf6] px-2 py-1 text-[8px] text-white">
            Publish
          </span>
        </div>
      ) : (
        <CanvasToolbar />
      )}
      <div className="flex min-h-0 flex-1">
        <AnimatePresence initial={false}>
          {step > 0 && (
            <motion.div
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "28%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="overflow-hidden bg-[color:var(--editor-bg)]"
            >
              {step === 2 ? (
                <div className="h-full min-w-[88px] space-y-3 border-r border-[color:var(--editor-border)] p-2 text-[8px]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Palette size={10} /> Your brand
                  </div>
                  <div>
                    <div className="mb-2">Brand colors</div>
                    <div className="flex gap-1">
                      {["#c49cde", "#8b5cf6", "#17121e"].map((color) => (
                        <span
                          key={color}
                          className="size-3.5 rounded-sm border border-white/10"
                          style={{ background: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <PropertyField label="Typeface">Manrope</PropertyField>
                  <PropertyField label="Radius">8 px</PropertyField>
                </div>
              ) : (
                <PagesPanel withLayers={false} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout={!reduced} className="min-w-0 flex-1 p-3">
          <MiniLanding className="mx-auto h-full max-w-[320px]" />
        </motion.div>
      </div>
    </div>
  );
}

export function EditorCompositionIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      withControls={withControls}
      label="Compose your editor UI"
      steps={layoutSteps}
    >
      {({ step, reduced }) => (
        <div className="grid [container-type:inline-size] md:h-[340px] md:grid-cols-[1fr_1.1fr]">
          <LayoutCode step={step} reduced={reduced} />
          <LayoutPreview step={step} reduced={reduced} />
        </div>
      )}
    </Illustration>
  );
}

const aiSteps = [
  "A request with your product context",
  "Your tool connects the brand data",
  "AI edits. Users stay in control.",
];

const AI_PROMPT = "Create a landing page using our brand design system.";

function AiWorkflowFrame({ step, reduced, running }: DemoState) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (step !== 0 || !running) return;
    setTyped(0);
    const timer = window.setInterval(() => {
      setTyped((value) => Math.min(value + 1, AI_PROMPT.length));
    }, 34);
    return () => window.clearInterval(timer);
  }, [step, running]);

  const draft = running ? AI_PROMPT.slice(0, typed) : AI_PROMPT;

  return (
    <div
      className={cn(
        editorShellTheme,
        editorShellText,
        theme.illustrations.chatSurfaces,
        "flex h-[460px] flex-col text-[calc(0.72*var(--editor-unit))] leading-[1.45] [--editor-unit:18px] sm:h-[420px]",
      )}
    >
      <ChatPanelHeader />
      <div className="relative min-h-0 flex-1 overflow-hidden p-[calc(0.5*var(--editor-unit))]">
        <AnimatePresence initial={false}>
          {step > 0 && (
            <motion.div
              key="conversation"
              className="absolute inset-[calc(0.5*var(--editor-unit))] space-y-[calc(0.65*var(--editor-unit))]"
              initial={{ opacity: 0, y: reduced ? 0 : 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              <ChatMessage user>{AI_PROMPT}</ChatMessage>
              <ChatMessage>
                I’ll fetch your brand guidelines, then build a page to match.
              </ChatMessage>
              <ChatToolCard
                label="Fetch brand design system"
                done={step === 2 || reduced}
                status={
                  <LoaderCircle
                    className="size-[calc(0.75*var(--editor-unit))] animate-[spin_0.5s_linear_infinite] text-[#b597fa]"
                    style={{
                      animationPlayState: running ? "running" : "paused",
                    }}
                  />
                }
              >
                <ChatBrandDetails />
              </ChatToolCard>
              {step === 2 && (
                <>
                  <ChatToolCard label="Create landing page" done />
                  <ChatMessage>
                    Your page is ready. Let’s make it yours.
                  </ChatMessage>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <ChatComposer
        draft={step === 0 ? draft : ""}
        caret={
          <span className="ml-[calc(0.08*var(--editor-unit))] inline-block h-[calc(0.75*var(--editor-unit))] w-px bg-[#c9b4f2] align-[-1px]" />
        }
      />
    </div>
  );
}

export function AiWorkflowIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      withControls={withControls}
      label="AI connected to your product"
      steps={aiSteps}
    >
      {(state) => <AiWorkflowFrame {...state} />}
    </Illustration>
  );
}

const themes = [
  {
    label: "Your colors, on a dark interface",
    bg: "#201e2a",
    raised: "#2b2739",
    border: "#494251",
    text: "#a7a4b3",
    accent: "#c49cde",
  },
  {
    label: "The same editor, in a light theme",
    bg: "#f5f4f8",
    raised: "#eae7f0",
    border: "#d4d0dc",
    text: "#655c71",
    accent: "#bba6ed",
  },
  {
    label: "A different palette, still your product",
    bg: "#202635",
    raised: "#2c3446",
    border: "#414c62",
    text: "#a3b1c8",
    accent: "#a6b6f6",
  },
];

export function ThemeIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      withControls={withControls}
      label="Theme the editor to your brand"
      steps={themes.map((item) => item.label)}
    >
      {({ step, reduced }) => {
        const palette = themes[step];
        return (
          <div className="flex h-[390px] flex-col justify-center p-4 sm:h-[350px] sm:p-5">
            <div
              className={cn(
                "overflow-hidden rounded-md border border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] [--editor-unit:7px]",
                editorShellText,
              )}
              style={
                {
                  "--editor-bg": palette.bg,
                  "--editor-raised": palette.raised,
                  "--editor-border": palette.border,
                  "--editor-text": palette.text,
                } as CSSProperties
              }
            >
              <div className="flex h-7 items-center gap-2 border-b border-[color:var(--editor-border)] px-2 text-[8px]">
                <span
                  className="flex size-3.5 items-center justify-center rounded-sm font-semibold text-[#25182e]"
                  style={{ background: palette.accent }}
                >
                  Y
                </span>
                <span className="font-semibold">YourBrand</span>
                <span
                  className="ml-auto rounded-sm px-2 py-1 text-[7px] font-medium text-[#25182e]"
                  style={{ background: palette.accent }}
                >
                  Publish
                </span>
              </div>
              <div className="grid h-[215px] grid-cols-[22px_minmax(0,1fr)_27%] overflow-hidden">
                <EditorSidebar activeIndex={2} />
                <div className="flex min-w-0 flex-col overflow-hidden bg-[color:var(--editor-raised)]">
                  <CanvasToolbar />
                  <div className="min-h-0 flex-1 p-2">
                    <div className="flex h-full flex-col justify-center overflow-hidden rounded-sm bg-[#17121e] p-[10%] text-[#f3eaf8]">
                      <div
                        className="mb-3 text-[7px] font-semibold"
                        style={{ color: palette.accent }}
                      >
                        YourBrand
                      </div>
                      <div className="text-[clamp(14px,2vw,21px)] font-semibold leading-tight tracking-tight">
                        A familiar place
                        <br />
                        to create.
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <Line light />
                        <Line width="65%" light />
                      </div>
                      <div
                        className="mt-4 h-4 w-1/2 shrink-0 rounded-sm"
                        style={{ background: palette.accent }}
                      />
                    </div>
                  </div>
                </div>
                <StylesPanel brand compact selected color="#f3eaf8" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[palette.bg, palette.raised, palette.accent, palette.border].map(
                (color, index) => (
                  <motion.div
                    key={index}
                    animate={{ backgroundColor: color }}
                    transition={{ duration: reduced ? 0 : 0.5 }}
                    className="size-5 rounded-full border border-white/15"
                  />
                ),
              )}
              <span className="ml-1 font-mono text-[9px] text-[#9d87ab]">
                customTheme
              </span>
            </div>
          </div>
        );
      }}
    </Illustration>
  );
}

const formats = [
  {
    name: "Landing page",
    icon: Globe,
    extension: "HTML / CSS / JS",
    type: "web",
  },
  { name: "Newsletter", icon: Mail, extension: "MJML → HTML", type: "email" },
  {
    name: "Document",
    icon: FileText,
    extension: "Custom exports",
    type: "document",
  },
];

export function ProjectTypesIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      withControls={withControls}
      label="One SDK for every content format"
      steps={["Web projects", "Email projects", "Document projects"]}
    >
      {({ step, reduced }) => (
        <div className="px-4 py-5 [container-type:inline-size] sm:px-7 sm:py-6">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="flex items-center gap-2 rounded-lg border border-[#bc87d6]/25 bg-[#34213f] px-3 py-2 text-[10px] font-semibold text-[#dbb7ed]">
              <FileJson size={14} /> Project JSON
            </span>
            <span className="h-px w-8 bg-[#664473]" />
            <span className="text-[10px] text-[#947ca2]">
              Your content, structured.
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-5">
            {formats.map(({ name, icon: Icon, extension, type }, index) => (
              <motion.div
                key={name}
                animate={{
                  opacity: step === index ? 1 : 0.55,
                  y: step === index && !reduced ? -4 : 0,
                  borderColor: step === index ? "#a774c1" : "#423149",
                }}
                transition={{ duration: reduced ? 0 : 0.4 }}
                className={cn(
                  "min-w-0 overflow-hidden rounded-lg border bg-[#21172a]",
                  step !== index && "hidden sm:block",
                )}
              >
                <div className="flex items-center gap-1.5 border-b border-white/[0.07] px-2 py-2 text-[8px] text-[#d1bada] sm:px-3 sm:text-[10px]">
                  <Icon className="h-3 w-3 shrink-0" />
                  {name}
                </div>
                <div className="h-[210px] overflow-hidden p-4">
                  {type === "web" ? (
                    <MiniLanding className="h-full" />
                  ) : type === "email" ? (
                    <div className="mx-auto h-full w-[90%] overflow-hidden rounded-sm bg-[#17121e] text-center">
                      <div className="bg-[#633c7c] py-2 text-[7px] font-semibold tracking-widest text-[#edddf7]">
                        YOURBRAND / NEWSLETTER
                      </div>
                      <div className="p-3">
                        <div className="mx-auto mb-2 h-9 w-9 rounded-full bg-[#3b254b] sm:mb-4 sm:h-14 sm:w-14">
                          <Sparkles className="h-full w-full p-2.5 text-[#9e74b9] sm:p-4" />
                        </div>
                        <div className="mb-3 text-[9px] font-semibold leading-tight text-[#eee1f7] sm:text-[13px]">
                          Good ideas.
                          <br />
                          Right in your inbox.
                        </div>
                        <Line light />
                        <div className="mx-auto mt-1 w-2/3">
                          <Line light />
                        </div>
                        <div className="mx-auto mt-3 h-3 w-1/2 rounded-sm bg-[#9464b0] sm:h-5" />
                      </div>
                    </div>
                  ) : (
                    <div className="mx-auto h-full w-[83%] rounded-sm bg-[#17121e] p-3 sm:p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-3 w-3 rounded bg-[#9566ad]" />
                        <span className="text-[5px] text-[#917b9e] sm:text-[7px]">
                          YourBrand / 2026
                        </span>
                      </div>
                      <div className="mb-2 text-[9px] font-semibold text-[#eee1f7] sm:text-[14px]">
                        A brighter
                        <br />
                        way forward.
                      </div>
                      <div className="space-y-1.5">
                        <Line light />
                        <Line light />
                        <Line width="60%" light />
                      </div>
                      <div className="mt-3 rounded bg-[#2b1e36] p-2">
                        <div className="space-y-1.5">
                          <Line light />
                          <Line width="80%" light />
                        </div>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <Line light />
                        <Line width="70%" light />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center gap-1 border-t border-white/[0.07] px-1 py-2 font-mono text-[6px] text-[#b491c5] sm:gap-2 sm:text-[9px]">
                  <ArrowDownToLine className="h-2.5 w-2.5 shrink-0" />
                  {extension}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Illustration>
  );
}

const storageSteps = [
  "Load an editable project",
  "Save through your own backend",
  "Publish to your own destination",
];

export function StorageIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      withControls={withControls}
      label="Keep your content on your infrastructure"
      steps={storageSteps}
    >
      {({ step, reduced, running }) => (
        <div className="flex h-[300px] flex-col justify-center px-3 py-6 sm:h-[280px] sm:px-7">
          <div className="mb-5 flex items-center gap-2 text-[9px] text-[#947b9e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b08bc6]" /> YOUR
            APPLICATION
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-[90px] w-[30%] flex-col items-center justify-center gap-2 rounded-xl border border-[#bc87d6]/30 bg-[#35233f]">
              <Square size={21} strokeWidth={1.3} className="text-[#cfa5e4]" />
              <span className="text-[10px] font-medium text-[#d5bce1]">
                Studio SDK
              </span>
              <span className="font-mono text-[8px] text-[#8e719e]">
                project.json
              </span>
            </div>
            <div className="relative flex min-w-3 flex-1 flex-col items-center">
              <span className="absolute -top-5 text-[8px] text-[#ab85bf]">
                {step === 0 ? "load" : step === 1 ? "save" : "export"}
              </span>
              <div className="h-px w-full bg-[#674675]" />
              <motion.span
                key={step}
                initial={{ left: step === 0 ? "85%" : "0%", opacity: 0 }}
                animate={{
                  left: running ? (step === 0 ? "0%" : "85%") : "45%",
                  opacity: running ? [0, 1, 1, 0] : 0.7,
                }}
                transition={{
                  duration: reduced || !running ? 0 : 1.6,
                  repeat: running ? 1 : 0,
                  repeatDelay: 0.3,
                }}
                className="absolute -top-0.5 h-1.5 w-1.5 rounded-full bg-[#d6a2ef] shadow-[0_0_10px_#b788d4]"
              />
            </div>
            <div className="w-[54%] rounded-xl border border-dashed border-[#846092]/60 p-2 sm:p-3">
              <div className="mb-3 flex items-center gap-1 text-[8px] font-medium text-[#c4a4d4] sm:text-[9px]">
                <Server size={12} />
                Your infrastructure
              </div>
              <div className="space-y-2">
                {[
                  { icon: Database, label: "Project storage" },
                  { icon: Image, label: "Asset storage" },
                  { icon: Globe, label: "Your publishing" },
                ].map(({ icon: Icon, label }, index) => (
                  <motion.div
                    key={label}
                    animate={{
                      backgroundColor: (step === 2 ? index === 2 : index < 2)
                        ? "#392544"
                        : "#241a2d",
                    }}
                    transition={{ duration: reduced ? 0 : 0.4 }}
                    className="flex items-center gap-2 rounded px-2 py-2 text-[9px] text-[#b89ac9]"
                  >
                    <Icon size={11} />
                    {label}
                    <Check size={10} className="ml-auto text-[#9ec0ac]" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-md border border-white/[0.06] px-3 py-2 font-mono text-[9px] text-[#ac8dbd]">
            <Braces size={12} />
            <span>
              {step === 0
                ? "onLoad: loadFromYourAPI"
                : step === 1
                  ? "onSave: saveToYourAPI"
                  : "HTML / CSS / JS → your hosting"}
            </span>
          </div>
        </div>
      )}
    </Illustration>
  );
}
