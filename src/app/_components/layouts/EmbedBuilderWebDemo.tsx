"use client";

import {
  ChatBrandDetails,
  ChatComposer,
  ChatMessage,
  ChatPanelHeader,
  ChatSendButton,
  ChatToolCard,
} from "./EditorShell";

import { cn } from "@/lib/utils";
import EmailTemplatePreview from "./EmailTemplatePreview";
import { getEditorDemoCopy } from "./editorDemoContent";
import {
  ArrowRight,
  Bold,
  ChevronDown,
  CircleCheck,
  Crosshair,
  Ellipsis,
  Italic,
  Link,
  LoaderCircle,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  TextCursor,
  Type,
  X,
} from "lucide-react";
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
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

// A single clock keeps chat, page creation, copy changes, and the cursor in sync.
const CUE_TIMES = [
  0, 3.4, 4.5, 6.1, 7.1, 7.7, 8.4, 9.1, 9.8, 10.5, 11.2, 12.3, 15.45, 16.6,
  17.3, 17.75, 18.2, 18.65, 19.2, 20.9, 22, 22.8, 23.4, 24.6, 26.6, 28,
];
const DURATION = 32.6;

export const demoSteps = {
  promptSent: 1,
  fetchBrand: 2,
  brandReady: 3,
  createPage: 4,
  navigation: 5,
  hero: 6,
  proof: 7,
  features: 8,
  footer: 9,
  pageReady: 10,
  companyTyping: 11,
  companyPrompt: 12,
  updateCopy: 13,
  companyName: 14,
  headline: 15,
  description: 16,
  featureCopy: 17,
  copyReady: 18,
  cursor: 19,
  hover: 20,
  select: 21,
  selected: 22,
  typing: 23,
  typed: 24,
  complete: 25,
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

function ChatEntry({
  children,
  user = false,
}: {
  children: ReactNode;
  user?: boolean;
}) {
  return (
    <motion.div
      data-demo-user-message={user || undefined}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ChatMessage user={user}>{children}</ChatMessage>
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
  const rotate = useTransform(demo.time, (value) => value * 720);
  return (
    <ChatEntry>
      <ChatToolCard
        label={label}
        done={done}
        status={
          <motion.span style={{ rotate }} className="flex text-[#b597fa]">
            <LoaderCircle className="size-[0.75cqw]" />
          </motion.span>
        }
      >
        {children}
      </ChatToolCard>
    </ChatEntry>
  );
}

export function DemoConversation({
  demo,
  isEmail = false,
}: {
  demo: BuilderDemo;
  isEmail?: boolean;
}) {
  const copy = getEditorDemoCopy(isEmail);
  const { step, time, reducedMotion } = demo;
  const opacity = useTransform(
    time,
    [0, 0.4, DURATION - 0.7, DURATION],
    [0, 1, 1, 0],
  );
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-r-[0.05cqw] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] text-[0.72cqw] text-[color:var(--editor-text)]">
      <ChatPanelHeader />
      <motion.div
        style={{ opacity: reducedMotion ? 1 : opacity }}
        className="min-h-0 flex-1 space-y-[0.65cqw] overflow-hidden px-[0.5cqw] py-[0.5cqw] leading-[1.45]"
      >
        {step >= demoSteps.promptSent && (
          <ChatEntry user>{copy.prompt}</ChatEntry>
        )}
        {step >= demoSteps.fetchBrand && (
          <>
            <ChatEntry>{copy.reply}</ChatEntry>
            <ToolCall
              label="Fetch brand design system"
              done={step >= demoSteps.brandReady}
              demo={demo}
            >
              <ChatBrandDetails />
            </ToolCall>
          </>
        )}
        {step >= demoSteps.createPage && (
          <ToolCall
            label={copy.createTool}
            done={step >= demoSteps.pageReady}
            demo={demo}
          />
        )}
        {step >= demoSteps.pageReady && <ChatEntry>{copy.complete}</ChatEntry>}
        {step >= demoSteps.companyPrompt && (
          <ChatEntry user>{copy.companyPrompt}</ChatEntry>
        )}
        {step >= demoSteps.updateCopy && (
          <>
            <ChatEntry>
              I’ll tailor the copy to YourBrand’s product and audience.
            </ChatEntry>
            <ToolCall
              label={copy.updateTool}
              done={step >= demoSteps.copyReady}
              demo={demo}
            />
          </>
        )}
        {step >= demoSteps.copyReady && (
          <ChatEntry>{copy.visualEdit}</ChatEntry>
        )}
      </motion.div>
      <DraftComposer demo={demo} isEmail={isEmail} />
    </div>
  );
}

function DraftComposer({
  demo,
  isEmail = false,
}: {
  demo: BuilderDemo;
  isEmail?: boolean;
}) {
  const { prompt: brandPrompt, companyPrompt } = getEditorDemoCopy(isEmail);
  const { step, time } = demo;
  const [draft, setDraft] = useState("");
  const draftRef = useRef("");
  const firstSend = CUE_TIMES[demoSteps.promptSent];
  const companyStart = CUE_TIMES[demoSteps.companyTyping];
  const companySend = CUE_TIMES[demoSteps.companyPrompt];
  const caretOpacity = useTransform(time, (value) =>
    Math.sin(value * 10) > 0 ? 1 : 0,
  );
  const sendScale = useTransform(
    time,
    [
      0,
      firstSend - 0.18,
      firstSend - 0.05,
      firstSend + 0.12,
      companySend - 0.18,
      companySend - 0.05,
      companySend + 0.12,
      DURATION,
    ],
    [1, 1, 0.85, 1, 1, 0.85, 1, 1],
  );

  useMotionValueEvent(time, "change", (value) => {
    let next = "";
    if (value >= 0.45 && value < firstSend) {
      const count = Math.floor(((value - 0.45) / 2.65) * brandPrompt.length);
      next = brandPrompt.slice(0, Math.min(brandPrompt.length, count));
    } else if (value >= companyStart && value < companySend) {
      const count = Math.floor(
        ((value - companyStart) / 2.7) * companyPrompt.length,
      );
      next = companyPrompt.slice(0, Math.min(companyPrompt.length, count));
    }
    if (next !== draftRef.current) {
      draftRef.current = next;
      setDraft(next);
    }
  });

  return (
    <ChatComposer
      draft={draft}
      context={
        step >= demoSteps.hover && (
          <div className="flex items-center gap-[0.5cqw]">
            <Crosshair className="size-[0.8cqw]" />
            <span className="flex items-center gap-[0.3cqw] rounded-[0.15cqw] bg-[#3998df] px-[0.35cqw] py-[0.1cqw] text-white">
              <Type className="size-[0.8cqw]" /> Heading{" "}
              <X className="size-[0.7cqw]" />
            </span>
          </div>
        )
      }
      caret={
        <motion.span
          style={{ opacity: caretOpacity }}
          className="ml-[0.08cqw] inline-block h-[0.75cqw] w-[0.05cqw] bg-[#c9b4f2] align-[-0.08cqw]"
        />
      }
      sendControl={
        <motion.span style={{ scale: sendScale }}>
          <ChatSendButton active={!!draft} />
        </motion.span>
      }
    />
  );
}

function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("size-[1.25cqw]", className)}
    >
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M4.9 19.1 19.1 4.9"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}

function CopySwap({
  changed,
  before,
  after,
}: {
  changed: boolean;
  before: string;
  after: string;
}) {
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

function EditableHeadline({
  demo,
  isEmail = false,
}: {
  demo: BuilderDemo;
  isEmail?: boolean;
}) {
  const { step, time, reducedMotion } = demo;
  const personalized = step >= demoSteps.headline;
  const selected = step >= demoSteps.select && step < demoSteps.typing;
  const editing = step >= demoSteps.typing && step < demoSteps.typed;
  const [typedText, setTypedText] = useState("");
  const replacement = isEmail ? "great things." : "bright ideas.";
  const personalizedEnding = isEmail ? "good things." : "great work.";
  useMotionValueEvent(time, "change", (value) => {
    if (
      value < CUE_TIMES[demoSteps.typing] ||
      value >= CUE_TIMES[demoSteps.typed]
    )
      return;
    const progress =
      (value - CUE_TIMES[demoSteps.typing]) /
      (CUE_TIMES[demoSteps.typed] - CUE_TIMES[demoSteps.typing]);
    const text = replacement.slice(
      0,
      Math.floor(progress * (replacement.length + 1)),
    );
    setTypedText((previous) => (previous === text ? previous : text));
  });
  const cursorAt = CUE_TIMES[demoSteps.cursor];
  const hoverAt = CUE_TIMES[demoSteps.hover];
  const selectAt = CUE_TIMES[demoSteps.select];
  const selectedAt = CUE_TIMES[demoSteps.selected];
  const typedAt = CUE_TIMES[demoSteps.typed];
  const completeAt = CUE_TIMES[demoSteps.complete];
  const selectionClip = useTransform(
    time,
    [selectAt, selectedAt],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
  );
  // Font-relative units keep the editing UI scaled to either canvas's headline.
  const cursorX = useTransform(
    time,
    [
      cursorAt,
      cursorAt + 0.5,
      hoverAt,
      selectAt,
      selectedAt,
      typedAt + 0.5,
      completeAt,
    ],
    ["11.9em", "7.66em", "0.064em", "0.064em", "4.6em", "4.9em", "6.4em"],
  );
  const cursorY = useTransform(
    time,
    [cursorAt, cursorAt + 0.5, hoverAt, typedAt + 0.5, completeAt],
    ["7.23em", "4.25em", "0.49em", "0.49em", "2.13em"],
  );
  const cursorOpacity = useTransform(
    time,
    [0, cursorAt - 0.1, cursorAt, completeAt + 0.2, completeAt + 0.7, DURATION],
    [0, 0, 1, 1, 0, 0],
  );
  const caretOpacity = useTransform(time, (value) =>
    Math.sin(value * 10) > 0 ? 1 : 0,
  );

  return (
    <div
      className={cn(
        "relative font-semibold",
        isEmail
          ? "leading-[1.12] tracking-tight"
          : "mt-[0.8cqw] text-[2.35cqw] leading-[1.08] tracking-[-0.12cqw]",
      )}
    >
      {step >= demoSteps.hover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute -inset-x-[0.106em] -inset-y-[0.128em] border-[0.026em] border-[#3998df]"
        >
          <span className="absolute -left-[0.11em] -top-[1.91em] bg-[#3998df] px-[0.64em] py-[0.15em] text-[0.234em] font-normal leading-normal tracking-normal text-white">
            Heading
          </span>
        </motion.div>
      )}
      <CopySwap
        changed={personalized}
        before={isEmail ? "A fresh start." : "A better way"}
        after={isEmail ? "Welcome aboard." : "Less busywork."}
      />
      <br />
      {isEmail ? "Make " : personalized ? "More " : "to "}
      <span className="relative inline-block whitespace-nowrap text-[#c99be6]">
        <span>
          {step >= demoSteps.typed
            ? replacement
            : editing
              ? typedText
              : personalized
                ? personalizedEnding
                : isEmail
                  ? "something new."
                  : "build together."}
        </span>
        {selected && (
          <motion.span
            style={{ clipPath: selectionClip }}
            className="absolute inset-0 bg-[#3998df] text-white"
          >
            {personalizedEnding}
          </motion.span>
        )}
        {editing && (
          <motion.span
            style={{ opacity: caretOpacity }}
            className="absolute -right-[0.034em] top-[8%] h-[85%] w-[0.026em] bg-[#d8b4fe]"
          />
        )}
        {step >= demoSteps.select && step < demoSteps.typed && (
          <motion.span
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -left-[0.043em] -top-[0.81em] flex h-[0.64em] items-center gap-[0.277em] rounded-[0.085em] border-[0.021em] border-[color:var(--editor-border)] bg-[color:var(--editor-raised)] px-[0.213em] tracking-normal text-white shadow-lg"
          >
            <Bold className="size-[0.3em]" />
            <Italic className="size-[0.3em]" />
            <Link className="size-[0.3em]" />
            <span className="border-b-[0.17em] border-[#d8b4fe] text-[0.3em] font-medium leading-none">
              A
            </span>
            <ChevronDown className="size-[0.255em]" />
          </motion.span>
        )}
        {!reducedMotion && (
          <motion.span
            style={{ x: cursorX, y: cursorY, opacity: cursorOpacity }}
            className="pointer-events-none absolute left-0 top-0 z-20 text-[#18191b] drop-shadow-[0_0.1cqw_0.1cqw_#0004]"
          >
            {step >= demoSteps.select && step < demoSteps.typed ? (
              <TextCursor className="size-[0.55em] text-white" />
            ) : (
              <MousePointer2
                className="size-[0.53em] fill-white"
                strokeWidth={1.4}
              />
            )}
          </motion.span>
        )}
      </span>
    </div>
  );
}

function WorkspacePreview() {
  return (
    <div className="relative h-[13.3cqw] rounded-[0.85cqw] bg-[#352342] p-[1.15cqw]">
      <div className="absolute -right-[0.2cqw] top-[1.6cqw] h-[2.3cqw] w-[5.8cqw] rotate-[8deg] rounded-[0.35cqw] bg-[#d8b4fe] shadow-sm" />
      <div className="relative h-full overflow-hidden rounded-[0.4cqw] bg-[#23192e] shadow-[0_0.6cqw_1.5cqw_#4c236820]">
        <div className="flex h-[1.7cqw] items-center gap-[0.2cqw] border-b border-[#493252] px-[0.6cqw]">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="size-[0.22cqw] rounded-full bg-[#735280]"
            />
          ))}
          <span className="ml-auto text-[0.4cqw] text-[#96829f]">
            Your creative space
          </span>
        </div>
        <div className="flex h-[calc(100%-1.7cqw)]">
          <div className="w-[2.2cqw] shrink-0 space-y-[0.75cqw] bg-[#1e1527] px-[0.65cqw] py-[0.8cqw]">
            <BrandMark className="size-[0.7cqw]" />
            {[0, 1, 2, 3].map((index) => (
              <span
                key={index}
                className="block size-[0.55cqw] rounded-[0.1cqw] bg-[#4e365e]"
              />
            ))}
          </div>
          <div className="flex-1 p-[0.8cqw]">
            <div className="flex items-center justify-between text-[0.62cqw] font-semibold">
              <span>Good things ahead.</span>
              <Ellipsis className="size-[0.7cqw]" />
            </div>
            <div className="mt-[0.6cqw] flex gap-[0.25cqw] text-[0.38cqw] text-[#a291ad]">
              <span className="rounded-full bg-[#3a244b] px-[0.4cqw] py-[0.2cqw] text-[#c5a4dc]">
                Overview
              </span>
              <span className="px-[0.4cqw] py-[0.2cqw]">Projects</span>
              <span className="px-[0.4cqw] py-[0.2cqw]">Team</span>
            </div>
            <div className="mt-[0.6cqw] grid grid-cols-2 gap-[0.5cqw]">
              {["Brand refresh", "The next big idea"].map((label, index) => (
                <div
                  key={label}
                  className="rounded-[0.35cqw] border-[0.05cqw] border-[#46304f] p-[0.5cqw]"
                >
                  <span
                    className={cn(
                      "mb-[0.5cqw] block h-[1.5cqw] rounded-[0.2cqw]",
                      index === 0 ? "bg-[#44304f]" : "bg-[#3b294b]",
                    )}
                  />
                  <span className="text-[0.46cqw] font-semibold">{label}</span>
                  <div className="mt-[0.45cqw] h-[0.2cqw] rounded-full bg-[#3f2d4b]">
                    <div className="h-full w-2/3 rounded-full bg-[#b28acc]" />
                  </div>
                  <div className="mt-[0.6cqw] flex -space-x-[0.13cqw]">
                    {["#d3b7e7", "#e3c6ef", "#c9c4db"].map((color) => (
                      <span
                        key={color}
                        style={{ backgroundColor: color }}
                        className="size-[0.65cqw] rounded-full ring-[0.08cqw] ring-[#23192e]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-[0.65cqw] -left-[0.75cqw] flex items-center gap-[0.4cqw] rounded-[0.4cqw] border-[0.05cqw] border-[#50375d] bg-[#23192e] px-[0.65cqw] py-[0.5cqw] text-[0.48cqw] shadow-[0_0.3cqw_1cqw_#4c236812]">
        <CircleCheck className="size-[0.8cqw] text-[#9a6fb7]" /> A little more
        space to create.
      </div>
    </div>
  );
}

export function BrandLandingPage({
  demo,
  isEmail = false,
}: {
  demo: BuilderDemo;
  isEmail?: boolean;
}) {
  const { step, time, reducedMotion } = demo;
  const opacity = useTransform(
    time,
    [0, 0.4, DURATION - 0.7, DURATION],
    [0, 1, 1, 0],
  );
  const revealProps = { reducedMotion };
  const personalized = step >= demoSteps.featureCopy;
  const features = personalized
    ? [
        ["All your projects", "Everything you need, in one place."],
        ["Feedback that flows", "Keep the good ideas moving."],
        ["Made for your team", "Find your focus, together."],
      ]
    : [
        ["Make it yours", "A flexible space for your ideas."],
        ["Work together", "Bring your people closer."],
        ["Grow your vision", "Build something that matters."],
      ];
  if (isEmail) {
    return (
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[color:var(--editor-canvas)] p-[1cqw]">
        <div className="relative mx-auto h-full max-w-[30cqw] overflow-hidden rounded-sm bg-[#17121e] shadow-xl">
          {step < demoSteps.navigation && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.7cqw] text-[#a08caa]">
              <Sparkles className="size-[1.7cqw] text-[#c4acd1]" />
              <span className="text-[0.8cqw]">
                Your next email starts here.
              </span>
              <span className="text-[0.6cqw] text-[#bbacc4]">
                Built around your brand.
              </span>
            </div>
          )}
          <motion.div style={{ opacity: reducedMotion ? 1 : opacity }}>
            <EmailTemplatePreview
              kind="welcome"
              title={<EditableHeadline demo={demo} isEmail />}
              content={{
                brand: (
                  <CopySwap
                    changed={step >= demoSteps.companyName}
                    before="Your brand"
                    after="YourBrand"
                  />
                ),
                body: (
                  <CopySwap
                    changed={step >= demoSteps.description}
                    before="A little inspiration, a few useful tools, and everything you need to get started."
                    after="YourBrand brings your projects, feedback, and team together. Here’s to your next big idea."
                  />
                ),
                cta: (
                  <CopySwap
                    changed={personalized}
                    before="Make yourself at home"
                    after="Get started with YourBrand"
                  />
                ),
              }}
              renderSection={(section, children) => {
                const cues = {
                  brand: demoSteps.navigation,
                  heading: demoSteps.hero,
                  body: demoSteps.proof,
                  art: demoSteps.features,
                  action: demoSteps.footer,
                  footer: demoSteps.pageReady,
                };
                return (
                  <Reveal
                    section={`email-${section}`}
                    show={step >= cues[section]}
                    {...revealProps}
                  >
                    {children}
                  </Reveal>
                );
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative m-[0.65cqw] min-h-0 flex-1 overflow-hidden rounded-[0.2cqw] bg-[#17121e] text-[#f3eaf8]">
      {step < demoSteps.navigation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.7cqw] text-[#a08caa]">
          <Sparkles className="size-[1.7cqw] text-[#c4acd1]" />
          <span className="text-[0.8cqw]">Your next page starts here.</span>
          <span className="text-[0.6cqw] text-[#bbacc4]">
            Built around your brand.
          </span>
        </div>
      )}
      <motion.div style={{ opacity: reducedMotion ? 1 : opacity }}>
        <Reveal
          section="navigation"
          show={step >= demoSteps.navigation}
          {...revealProps}
          className="flex h-[3.9cqw] items-center justify-between border-b-[0.05cqw] border-[#35243f] px-[2.2cqw]"
        >
          <div className="flex items-center gap-[0.45cqw] text-[1.1cqw] font-semibold tracking-[-0.04cqw]">
            <BrandMark />
            <CopySwap
              changed={step >= demoSteps.companyName}
              before="Your brand"
              after="YourBrand"
            />
          </div>
          <div className="flex items-center gap-[1.2cqw] text-[0.58cqw]">
            <span>Product</span>
            <span>Why us</span>
            <span>Stories</span>
          </div>
          <span className="flex h-[1.55cqw] items-center gap-[0.6cqw] rounded-full bg-[#8351a4] px-[0.8cqw] text-[0.56cqw] text-white">
            Get started <ArrowRight className="size-[0.6cqw]" />
          </span>
        </Reveal>
        <Reveal
          section="hero"
          show={step >= demoSteps.hero}
          {...revealProps}
          className="grid h-[17.2cqw] grid-cols-[1.15fr_1fr] items-center gap-[1.6cqw] px-[2.2cqw]"
        >
          <div>
            <div className="flex items-center gap-[0.35cqw] text-[0.46cqw] font-semibold tracking-[0.09cqw] text-[#9b74ad]">
              <span className="size-[0.25cqw] rounded-full bg-[#b078cb]" />
              <CopySwap
                changed={step >= demoSteps.headline}
                before="YOUR NEXT CHAPTER"
                after="THE WORKSPACE FOR CREATIVE TEAMS"
              />
            </div>
            <EditableHeadline demo={demo} />
            <p className="mt-[0.9cqw] min-h-[2.9cqw] max-w-[20cqw] text-[0.72cqw] leading-[1.6] tracking-normal text-[#b9a7c6]">
              <CopySwap
                changed={step >= demoSteps.description}
                before="Turn your boldest ideas into something extraordinary. One place to get started."
                after="YourBrand brings projects, feedback, and your team into one calm, connected workspace."
              />
            </p>
            <div className="mt-[1cqw] flex items-center gap-[0.75cqw]">
              <span className="flex h-[1.9cqw] items-center gap-[0.7cqw] rounded-full bg-[#8351a4] px-[0.9cqw] text-[0.61cqw] text-white">
                <CopySwap
                  changed={step >= demoSteps.description}
                  before="Get started"
                  after="Start creating"
                />
                <ArrowRight className="size-[0.7cqw]" />
              </span>
              <span className="text-[0.5cqw] text-[#b2a0bd]">
                Free to start. Room to grow.
              </span>
            </div>
          </div>
          <WorkspacePreview />
        </Reveal>
        <Reveal
          section="proof"
          show={step >= demoSteps.proof}
          {...revealProps}
          className="flex h-[3.3cqw] items-center justify-between border-y-[0.05cqw] border-[#35243f] px-[2.2cqw] text-[#a28ead]"
        >
          <span className="max-w-[10cqw] text-[0.53cqw] leading-[1.5]">
            A little less chaos.
            <br />A lot more possibility.
          </span>
          {["Design", "Marketing", "Product", "Engineering"].map((name) => (
            <span
              key={name}
              className="text-[0.83cqw] font-semibold tracking-[-0.03cqw]"
            >
              {name}
            </span>
          ))}
        </Reveal>
        <Reveal
          section="features"
          show={step >= demoSteps.features}
          {...revealProps}
          className="h-[10.4cqw] px-[2.2cqw] py-[1.2cqw]"
        >
          <div className="mb-[0.9cqw] flex items-center justify-between">
            <span className="text-[1.15cqw] font-semibold tracking-[-0.045cqw]">
              Good work starts with a little space.
            </span>
            <span className="text-[0.52cqw] text-[#a28bad]">
              Thoughtfully simple. Beautifully useful.
            </span>
          </div>
          <div className="grid grid-cols-3 gap-[0.65cqw]">
            {features.map(([title, description], index) => (
              <motion.div
                key={index}
                animate={{
                  backgroundColor: personalized ? "#2b1c37" : "#25192f",
                }}
                className="h-[6.2cqw] rounded-[0.6cqw] border-[0.05cqw] border-[#46304f] p-[0.8cqw]"
              >
                <span className="mb-[0.75cqw] flex size-[1.2cqw] items-center justify-center rounded-[0.35cqw] bg-[#4b305e] text-[0.55cqw]">
                  0{index + 1}
                </span>
                <motion.div
                  key={title}
                  initial={{ opacity: 0.25 }}
                  animate={{ opacity: 1 }}
                >
                  <span className="text-[0.75cqw] font-semibold">{title}</span>
                  <p className="mt-[0.35cqw] text-[0.52cqw] leading-[1.5] text-[#baa5c8]">
                    {description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Reveal>
        <Reveal
          section="footer"
          show={step >= demoSteps.footer}
          {...revealProps}
          className="mx-[2.2cqw] mt-[0.3cqw] flex h-[6.3cqw] items-center justify-between rounded-[0.7cqw] bg-[#33213f] px-[1.5cqw] text-[#f4eaf9]"
        >
          <div>
            <span className="text-[1.35cqw] font-medium leading-[1.15] tracking-[-0.05cqw]">
              Make room for your
              <br />
              next big idea.
            </span>
            <p className="mt-[0.5cqw] text-[0.53cqw] text-[#d2b6e3]">
              <CopySwap
                changed={personalized}
                before="Your best work is still ahead."
                after="A calmer way to create. That’s YourBrand."
              />
            </p>
          </div>
          <span className="flex h-[1.9cqw] items-center gap-[0.7cqw] rounded-full bg-[#d8b4fe] px-[0.9cqw] text-[0.6cqw] font-medium text-[#352044]">
            <CopySwap
              changed={personalized}
              before="Let’s get started"
              after="Try YourBrand free"
            />
            <ArrowRight className="size-[0.65cqw]" />
          </span>
        </Reveal>
      </motion.div>
    </div>
  );
}

export function DemoPlaybackControls({ demo }: { demo: BuilderDemo }) {
  if (demo.reducedMotion) return null;
  return (
    <div className="absolute bottom-[4%] right-[2%] z-30 flex gap-0.5 rounded-full border border-white/10 bg-[color:var(--editor-bg)] p-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 sm:gap-1 sm:p-1 [@media(hover:none)]:opacity-100">
      <button
        type="button"
        onClick={demo.togglePaused}
        aria-label={demo.paused ? "Play illustration" : "Pause illustration"}
        className="flex size-5 items-center justify-center rounded-full text-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b494f4] sm:size-7"
      >
        {demo.paused ? (
          <Play className="size-3 sm:size-3.5" />
        ) : (
          <Pause className="size-3 sm:size-3.5" />
        )}
      </button>
      <button
        type="button"
        onClick={demo.replay}
        aria-label="Replay illustration"
        className="flex size-5 items-center justify-center rounded-full text-white/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b494f4] sm:size-7"
      >
        <RotateCcw className="size-3 sm:size-3.5" />
      </button>
    </div>
  );
}
