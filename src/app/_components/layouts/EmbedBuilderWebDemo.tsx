"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  usePageInView,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import {
  ArrowRight,
  ArrowUp,
  Bold,
  Check,
  ChevronDown,
  CircleCheck,
  Crosshair,
  Ellipsis,
  Italic,
  Link,
  LoaderCircle,
  Mic,
  MousePointer2,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Sparkles,
  TextCursor,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// A single clock keeps chat, page creation, copy changes, and the cursor in sync.
const CUE_TIMES = [
  0, 1.4, 3, 4, 4.6, 5.3, 6, 6.7, 7.4, 8.1, 9.7, 11, 11.7, 12.15,
  12.6, 13.05, 13.6, 15.3, 16.4, 17.2, 17.8, 19, 21, 22.4,
];
const DURATION = 27;

export const demoSteps = {
  fetchBrand: 1,
  brandReady: 2,
  createPage: 3,
  navigation: 4,
  hero: 5,
  proof: 6,
  features: 7,
  footer: 8,
  pageReady: 9,
  companyPrompt: 10,
  updateCopy: 11,
  companyName: 12,
  headline: 13,
  description: 14,
  featureCopy: 15,
  copyReady: 16,
  cursor: 17,
  hover: 18,
  select: 19,
  selected: 20,
  typing: 21,
  typed: 22,
  complete: 23,
} as const;

export function useBuilderDemo(ref: RefObject<HTMLDivElement | null>) {
  const time = useMotionValue(0);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);
  const controls = useRef<AnimationPlaybackControls | null>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { amount: 0.25 });
  const pageInView = usePageInView();

  useMotionValueEvent(time, "change", (value) => {
    let next = 0;
    for (let index = 1; index < CUE_TIMES.length; index++) {
      if (value < CUE_TIMES[index]) break;
      next = index;
    }
    if (next !== stepRef.current) {
      stepRef.current = next;
      setStep(next);
    }
  });

  useEffect(() => {
    if (reducedMotion) {
      time.set(CUE_TIMES[demoSteps.complete]);
      return;
    }
    time.set(0);
    const playback = animate(time, [0, DURATION], {
      duration: DURATION,
      ease: "linear",
      repeat: Infinity,
    });
    playback.pause();
    controls.current = playback;
    return () => {
      playback.stop();
      controls.current = null;
    };
  }, [reducedMotion, time]);

  useEffect(() => {
    if (inView && pageInView && !paused && !reducedMotion) {
      controls.current?.play();
    } else {
      controls.current?.pause();
    }
  }, [inView, pageInView, paused, reducedMotion]);

  return {
    time,
    step: reducedMotion ? demoSteps.complete : step,
    reducedMotion: !!reducedMotion,
    paused,
    togglePaused: () => setPaused((value) => !value),
    replay: () => {
      if (reducedMotion) return;
      if (controls.current) controls.current.time = 0;
      time.set(0);
      setPaused(false);
      if (inView && pageInView) controls.current?.play();
    },
  };
}

type BuilderDemo = ReturnType<typeof useBuilderDemo>;

function Reveal({
  show,
  children,
  className,
  reducedMotion,
  section,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  reducedMotion: boolean;
  section: string;
}) {
  return (
    <motion.div
      data-demo-section={section}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show || reducedMotion ? 0 : 10 }}
      transition={{ duration: reducedMotion ? 0 : 0.45, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ChatEntry({ children, user = false }: { children: ReactNode; user?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        user && "rounded-[0.2cqw] bg-[#8b5cf6] px-[0.45cqw] py-[0.4cqw] text-white",
      )}
    >
      {children}
    </motion.div>
  );
}

function ToolCall({
  label,
  done,
  demo,
  children,
}: {
  label: string;
  done: boolean;
  demo: BuilderDemo;
  children?: ReactNode;
}) {
  const rotate = useTransform(demo.time, (value) => value * 240);
  return (
    <ChatEntry>
      <div className="overflow-hidden rounded-[0.2cqw] bg-[#26272a]">
        <div className="flex h-[1.75cqw] items-center gap-[0.4cqw] px-[0.45cqw]">
          {done ? (
            <Check className="size-[0.75cqw] text-[#b2c8a7]" />
          ) : (
            <motion.span style={{ rotate }} className="flex text-[#b597fa]">
              <LoaderCircle className="size-[0.75cqw]" />
            </motion.span>
          )}
          <span className="flex-1">{label}</span>
          <ChevronDown className="size-[0.7cqw]" />
        </div>
        {done && children}
      </div>
    </ChatEntry>
  );
}

export function DemoConversation({ demo }: { demo: BuilderDemo }) {
  const { step, time, reducedMotion } = demo;
  const opacity = useTransform(time, [0, 0.4, DURATION - 0.7, DURATION], [0, 1, 1, 0]);
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-r-[0.05cqw] border-[#3c3d43] bg-[#18191b] text-[0.72cqw] text-[#a1a6b0]">
      <div className="flex h-[2.1cqw] shrink-0 items-center gap-[0.45cqw] border-b-[0.05cqw] border-[#3c3d43] px-[0.5cqw]">
        <Sparkles className="size-[0.95cqw] fill-current" strokeWidth={1} />
        <span className="flex-1">AI Assistant</span>
        <Trash2 className="size-[0.85cqw]" />
        <X className="ml-[0.35cqw] size-[0.95cqw]" />
      </div>
      <motion.div
        style={{ opacity: reducedMotion ? 1 : opacity }}
        className="min-h-0 flex-1 space-y-[0.65cqw] overflow-hidden px-[0.5cqw] py-[0.5cqw] leading-[1.45]"
      >
        <ChatEntry user>
          Create a landing page following our company’s brand design system.
        </ChatEntry>
        {step >= demoSteps.fetchBrand && (
          <>
            <ChatEntry>I’ll fetch your brand guidelines, then build a page to match.</ChatEntry>
            <ToolCall label="Fetch brand design system" done={step >= demoSteps.brandReady} demo={demo}>
              <div className="flex items-center gap-[0.35cqw] border-t-[0.05cqw] border-white/5 px-[0.45cqw] py-[0.4cqw] text-[0.6cqw]">
                {["#183f35", "#c4f36a", "#f7f5f0"].map((color) => (
                  <span key={color} style={{ backgroundColor: color }} className="size-[0.7cqw] rounded-[0.12cqw] ring-[0.05cqw] ring-white/10" />
                ))}
                <span className="ml-auto">Arial · Rounded</span>
              </div>
            </ToolCall>
          </>
        )}
        {step >= demoSteps.createPage && (
          <ToolCall label="Create landing page" done={step >= demoSteps.pageReady} demo={demo} />
        )}
        {step >= demoSteps.pageReady && <ChatEntry>Your page is ready. Let’s make it yours.</ChatEntry>}
        {step >= demoSteps.companyPrompt && (
          <ChatEntry user>
            Fill it with content for Lumio, a collaborative workspace for creative teams.
          </ChatEntry>
        )}
        {step >= demoSteps.updateCopy && (
          <>
            <ChatEntry>I’ll tailor the copy to Lumio’s product and audience.</ChatEntry>
            <ToolCall label="Update page copy" done={step >= demoSteps.copyReady} demo={demo} />
          </>
        )}
        {step >= demoSteps.copyReady && (
          <ChatEntry>Done. You can edit any text directly on the page.</ChatEntry>
        )}
      </motion.div>
      <div className="shrink-0 border-t-[0.05cqw] border-[#3c3d43] p-[0.5cqw]">
        <div className="flex h-[6.6cqw] flex-col rounded-[0.45cqw] border-[0.05cqw] border-[#3c3d43] p-[0.45cqw]">
          {step >= demoSteps.hover && (
            <div className="flex items-center gap-[0.5cqw]">
              <Crosshair className="size-[0.8cqw]" />
              <span className="flex items-center gap-[0.3cqw] rounded-[0.15cqw] bg-[#3998df] px-[0.35cqw] py-[0.1cqw] text-white">
                <Type className="size-[0.8cqw]" /> Heading <X className="size-[0.7cqw]" />
              </span>
            </div>
          )}
          <span className="mt-[0.4cqw] text-[#777b82]">Ask anything...</span>
          <div className="mt-auto flex items-center gap-[0.85cqw]">
            <Plus className="size-[0.95cqw]" />
            <Mic className="ml-auto size-[0.9cqw]" />
            <span className="flex size-[1.6cqw] items-center justify-center rounded-full bg-[#8b5cf6]/50 text-[#b69ae6]">
              <ArrowUp className="size-[1.05cqw]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn("size-[1.25cqw]", className)}>
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1 19.1 4.9" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}

function CopySwap({ changed, before, after }: { changed: boolean; before: string; after: string }) {
  return (
    <motion.span
      key={changed ? "after" : "before"}
      initial={{ opacity: 0.25 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      {changed ? after : before}
    </motion.span>
  );
}

function EditableHeadline({ demo }: { demo: BuilderDemo }) {
  const { step, time, reducedMotion } = demo;
  const personalized = step >= demoSteps.headline;
  const selected = step >= demoSteps.select && step < demoSteps.typing;
  const editing = step >= demoSteps.typing && step < demoSteps.typed;
  const [typedText, setTypedText] = useState("");
  const replacement = "bright ideas.";
  useMotionValueEvent(time, "change", (value) => {
    if (value < CUE_TIMES[demoSteps.typing] || value >= CUE_TIMES[demoSteps.typed]) return;
    const progress = (value - CUE_TIMES[demoSteps.typing]) / (CUE_TIMES[demoSteps.typed] - CUE_TIMES[demoSteps.typing]);
    const text = replacement.slice(0, Math.floor(progress * (replacement.length + 1)));
    setTypedText((previous) => previous === text ? previous : text);
  });
  const selectionClip = useTransform(time, [17.2, 17.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
  const cursorX = useTransform(time, [15.3, 15.8, 16.4, 17.2, 17.8, 21.5, 22.4], ["28cqw", "18cqw", "0.15cqw", "0.15cqw", "10.8cqw", "11.5cqw", "15cqw"]);
  const cursorY = useTransform(time, [15.3, 15.8, 16.4, 21.5, 22.4], ["17cqw", "10cqw", "1.15cqw", "1.15cqw", "5cqw"]);
  const cursorOpacity = useTransform(time, [0, 15.2, 15.3, 22.6, 23.1, DURATION], [0, 0, 1, 1, 0, 0]);
  const caretOpacity = useTransform(time, (value) => Math.sin(value * 10) > 0 ? 1 : 0);

  return (
    <div className="relative mt-[0.8cqw] text-[2.35cqw] font-semibold leading-[1.08] tracking-[-0.12cqw]">
      {step >= demoSteps.hover && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pointer-events-none absolute -inset-x-[0.25cqw] -inset-y-[0.3cqw] border-[0.06cqw] border-[#3998df]">
          <span className="absolute -left-[0.06cqw] -top-[1.05cqw] bg-[#3998df] px-[0.35cqw] py-[0.08cqw] text-[0.55cqw] font-normal leading-normal tracking-normal text-white">Heading</span>
        </motion.div>
      )}
      <CopySwap changed={personalized} before="A better way" after="Less busywork." />
      <br />
      {personalized ? "More " : "to "}
      <span className="relative inline-block whitespace-nowrap text-[#6f875b]">
        <span>{step >= demoSteps.typed ? replacement : editing ? typedText : personalized ? "great work." : "build together."}</span>
        {selected && (
          <motion.span style={{ clipPath: selectionClip }} className="absolute inset-0 bg-[#3998df] text-white">great work.</motion.span>
        )}
        {editing && <motion.span style={{ opacity: caretOpacity }} className="absolute -right-[0.08cqw] top-[8%] h-[85%] w-[0.06cqw] bg-[#183f35]" />}
        {step >= demoSteps.select && step < demoSteps.typed && (
          <motion.span initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="absolute -left-[0.1cqw] -top-[1.9cqw] flex h-[1.5cqw] items-center gap-[0.65cqw] rounded-[0.2cqw] border-[0.05cqw] border-[#41434a] bg-[#202124] px-[0.5cqw] tracking-normal text-white shadow-lg">
            <Bold className="size-[0.7cqw]" /><Italic className="size-[0.7cqw]" /><Link className="size-[0.7cqw]" />
            <span className="border-b-[0.12cqw] border-[#c4f36a] text-[0.7cqw] font-medium leading-none">A</span>
            <ChevronDown className="size-[0.6cqw]" />
          </motion.span>
        )}
        {!reducedMotion && (
          <motion.span style={{ x: cursorX, y: cursorY, opacity: cursorOpacity }} className="pointer-events-none absolute left-0 top-0 z-20 text-[#18191b] drop-shadow-[0_0.1cqw_0.1cqw_#0004]">
            {step >= demoSteps.select && step < demoSteps.typed ? <TextCursor className="size-[1.3cqw]" /> : <MousePointer2 className="size-[1.25cqw] fill-white" strokeWidth={1.4} />}
          </motion.span>
        )}
      </span>
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="relative h-[13.3cqw] rounded-[0.85cqw] bg-[#dbe5d6] p-[1.15cqw]">
      <div className="absolute -right-[0.2cqw] top-[1.6cqw] h-[2.3cqw] w-[5.8cqw] rotate-[8deg] rounded-[0.35cqw] bg-[#c4f36a] shadow-sm" />
      <div className="relative h-full overflow-hidden rounded-[0.4cqw] bg-white shadow-[0_0.6cqw_1.5cqw_#183f3520]">
        <div className="flex h-[1.7cqw] items-center gap-[0.2cqw] border-b border-[#edf0e9] px-[0.6cqw]">
          {[0, 1, 2].map((index) => <span key={index} className="size-[0.22cqw] rounded-full bg-[#cdd6c8]" />)}
          <span className="ml-auto text-[0.4cqw] text-[#7f8e7a]">Your creative space</span>
        </div>
        <div className="flex h-[calc(100%-1.7cqw)]">
          <div className="w-[2.2cqw] shrink-0 space-y-[0.75cqw] bg-[#f4f6f1] px-[0.65cqw] py-[0.8cqw]">
            <BrandMark className="size-[0.7cqw]" />
            {[0, 1, 2, 3].map((index) => <span key={index} className="block size-[0.55cqw] rounded-[0.1cqw] bg-[#d8dfd2]" />)}
          </div>
          <div className="flex-1 p-[0.8cqw]">
            <div className="flex items-center justify-between text-[0.62cqw] font-semibold"><span>Good things ahead.</span><Ellipsis className="size-[0.7cqw]" /></div>
            <div className="mt-[0.6cqw] flex gap-[0.25cqw] text-[0.38cqw] text-[#8a9585]">
              <span className="rounded-full bg-[#edf3e7] px-[0.4cqw] py-[0.2cqw] text-[#48613b]">Overview</span><span className="px-[0.4cqw] py-[0.2cqw]">Projects</span><span className="px-[0.4cqw] py-[0.2cqw]">Team</span>
            </div>
            <div className="mt-[0.6cqw] grid grid-cols-2 gap-[0.5cqw]">
              {["Brand refresh", "The next big idea"].map((label, index) => (
                <div key={label} className="rounded-[0.35cqw] border-[0.05cqw] border-[#e8ece4] p-[0.5cqw]">
                  <span className={cn("mb-[0.5cqw] block h-[1.5cqw] rounded-[0.2cqw]", index === 0 ? "bg-[#e9efd8]" : "bg-[#ede4da]")} />
                  <span className="text-[0.46cqw] font-semibold">{label}</span>
                  <div className="mt-[0.45cqw] h-[0.2cqw] rounded-full bg-[#edf0e9]"><div className="h-full w-2/3 rounded-full bg-[#a2bf83]" /></div>
                  <div className="mt-[0.6cqw] flex -space-x-[0.13cqw]">{["#c4d6b6", "#e4c9ad", "#c9c4db"].map((color) => <span key={color} style={{ backgroundColor: color }} className="size-[0.65cqw] rounded-full ring-[0.08cqw] ring-white" />)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[0.65cqw] -left-[0.75cqw] flex items-center gap-[0.4cqw] rounded-[0.4cqw] border-[0.05cqw] border-[#e0e7da] bg-white px-[0.65cqw] py-[0.5cqw] text-[0.48cqw] shadow-[0_0.3cqw_1cqw_#183f3512]">
        <CircleCheck className="size-[0.8cqw] text-[#7a9b50]" /> A little more space to create.
      </div>
    </div>
  );
}

export function BrandLandingPage({ demo }: { demo: BuilderDemo }) {
  const { step, time, reducedMotion } = demo;
  const opacity = useTransform(time, [0, 0.4, DURATION - 0.7, DURATION], [0, 1, 1, 0]);
  const revealProps = { reducedMotion };
  const personalized = step >= demoSteps.featureCopy;
  const features = personalized ? [
    ["All your projects", "Everything you need, in one place."],
    ["Feedback that flows", "Keep the good ideas moving."],
    ["Made for your team", "Find your focus, together."],
  ] : [
    ["Make it yours", "A flexible space for your ideas."],
    ["Work together", "Bring your people closer."],
    ["Grow your vision", "Build something that matters."],
  ];
  return (
    <div className="relative m-[0.65cqw] min-h-0 flex-1 overflow-hidden rounded-[0.2cqw] bg-[#f7f5f0] text-[#183f35]">
      {step < demoSteps.navigation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.7cqw] text-[#8d9688]">
          <Sparkles className="size-[1.7cqw] text-[#b3bda9]" />
          <span className="text-[0.8cqw]">Your next page starts here.</span>
          <span className="text-[0.6cqw] text-[#acb1a7]">Built around your brand.</span>
        </div>
      )}
      <motion.div style={{ opacity: reducedMotion ? 1 : opacity }}>
        <Reveal section="navigation" show={step >= demoSteps.navigation} {...revealProps} className="flex h-[3.9cqw] items-center justify-between border-b-[0.05cqw] border-[#e4e7db] px-[2.2cqw]">
          <div className="flex items-center gap-[0.45cqw] text-[1.1cqw] font-semibold tracking-[-0.04cqw]"><BrandMark /><CopySwap changed={step >= demoSteps.companyName} before="Your brand" after="lumio" /></div>
          <div className="flex items-center gap-[1.2cqw] text-[0.58cqw]"><span>Product</span><span>Why us</span><span>Stories</span></div>
          <span className="flex h-[1.55cqw] items-center gap-[0.6cqw] rounded-full bg-[#183f35] px-[0.8cqw] text-[0.56cqw] text-white">Get started <ArrowRight className="size-[0.6cqw]" /></span>
        </Reveal>
        <Reveal section="hero" show={step >= demoSteps.hero} {...revealProps} className="grid h-[17.2cqw] grid-cols-[1.15fr_1fr] items-center gap-[1.6cqw] px-[2.2cqw]">
          <div>
            <div className="flex items-center gap-[0.35cqw] text-[0.46cqw] font-semibold tracking-[0.09cqw] text-[#6d805e]">
              <span className="size-[0.25cqw] rounded-full bg-[#7c9d5a]" /><CopySwap changed={step >= demoSteps.headline} before="YOUR NEXT CHAPTER" after="THE WORKSPACE FOR CREATIVE TEAMS" />
            </div>
            <EditableHeadline demo={demo} />
            <p className="mt-[0.9cqw] min-h-[2.9cqw] max-w-[20cqw] text-[0.72cqw] leading-[1.6] tracking-normal text-[#77816f]">
              <CopySwap changed={step >= demoSteps.description} before="Turn your boldest ideas into something extraordinary. One place to get started." after="Lumio brings projects, feedback, and your team into one calm, connected workspace." />
            </p>
            <div className="mt-[1cqw] flex items-center gap-[0.75cqw]">
              <span className="flex h-[1.9cqw] items-center gap-[0.7cqw] rounded-full bg-[#183f35] px-[0.9cqw] text-[0.61cqw] text-white"><CopySwap changed={step >= demoSteps.description} before="Get started" after="Start creating" /><ArrowRight className="size-[0.7cqw]" /></span>
              <span className="text-[0.5cqw] text-[#87917f]">Free to start. Room to grow.</span>
            </div>
          </div>
          <WorkspacePreview />
        </Reveal>
        <Reveal section="proof" show={step >= demoSteps.proof} {...revealProps} className="flex h-[3.3cqw] items-center justify-between border-y-[0.05cqw] border-[#e4e7db] px-[2.2cqw] text-[#88937e]">
          <span className="max-w-[10cqw] text-[0.53cqw] leading-[1.5]">A little less chaos.<br />A lot more possibility.</span>
          {["Layers", "Capsule", "Quotient", "Sisyphus"].map((name) => <span key={name} className="text-[0.83cqw] font-semibold tracking-[-0.03cqw]">{name}</span>)}
        </Reveal>
        <Reveal section="features" show={step >= demoSteps.features} {...revealProps} className="h-[10.4cqw] px-[2.2cqw] py-[1.2cqw]">
          <div className="mb-[0.9cqw] flex items-center justify-between"><span className="text-[1.15cqw] font-semibold tracking-[-0.045cqw]">Good work starts with a little space.</span><span className="text-[0.52cqw] text-[#7f8d74]">Thoughtfully simple. Beautifully useful.</span></div>
          <div className="grid grid-cols-3 gap-[0.65cqw]">
            {features.map(([title, description], index) => (
              <motion.div key={index} animate={{ backgroundColor: personalized ? "#eef1e8" : "#f0f0e9" }} className="h-[6.2cqw] rounded-[0.6cqw] border-[0.05cqw] border-[#e3e8d9] p-[0.8cqw]">
                <span className="mb-[0.75cqw] flex size-[1.2cqw] items-center justify-center rounded-[0.35cqw] bg-[#dae6c9] text-[0.55cqw]">0{index + 1}</span>
                <motion.div key={title} initial={{ opacity: 0.25 }} animate={{ opacity: 1 }}><span className="text-[0.75cqw] font-semibold">{title}</span><p className="mt-[0.35cqw] text-[0.52cqw] leading-[1.5] text-[#859079]">{description}</p></motion.div>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal section="footer" show={step >= demoSteps.footer} {...revealProps} className="mx-[2.2cqw] mt-[0.3cqw] flex h-[6.3cqw] items-center justify-between rounded-[0.7cqw] bg-[#183f35] px-[1.5cqw] text-[#f7f5f0]">
          <div><span className="text-[1.35cqw] font-medium leading-[1.15] tracking-[-0.05cqw]">Make room for your<br />next big idea.</span><p className="mt-[0.5cqw] text-[0.53cqw] text-[#b4c8b5]"><CopySwap changed={personalized} before="Your best work is still ahead." after="A calmer way to create. That’s Lumio." /></p></div>
          <span className="flex h-[1.9cqw] items-center gap-[0.7cqw] rounded-full bg-[#c4f36a] px-[0.9cqw] text-[0.6cqw] font-medium text-[#183f35]"><CopySwap changed={personalized} before="Let’s get started" after="Try Lumio free" /><ArrowRight className="size-[0.65cqw]" /></span>
        </Reveal>
      </motion.div>
    </div>
  );
}

export function DemoPlaybackControls({ demo }: { demo: BuilderDemo }) {
  if (demo.reducedMotion) return null;
  return (
    <div className="absolute bottom-[4%] right-[2%] z-30 flex gap-0.5 rounded-full border border-white/10 bg-[#18191b]/90 p-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:gap-1 sm:p-1 [@media(hover:none)]:opacity-100">
      <button type="button" onClick={demo.togglePaused} aria-label={demo.paused ? "Play illustration" : "Pause illustration"} className="flex size-5 items-center justify-center rounded-full text-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b494f4] sm:size-7">
        {demo.paused ? <Play className="size-3 sm:size-3.5" /> : <Pause className="size-3 sm:size-3.5" />}
      </button>
      <button type="button" onClick={demo.replay} aria-label="Replay illustration" className="flex size-5 items-center justify-center rounded-full text-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b494f4] sm:size-7"><RotateCcw className="size-3 sm:size-3.5" /></button>
    </div>
  );
}
