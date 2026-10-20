"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUp,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Database,
  File,
  FileJson,
  FileText,
  Globe,
  Image,
  Layers,
  Mail,
  Monitor,
  MoreHorizontal,
  MousePointer2,
  Palette,
  Pause,
  Play,
  Plus,
  Server,
  Sparkles,
  Square,
  Undo2,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  usePageInView,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { theme } from "./theme";

type DemoState = { step: number; reduced: boolean; running: boolean };

/** Only the visible illustrations run. Manual steps remain available with reduced motion. */
function Illustration({
  label,
  steps,
  children,
  className,
}: {
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
        "overflow-hidden rounded-xl",
        theme.illustrations.shell,
        className,
      )}
    >
      <div role="img" aria-label={label}>
        <div aria-hidden>{children({ step, reduced, running })}</div>
      </div>
      <div
        className={cn(
          "flex min-h-11 items-center gap-2 px-3 py-2",
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
    </div>
  );
}

function WindowBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-white/[0.07] px-4">
      <div className="flex gap-1">
        <i className="h-1.5 w-1.5 rounded-full bg-[#795c83]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#5d4968]" />
        <i className="h-1.5 w-1.5 rounded-full bg-[#493951]" />
      </div>
      <span className="text-[10px] text-[#a391ad]">{children}</span>
      <MoreHorizontal size={13} className="ml-auto text-[#7c6889]" />
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
        light ? "bg-[#d4c8df]" : "bg-[#5e496c]/50",
      )}
      style={{ width }}
    />
  );
}

function MiniLanding({
  selected = false,
  className,
  accent = "#9866be",
}: {
  selected?: boolean;
  className?: string;
  accent?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-[#faf7fc] p-[8%] text-[#382342]",
        className,
      )}
    >
      <div className="mb-[12%] flex items-center justify-between">
        <span className="text-[9px] font-bold tracking-tight">
          lumio<span style={{ color: accent }}>.</span>
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
        className="inline-flex items-center gap-3 rounded px-3 py-1.5 text-[7px] font-semibold text-white"
        style={{ background: accent }}
      >
        Start creating <ArrowRight size={8} />
      </div>
      <div className="mt-[12%] grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded bg-[#ece2f2] p-2">
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
      <WindowBar>Editor.tsx</WindowBar>
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
      <div className="flex items-center gap-1.5 px-4 pb-4 text-[10px] text-[#877294]">
        <Braces size={12} /> React layout components
      </div>
    </div>
  );
}

function LayoutPreview({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col border-t border-white/[0.07] bg-[#262031] md:border-l md:border-t-0">
      <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/[0.07] px-3 text-[10px] text-[#a391ad]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ad85c7]" />
        Editor preview
        <span className="ml-auto flex items-center gap-1 text-[8px]">
          <Check size={10} /> Updated
        </span>
      </div>
      <motion.div
        animate={{ backgroundColor: step === 2 ? "#382345" : "#2d2638" }}
        transition={{ duration: reduced ? 0 : 0.4 }}
        className="flex h-10 shrink-0 items-center gap-2 border-b border-white/10 px-3 text-[#cbb6d8]"
      >
        {step === 2 ? (
          <>
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#b987d2] text-[10px] font-bold text-[#36213f]">
              L
            </span>
            <span className="text-[10px] font-semibold">Lumio Studio</span>
            <span className="ml-auto rounded bg-[#b987d2] px-2 py-1 text-[8px] font-semibold text-[#312039]">
              Publish
            </span>
          </>
        ) : (
          <>
            <Plus size={13} />
            <Undo2 size={12} />
            <span className="mx-auto flex items-center gap-1 text-[9px]">
              <Monitor size={11} /> Desktop <ChevronDown size={9} />
            </span>
            <Code2 size={13} />
          </>
        )}
      </motion.div>
      <div className="flex min-h-0 flex-1">
        <AnimatePresence initial={false}>
          {step > 0 && (
            <motion.div
              key="sidebar"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "28%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              className="overflow-hidden border-r border-white/10 bg-[#211a2b]"
            >
              <div className="min-w-[86px] p-3 text-[9px] text-[#c4adce]">
                {step === 2 ? (
                  <>
                    <span className="mb-4 flex items-center gap-1.5 font-semibold">
                      <Palette size={11} /> Your brand
                    </span>
                    <span className="text-[8px] text-[#8d779a]">
                      Brand colors
                    </span>
                    <div className="mb-5 mt-2 flex gap-1">
                      {["#ba8dd3", "#694187", "#eee3f4"].map((c) => (
                        <div
                          key={c}
                          className="h-4 w-4 rounded"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                    <span className="text-[8px] text-[#8d779a]">
                      Typography
                    </span>
                    <div className="mt-2 rounded border border-white/10 p-2">
                      Aa <span className="text-[8px]">Manrope</span>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="mb-4 block font-semibold">Pages</span>
                    {["Home", "About", "Contact"].map((p, i) => (
                      <div
                        key={p}
                        className={cn(
                          "mb-2 flex items-center gap-1.5 rounded p-1.5",
                          !i && "bg-[#a46db8]/20 text-[#d8b3e9]",
                        )}
                      >
                        <File size={9} />
                        {p}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div layout={!reduced} className="min-w-0 flex-1 p-4">
          <MiniLanding className="mx-auto h-full max-w-[300px]" />
        </motion.div>
      </div>
    </div>
  );
}

export function EditorCompositionIllustration() {
  return (
    <Illustration label="Compose your editor UI" steps={layoutSteps}>
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

const AI_PROMPT =
  "Create a launch section using our brand colors and latest product details.";

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
    <div className="flex h-[390px] flex-col p-4 [container-type:inline-size] sm:h-[350px] sm:p-5">
      <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-[#d2bbde]">
        <Sparkles size={14} className="text-[#c08adc]" /> Lumio assistant{" "}
        <span className="ml-auto text-[8px] font-normal text-[#8f799b]">
          Your tools. Your context.
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        <AnimatePresence initial={false}>
          {step > 0 && (
            <motion.div
              key="conversation"
              className="absolute inset-0"
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.25 }}
            >
              <div className="ml-7 rounded-xl rounded-tr-sm border border-[#ba7cd5]/20 bg-[#74428b]/30 p-3 text-[11px] leading-relaxed text-[#e0cce9]">
                {AI_PROMPT}
              </div>
              <div className="ml-2 mt-3 flex items-start gap-2">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#a768bd]/20 text-[#c998dc]">
                  <Sparkles size={11} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 text-[10px] text-[#a795b4]">
                    I’ll use your brand and product information.
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-[#a66fc3]/20 bg-[#2b2035] px-2.5 py-2 text-[10px] text-[#bfa3d0]">
                    <Braces size={11} />
                    <code>get_brand_context</code>
                    <Check size={12} className="ml-auto text-[#a8c5b0]" />
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[8px] text-[#8e7a9a]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#a87cc7]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#e0caef]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#47255d]" />
                    <span>Brand palette & product data loaded</span>
                  </div>
                  <AnimatePresence initial={false}>
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduced ? 0 : 0.25 }}
                        className="mt-3 flex items-center gap-3 rounded-lg bg-[#f3ebf8] px-3 py-2.5 text-[#4c2a5d]"
                      >
                        <span className="text-[16px] font-semibold leading-tight tracking-tight">
                          Meet your next
                          <br />
                          bright idea.
                        </span>
                        <span className="ml-auto rounded bg-[#8e5ab0] px-2 py-1.5 text-[7px] text-white">
                          Explore Lumio
                        </span>
                        <MousePointer2 size={14} className="-mb-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {step === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-[#5d466a]">
            <div className="rounded-2xl border border-[#9564ad]/15 bg-[#9564ad]/5 p-4">
              <Sparkles size={27} strokeWidth={1} />
            </div>
            <span className="text-[10px] text-[#8d749b]">
              What will your users create next?
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-[10px] text-[#796785]">
        <span
          className={cn(
            "min-w-0 flex-1 leading-relaxed",
            step === 0 && "text-[#c2a9d1]",
          )}
          data-ai-draft
        >
          {step === 0 ? draft : "Ask for a change…"}
          {step === 0 && (
            <span className="ml-0.5 inline-block h-2.5 w-px bg-[#bc8ad6]" />
          )}
        </span>
        <ArrowUp
          size={17}
          className="shrink-0 rounded-full bg-[#754990] p-0.5 text-[#e4c7f1]"
        />
      </div>
    </div>
  );
}

export function AiWorkflowIllustration() {
  return (
    <Illustration label="AI connected to your product" steps={aiSteps}>
      {(state) => <AiWorkflowFrame {...state} />}
    </Illustration>
  );
}

const themes = [
  {
    name: "Lumio",
    label: "A soft, branded workspace",
    bg: "#30213f",
    surface: "#3c2b4c",
    text: "#dfc9ed",
    muted: "#846a96",
    accent: "#be94df",
    paper: "#f5edf9",
    brand: "#8e5aaf",
  },
  {
    name: "Forma",
    label: "A clean, light interface",
    bg: "#eeedf4",
    surface: "#ffffff",
    text: "#434052",
    muted: "#b2adbf",
    accent: "#7960bc",
    paper: "#ffffff",
    brand: "#7960bc",
  },
  {
    name: "Orbit",
    label: "A focused, dark workspace",
    bg: "#202231",
    surface: "#2d3043",
    text: "#d2d5e8",
    muted: "#666c88",
    accent: "#a6aff8",
    paper: "#f2f2fa",
    brand: "#666fb6",
  },
];

export function ThemeIllustration() {
  return (
    <Illustration
      label="Theme the editor to your brand"
      steps={themes.map((theme) => theme.label)}
    >
      {({ step, reduced }) => {
        const theme = themes[step];
        return (
          <div className="flex h-[390px] flex-col justify-center p-4 [container-type:inline-size] sm:h-[350px] sm:p-5">
            <motion.div
              animate={{ backgroundColor: theme.bg, color: theme.text }}
              transition={{ duration: reduced ? 0 : 0.5 }}
              className="overflow-hidden rounded-lg border border-white/10 shadow-xl"
            >
              <motion.div
                animate={{ backgroundColor: theme.surface }}
                transition={{ duration: reduced ? 0 : 0.5 }}
                className="flex h-9 items-center gap-2 border-b border-current/10 px-3 text-[10px]"
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-bold"
                  style={{ background: theme.accent, color: theme.bg }}
                >
                  {theme.name[0]}
                </span>
                <span className="font-semibold">{theme.name} Studio</span>
                <span
                  className="ml-auto rounded px-2 py-1 text-[7px] font-semibold"
                  style={{ background: theme.accent, color: theme.bg }}
                >
                  Publish
                </span>
              </motion.div>
              <div className="flex h-[173px]">
                <div className="flex w-9 shrink-0 flex-col items-center gap-4 border-r border-current/10 pt-3">
                  <Plus size={12} />
                  <Layers size={12} />
                  <Palette size={12} style={{ color: theme.accent }} />
                  <Image size={12} />
                </div>
                <div className="flex-1 p-3">
                  <div
                    className="h-full rounded p-4"
                    style={{ background: theme.paper }}
                  >
                    <div
                      className="mb-3 text-[7px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: theme.brand }}
                    >
                      Made for your brand
                    </div>
                    <div
                      className="text-[clamp(15px,4.5cqw,22px)] font-semibold leading-tight tracking-tight"
                      style={{ color: theme.brand }}
                    >
                      A familiar place
                      <br />
                      to create.
                    </div>
                    <div className="mt-3 w-[75%] space-y-1.5">
                      <Line light />
                      <Line width="65%" light />
                    </div>
                  </div>
                </div>
                <div className="w-[24%] border-l border-current/10 p-2 text-[7px]">
                  <span className="font-semibold">Styles</span>
                  <div className="mt-4 space-y-4">
                    {["Layout", "Typography", "Background"].map((label) => (
                      <div
                        key={label}
                        className="flex items-center justify-between gap-1"
                      >
                        {label}
                        <ChevronDown size={7} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[theme.bg, theme.surface, theme.accent, theme.paper].map(
                (color, i) => (
                  <motion.div
                    key={i}
                    animate={{ backgroundColor: color }}
                    transition={{ duration: reduced ? 0 : 0.5 }}
                    className="h-5 w-5 rounded-full border border-white/15"
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

export function ProjectTypesIllustration() {
  return (
    <Illustration
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
                    <div className="mx-auto h-full w-[90%] overflow-hidden rounded-sm bg-[#faf7fc] text-center">
                      <div className="bg-[#633c7c] py-2 text-[7px] font-semibold tracking-widest text-[#edddf7]">
                        THE LUMIO LETTER
                      </div>
                      <div className="p-3">
                        <div className="mx-auto mb-2 h-9 w-9 rounded-full bg-[#e2d0ee] sm:mb-4 sm:h-14 sm:w-14">
                          <Sparkles className="h-full w-full p-2.5 text-[#9e74b9] sm:p-4" />
                        </div>
                        <div className="mb-3 text-[9px] font-semibold leading-tight text-[#4d2e5d] sm:text-[13px]">
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
                    <div className="mx-auto h-full w-[83%] rounded-sm bg-[#faf7fc] p-3 sm:p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="h-3 w-3 rounded bg-[#9566ad]" />
                        <span className="text-[5px] text-[#917b9e] sm:text-[7px]">
                          LUMIO / 2026
                        </span>
                      </div>
                      <div className="mb-2 text-[9px] font-semibold text-[#4d2e5d] sm:text-[14px]">
                        A brighter
                        <br />
                        way forward.
                      </div>
                      <div className="space-y-1.5">
                        <Line light />
                        <Line light />
                        <Line width="60%" light />
                      </div>
                      <div className="mt-3 rounded bg-[#ede3f3] p-2">
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

export function StorageIllustration() {
  return (
    <Illustration
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
