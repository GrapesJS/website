import {
  ArrowRight,
  CalendarDays,
  Check,
  Gift,
  Mail,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const emailTemplates = {
  welcome: {
    eyebrow: "A NEW CHAPTER",
    title: "Welcome to YourBrand.",
    body: "A little inspiration, a few useful tools, and everything you need to get started.",
    cta: "Make yourself at home",
    detail: "Your next big idea starts here.",
    icon: Sparkles,
  },
  newsletter: {
    eyebrow: "THE WEEKLY EDIT",
    title: "Good things, in your inbox.",
    body: "Fresh ideas, useful reads, and a closer look at what’s new this week.",
    cta: "Read the latest stories",
    detail: "Ideas worth making time for.",
    icon: Mail,
  },
  promotion: {
    eyebrow: "SOMETHING SPECIAL",
    title: "Your next favorite is here.",
    body: "Explore a collection made for brighter days. Your exclusive offer is waiting.",
    cta: "Explore the collection",
    detail: "A little treat, just for you.",
    icon: Gift,
  },
  transactional: {
    eyebrow: "ORDER CONFIRMED",
    title: "You’re all set.",
    body: "Thanks for your order. We’re getting everything ready and will keep you posted.",
    cta: "View your order",
    detail: "Order #1024 · Studio collection",
    icon: Check,
  },
  cart: {
    eyebrow: "SAVED FOR YOU",
    title: "Still thinking it over?",
    body: "Your picks are right where you left them. Take another look whenever you’re ready.",
    cta: "Return to your cart",
    detail: "Good choices are worth coming back to.",
    icon: ShoppingBag,
  },
  event: {
    eyebrow: "YOU’RE INVITED",
    title: "Let’s make something great.",
    body: "Join a live session full of practical ideas, fresh perspectives, and good company.",
    cta: "Save your place",
    detail: "Thursday · 10:00 AM · Live online",
    icon: CalendarDays,
  },
};

export type EmailTemplateKind = keyof typeof emailTemplates;
type EmailTemplateSection =
  | "brand"
  | "heading"
  | "body"
  | "art"
  | "action"
  | "footer";

/** A shared React email canvas for hero, layout, and email use-case previews. */
export default function EmailTemplatePreview({
  kind = "welcome",
  className,
  accent = "#8b5cf6",
  selected = false,
  title,
  content,
  renderSection = (_, children) => children,
}: {
  kind?: EmailTemplateKind;
  className?: string;
  accent?: string;
  selected?: boolean;
  title?: ReactNode;
  content?: Partial<Record<"brand" | "body" | "cta", ReactNode>>;
  renderSection?: (
    section: EmailTemplateSection,
    children: ReactNode,
  ) => ReactNode;
}) {
  const template = emailTemplates[kind];
  const Icon = template.icon;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-sm bg-[#17121e] text-[#f3eaf8] [container-type:inline-size]",
        className,
      )}
    >
      <div className="px-[8%] pb-[7%] pt-[8%] text-center">
        {renderSection(
          "brand",
          <div className="mb-[8%] text-[4cqw] font-bold tracking-tight">
            {content?.brand ?? "YourBrand"}
            <span style={{ color: accent }}>.</span>
          </div>,
        )}
        {renderSection(
          "heading",
          <>
            <div className="text-[2.5cqw] font-semibold tracking-[0.16em] text-[#c99be6]">
              {template.eyebrow}
            </div>
            <div
              className={cn(
                "relative mt-[5%] text-[8cqw] font-semibold leading-[1.12] tracking-tight",
                selected &&
                  "outline outline-1 outline-offset-4 outline-[#a88af2]",
              )}
            >
              {title ?? template.title}
            </div>
          </>,
        )}
        {renderSection(
          "body",
          <p className="mt-[4%] text-[3.3cqw] leading-[1.7] text-[#b9a7c6]">
            {content?.body ?? template.body}
          </p>,
        )}
        {renderSection(
          "art",
          <div className="my-[7%] flex aspect-[2.1] items-center justify-center rounded-[2cqw] bg-[#30213f]">
            <div
              className="grid size-[22cqw] place-items-center rounded-[5cqw] bg-[#c99be6]/10 shadow-[0_2cqw_7cqw_#0003]"
              style={{ color: accent }}
            >
              <Icon className="size-[12cqw]" strokeWidth={1.25} />
            </div>
          </div>,
        )}
        {renderSection(
          "action",
          <>
            <p className="text-[3.1cqw] leading-relaxed text-[#b9a7c6]">
              {template.detail}
            </p>
            <div
              className="mt-[6%] flex items-center justify-center gap-[2cqw] rounded-[1.2cqw] px-[5%] py-[4%] text-[3.2cqw] font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              {content?.cta ?? template.cta}
              <ArrowRight className="size-[3cqw]" />
            </div>
          </>,
        )}
        {renderSection(
          "footer",
          <div className="mt-[8%] border-t border-[#35243f] pt-[5%] text-[2.2cqw] leading-[1.8] text-[#a28ead]">
            YourBrand · Made for your everyday
            <br />
            Manage preferences · Unsubscribe
          </div>,
        )}
      </div>
    </div>
  );
}
