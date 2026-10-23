"use client";

import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  Copy,
  Crosshair,
  EllipsisVertical,
  Hand,
  Mic,
  Move,
  Play,
  Plus,
  Trash2,
  Type,
  X,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import { useRef, type ReactNode } from "react";
import {
  BrandLandingPage,
  DemoConversation,
  demoSteps,
  DemoPlaybackControls,
  useBuilderDemo,
} from "./EmbedBuilderWebDemo";

import {
  CanvasToolbar,
  ChatPanelHeader,
  EditorSidebar,
  StylesPanel,
  editorShellTheme,
} from "./EditorShell";

type EmbedBuilderWebProps = {
  className?: string;
  withControls?: boolean;
  isEmail?: boolean;
};

function AppLogo() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="size-[1.45cqw]">
      <path d="M14.7 1A15 15 0 0 0 1 14.7h4.4a9.3 9.3 0 0 0 9.3-9.3V1Zm2.6 0v4.4a9.3 9.3 0 0 0 9.3 9.3H31A15 15 0 0 0 17.3 1ZM1 17.3A15 15 0 0 0 14.7 31v-4.4a9.3 9.3 0 0 0-9.3-9.3H1Zm25.6 0a9.3 9.3 0 0 0-9.3 9.3V31A15 15 0 0 0 31 17.3h-4.4Z" />
    </svg>
  );
}

function SiteLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className="size-[1.8cqw]">
      {Array.from({ length: 12 }, (_, index) => (
        <ellipse
          key={index}
          cx="20"
          cy="8"
          rx="2.1"
          ry="6.3"
          transform={`rotate(${index * 30} 20 20)`}
        />
      ))}
    </svg>
  );
}

function ApplicationShell({ isEmail = false }: { isEmail?: boolean }) {
  return (
    <>
      <div className="absolute inset-y-0 left-0 w-[15.3%] border-r-[0.075cqw] border-[#45404f] bg-[#1e1c28]">
        <div className="flex h-[4.05cqw] items-center gap-[0.65cqw] px-[1cqw] text-[1.45cqw] font-bold text-[#ae8aef]">
          <AppLogo />
          <span>Your App</span>
        </div>
        <div className="px-[1cqw] pt-[1.75cqw]">
          <div className="h-[3.1cqw] rounded-[0.5cqw] bg-gradient-to-r from-[#2c253f] to-[#231f30]" />
          <div className="mt-[1.4cqw] space-y-[2.45cqw] px-[1.2cqw]">
            {[7.4, 5.7, 6.6, 5.1].map((width, index) => (
              <div key={index} className="flex items-center gap-[0.85cqw]">
                <div className="size-[1cqw] shrink-0 rounded-full bg-[#2c2542]" />
                <div
                  className="h-[1cqw] rounded-full bg-[#2c2542]"
                  style={{ width: `${width}cqw` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute left-[15.3%] right-0 top-0 flex h-[7.7%] items-center justify-between border-b-[0.075cqw] border-[#45404f] bg-[#1e1c28] px-[1.75cqw]">
        <div className="h-[1cqw] w-[14cqw] rounded-full bg-[#2b243e]" />
        <div className="flex items-center gap-[1.4cqw]">
          <span className="flex h-[1.85cqw] items-center rounded-[0.2cqw] bg-[#8b5cf6] px-[0.8cqw] text-[0.8cqw] text-white">
            {isEmail ? "Send" : "Publish"}
          </span>
          <div className="relative text-[#676372]">
            <Bell className="size-[1.55cqw]" strokeWidth={1.5} />
            <span className="absolute right-[0.1cqw] top-[0.3cqw] size-[0.45cqw] rounded-full bg-[#e53b36] ring-[0.13cqw] ring-[#1e1c28]" />
          </div>
          <div className="flex size-[1.65cqw] items-center justify-center rounded-full border-[0.09cqw] border-[#a8a1b5] bg-gradient-to-br from-[#dcc5a2] via-[#a88d88] to-[#79516a] text-[0.6cqw] font-semibold text-white">
            JD
          </div>
        </div>
      </div>
    </>
  );
}

function ConversationAction({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-[1.65cqw] items-center gap-[0.45cqw] rounded-[0.18cqw] bg-[color:var(--editor-raised)] px-[0.5cqw]">
      <Check className="size-[0.8cqw]" />
      <span className="flex-1">{children}</span>
      <ChevronDown className="size-[0.75cqw]" />
    </div>
  );
}

function AIChatPanel() {
  return (
    <div className="flex min-h-0 min-w-0 flex-col border-r-[0.05cqw] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] text-[0.72cqw] text-[color:var(--editor-text)]">
      <ChatPanelHeader />
      <div className="min-h-0 flex-1 space-y-[0.75cqw] overflow-hidden px-[0.5cqw] py-[0.5cqw] leading-[1.45]">
        <div className="rounded-[0.2cqw] bg-[#8b5cf6] px-[0.45cqw] py-[0.4cqw] text-white">
          Create a landing page for our visual website builder. Use a purple
          theme and add a waitlist.
        </div>
        <div className="space-y-[0.45cqw]">
          <p>
            I’ll create a landing page with a bold headline, feature sections,
            and a clear call to action.
          </p>
          <ConversationAction>Create new project page</ConversationAction>
        </div>
        <div className="space-y-[0.45cqw]">
          <p>
            The page is ready. I’ll add your content and style it with a purple
            gradient and waitlist buttons.
          </p>
          <ConversationAction>Edit page content</ConversationAction>
        </div>
        <div className="rounded-[0.2cqw] bg-[#8b5cf6] px-[0.45cqw] py-[0.4cqw] text-white">
          Make “drag-and-drop builder” stand out in a brighter purple.
        </div>
        <div className="space-y-[0.45cqw]">
          <p>
            I’ll highlight the selected text and keep the rest of the heading
            white.
          </p>
          <ConversationAction>Update styles</ConversationAction>
        </div>
        <p>
          Done — your landing page is ready, with a purple headline and matching
          waitlist buttons.
        </p>
      </div>
      <div className="shrink-0 border-t-[0.05cqw] border-[color:var(--editor-border)] p-[0.5cqw]">
        <div className="flex h-[6.6cqw] flex-col rounded-[0.45cqw] border-[0.05cqw] border-[color:var(--editor-border)] p-[0.45cqw]">
          <div className="flex items-center gap-[0.5cqw]">
            <Crosshair className="size-[0.8cqw]" />
            <span className="flex items-center gap-[0.3cqw] rounded-[0.15cqw] bg-[#3998df] px-[0.35cqw] py-[0.1cqw] text-white">
              <Type className="size-[0.8cqw]" />
              Text
              <X className="ml-[0.2cqw] size-[0.75cqw]" />
            </span>
          </div>
          <span className="mt-[0.45cqw] text-[#8d849b]">Ask anything...</span>
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

function WaitlistButton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-[2.2cqw] items-center justify-center rounded-[0.3cqw] border-[0.1cqw] border-[#db6de8]/70 bg-[#c647dd] px-[1.1cqw] text-[0.95cqw] font-medium text-white shadow-[inset_0_0_0.25cqw_#ef9bff55,0_0.1cqw_0.2cqw_#0003]",
        className,
      )}
    >
      Join Waitlist
    </span>
  );
}

function LandingPageCanvas() {
  return (
    <div className="flex min-w-0 flex-col overflow-hidden bg-[color:var(--editor-canvas)]">
      <CanvasToolbar />
      <div className="relative m-[0.65cqw] min-h-0 flex-1 overflow-hidden rounded-[0.2cqw] bg-[linear-gradient(165deg,#18051e_0%,#351039_45%,#501e58_100%)] text-white">
        <div className="flex h-[4.7cqw] items-center justify-between px-[1.8cqw]">
          <div className="flex items-center gap-[0.65cqw] text-[1.45cqw] font-bold text-[#c647dd]">
            <SiteLogo />
            <span>Your Logo</span>
          </div>
          <div className="flex items-center gap-[1.5cqw] text-[0.95cqw]">
            <span>About</span>
            <span>Features</span>
            <span>Testimonials</span>
          </div>
          <WaitlistButton />
        </div>
        <div className="mt-[5.2cqw] flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-[0.5cqw] whitespace-nowrap text-[2.3cqw] font-bold leading-[1.5] tracking-[-0.06cqw]">
            <span>Your embeddable</span>
            <span className="relative border-[0.08cqw] border-[#b18be9] px-[0.4cqw] py-[0.1cqw] text-[#c647dd]">
              drag-and-drop builder
              <span className="absolute -top-[1.8cqw] right-[0.4cqw] flex h-[1.45cqw] items-center gap-[0.55cqw] rounded-t-[0.15cqw] bg-[#aa86ed] px-[0.4cqw] text-[#f3eaff]">
                {[ArrowUp, Move, Copy, Trash2, EllipsisVertical].map(
                  (Icon, index) => (
                    <Icon
                      key={index}
                      className="size-[0.7cqw]"
                      strokeWidth={1.7}
                    />
                  ),
                )}
              </span>
              <Hand className="absolute -bottom-[0.7cqw] right-[4.4cqw] size-[1.2cqw] fill-white text-[#17121b] drop-shadow-[0_0.1cqw_0.05cqw_#0006]" />
            </span>
          </div>
          <div className="mt-[0.55cqw] text-[1.02cqw] leading-[1.7] text-[#eee3f0]">
            <p>Seamlessly integrate and create within your application.</p>
            <p>
              Open-source, customizable, white-label, no-code, visual editor for
              :
            </p>
            <p>Emails, Landing pages, and Webpages</p>
          </div>
          <WaitlistButton className="mt-[1.55cqw]" />
          <div className="relative mt-[2.7cqw] aspect-video w-[66.5%] shrink-0 overflow-hidden rounded-[1.3cqw] border-[0.05cqw] border-white/15 bg-[linear-gradient(135deg,#d9c8eb_0%,#ad85c4_48%,#765285_100%)]">
            <div className="absolute -right-[9%] -top-[40%] aspect-square w-[68%] rounded-full bg-[#f6e6ff]/40 blur-[1.6cqw]" />
            <div className="absolute -bottom-[80%] -left-[12%] aspect-square w-[90%] rounded-full border-[0.05cqw] border-white/20 bg-[#69437d]/35" />
            <div className="absolute -bottom-[115%] -right-[20%] aspect-square w-full rounded-full border-[0.05cqw] border-white/20 bg-[#513560]/25" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex size-[3.3cqw] items-center justify-center rounded-full border-[0.05cqw] border-white/30 bg-white/30 shadow-[0_0.4cqw_2cqw_#3c185322] backdrop-blur-sm">
                <Play
                  className="ml-[0.2cqw] size-[1.4cqw] fill-white text-white"
                  strokeWidth={0}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** An animated editor demo; dimensions scale together with its container. */
export default function EmbedBuilderWeb({
  className,
  withControls = false,
  isEmail = false,
}: EmbedBuilderWebProps) {
  const ref = useRef<HTMLDivElement>(null);
  const demo = useBuilderDemo(ref);

  return (
    <MotionConfig reducedMotion="user">
      <div
        ref={ref}
        data-demo-step={demo.step}
        className={cn(
          "group relative isolate aspect-[1172/621] w-full overflow-hidden bg-[#24212b] [container-type:inline-size]",
          editorShellTheme,
          className,
        )}
      >
        <div
          role="img"
          aria-label={
            isEmail
              ? "GrapesJS Studio email builder demo: an AI assistant creates a branded welcome email, personalizes its content, and lets users edit it visually."
              : "GrapesJS Studio demo: an AI assistant fetches brand guidelines, builds a landing page, personalizes it for YourBrand, and a user edits the headline directly on the canvas."
          }
          className="absolute inset-0"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 select-none text-left font-[Arial,Helvetica,sans-serif] text-[0.7cqw] font-normal leading-normal text-[#a7a4b3] [&_svg]:shrink-0"
          >
            <ApplicationShell isEmail={isEmail} />
            <div className="absolute bottom-[2.6%] left-[16.7%] right-[1.35%] top-[10.1%] grid grid-cols-[2.8%_19.7%_minmax(0,1fr)_16.4%] overflow-hidden shadow-[0_0_0.6cqw_#16131c22]">
              <EditorSidebar />
              <DemoConversation demo={demo} isEmail={isEmail} />
              <div className="flex min-w-0 flex-col overflow-hidden bg-[color:var(--editor-canvas)]">
                <CanvasToolbar isEmail={isEmail} />
                <BrandLandingPage demo={demo} isEmail={isEmail} />
              </div>
              <StylesPanel
                brand
                withSelectors={false}
                isEmail={isEmail}
                color="#f3eaf8"
                selected={demo.step >= demoSteps.hover}
              />
            </div>
          </div>
        </div>
        {withControls && <DemoPlaybackControls demo={demo} />}
      </div>
    </MotionConfig>
  );
}
