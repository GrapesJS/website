"use client";

import { useRef, useState } from "react";
import cn from "classnames";
import { mdiCheckCircleOutline, mdiMinusCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { CircleHelp } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BillingPeriod,
  comparisonRows,
  ComparisonValue,
  FeatureTooltipContent,
  sdkPricingFaqs,
  sdkPricingPlans,
  SdkPricingPlan,
} from "./sdkPricingData";

const cardClass =
  "rounded-2xl border border-white/25 bg-[#27272777] backdrop-blur-sm";
const buttonBaseClass =
  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors";
const darkTextClass = "text-[#1b131b]";
const accentTextClass = "text-[#d39cdd]";
const accentBorderClass = "border-[#d39cdd]";
const accentButtonClass = `bg-[#d39cdd] ${darkTextClass} ${accentBorderClass} hover:bg-[#e4b9eb]`;
const accentBadgeClass = "border-[#d39cdd]/35 bg-[#d39cdd]/10 text-[#f1c0f8]";
const annualBadgeActiveClass = "border-[#e6c6ec] bg-[#f6e6f8] text-[#8f4b9c]";
const annualBadgeInactiveClass = accentTextClass;
const enterpriseBorderClass = "border-[#c98ad6]/70";
const tableShellClass =
  "relative rounded-2xl border border-white/10 bg-[#120d14]/85 shadow-[0_24px_80px_rgba(0,0,0,0.28)]";
const tableStickyHeaderClass = "md:sticky top-[97px] z-30";
const comparisonTableClass =
  "min-w-[920px] w-full table-fixed border-separate border-spacing-0";

function ComparisonColGroup() {
  return (
    <colgroup>
      <col style={{ width: "220px" }} />
      {sdkPricingPlans.map((plan) => (
        <col key={plan.id} style={{ width: "170px" }} />
      ))}
    </colgroup>
  );
}

function BillingToggle({
  selectedPeriod,
  onChange,
}: {
  selectedPeriod: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
}) {
  return (
    <div className="relative z-[2] inline-flex rounded-full border border-white/15 bg-white/5 p-1">
      {(["monthly", "annual"] as BillingPeriod[]).map((period) => {
        const isActive = period === selectedPeriod;
        return (
          <button
            key={period}
            type="button"
            onClick={() => onChange(period)}
            className={[
              "rounded-full px-4 py-2 text-sm font-semibold transition-colors md:px-5",
              isActive
                ? `bg-white ${darkTextClass}`
                : "text-white/75 hover:text-white",
            ].join(" ")}
          >
            {period === "monthly" ? (
              "Monthly"
            ) : (
              <span className="flex items-center gap-3 whitespace-nowrap leading-none">
                <span>Annual</span>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]",
                    accentBadgeClass,
                    isActive
                      ? annualBadgeActiveClass
                      : annualBadgeInactiveClass,
                  )}
                >
                  2 months free
                </span>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function PricingButton({
  href,
  label,
  subtle,
}: {
  href: string;
  label: string;
  subtle?: boolean;
}) {
  return (
    <a
      href={href}
      className={[
        buttonBaseClass,
        "w-full",
        subtle
          ? "border-white/25 bg-transparent text-white hover:border-white/45 hover:bg-white/5"
          : accentButtonClass,
      ].join(" ")}
    >
      {label}
    </a>
  );
}

function FeatureTooltip({
  label,
  content,
}: {
  label: string;
  content?: FeatureTooltipContent;
}) {
  if (!content) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={`More info about ${label}`}
          className="inline-flex shrink-0 items-center justify-center rounded-full text-white/35 transition-colors hover:text-white/70"
        >
          <CircleHelp className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="flex flex-col gap-2">
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

function CardFeatureItem({
  title,
  note,
  tooltip,
}: {
  title?: string;
  note?: string;
  tooltip?: FeatureTooltipContent;
}) {
  if (!title) {
    return <li className="min-h-6 md:min-h-7" aria-hidden="true" />;
  }

  return (
    <li className="flex items-start gap-3 text-sm leading-6 text-white/75 md:text-base">
      <Icon
        path={mdiCheckCircleOutline}
        size={0.8}
        className={cn("shrink-0 mt-0.5", accentTextClass)}
      />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span>{title}</span>
          <FeatureTooltip label={title} content={tooltip} />
        </div>
        {note ? (
          <span className="text-xs font-medium leading-5 text-white/45 md:text-sm">
            {note}
          </span>
        ) : null}
      </div>
    </li>
  );
}

function PlanSummary({
  plan,
  selectedPeriod,
  subtle,
  align = "center",
  className,
  actionClassName,
}: {
  plan: SdkPricingPlan;
  selectedPeriod: BillingPeriod;
  subtle?: boolean;
  align?: "center" | "left";
  className?: string;
  actionClassName?: string;
}) {
  const isLeft = align === "left";

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isLeft ? "items-start text-left" : "items-center text-center",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-4",
          isLeft ? "justify-start" : "justify-center",
        )}
      >
        <div className="relative h-12 w-12 overflow-visible">
          <img
            loading="lazy"
            src={plan.icon}
            alt={`${plan.name} plan icon`}
            className="absolute -right-3 -top-3 h-[62px] w-[62px] max-w-none"
          />
        </div>
        <h3 className={cn("text-xl font-semibold", accentTextClass)}>
          {plan.name}
        </h3>
      </div>

      <div
        className={cn(
          "flex flex-col gap-3",
          isLeft ? "items-start text-left" : "items-center text-center",
        )}
      >
        <p className="flex items-end gap-1 text-[42px] font-bold leading-none tracking-[-0.02em] text-white md:text-6xl">
          <span>{plan.price[selectedPeriod]}</span>
          {plan.priceSuffix?.[selectedPeriod] ? (
            <span className="pb-1 text-base font-semibold tracking-normal text-white/65 md:text-lg">
              {plan.priceSuffix[selectedPeriod]}
            </span>
          ) : null}
        </p>
        <p className="text-base leading-6 text-white/70">{plan.description}</p>
      </div>

      <div className={cn("w-full mt-3", actionClassName)}>
        <PricingButton
          href={plan.cta.href}
          label={plan.cta.label}
          subtle={subtle}
        />
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  selectedPeriod,
  enterprise,
}: {
  plan: SdkPricingPlan;
  selectedPeriod: BillingPeriod;
  enterprise?: boolean;
}) {
  if (enterprise) {
    return (
      <article
        className={cn(
          "overflow-hidden rounded-[28px] border-2 shadow-[0_24px_80px_rgba(0,0,0,0.3)]",
          enterpriseBorderClass,
        )}
        style={{
          backgroundColor: "#111111",
          backgroundImage:
            "radial-gradient(140% 120% at 100% 0%, rgba(176, 106, 196, 0.55) 0%, rgba(176, 106, 196, 0.16) 34%, rgba(0, 0, 0, 0) 60%)",
        }}
      >
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <div className="flex px-10 pb-12 pt-14 md:px-12">
            <PlanSummary
              plan={plan}
              selectedPeriod={selectedPeriod}
              align="left"
              className="w-full self-stretch"
              actionClassName="max-w-[520px]"
            />
          </div>

          <div className="flex flex-col gap-8 border-t border-white/20 px-10 pb-12 pt-10 md:border-t-0 md:px-12">
            <div className="flex flex-col gap-6">
              {plan.includes ? (
                <p className="text-sm leading-7 text-white/70 md:text-base">
                  Everything in{" "}
                  <strong className="capitalize text-white">
                    {plan.includes}
                  </strong>{" "}
                  plus...
                </p>
              ) : null}
              {plan.preList ? (
                <p className="text-sm leading-7 text-white/70 md:text-base">
                  {plan.preList}
                </p>
              ) : null}
            </div>
            <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
              {plan.cardFeatures.map((feature, index) => (
                <CardFeatureItem
                  key={`${plan.id}-feature-${index}`}
                  title={feature?.title}
                  note={feature?.note}
                  tooltip={feature?.tooltip}
                />
              ))}
            </ul>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cardClass}>
      <div>
        <div className="p-6 md:p-8">
          <PlanSummary
            plan={plan}
            selectedPeriod={selectedPeriod}
            subtle={plan.id === "free"}
            className="pt-6"
          />
        </div>

        <div className="h-px w-full bg-white/20" />

        <div className="flex flex-col gap-3 p-6 md:p-8">
          {plan.includes ? (
            <p className="text-sm leading-6 text-white/70 md:text-base">
              Everything in{" "}
              <strong className="capitalize text-white">{plan.includes}</strong>{" "}
              plus...
            </p>
          ) : null}
          {plan.preList ? (
            <p className="text-sm leading-6 text-white/70 md:text-base">
              {plan.preList}
            </p>
          ) : null}
          <ul className="grid gap-y-4 pt-3">
            {plan.cardFeatures.map((feature, index) => (
              <CardFeatureItem
                key={`${plan.id}-feature-${index}`}
                title={feature?.title}
                note={feature?.note}
                tooltip={feature?.tooltip}
              />
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function ComparisonCell({ value }: { value: ComparisonValue }) {
  if (typeof value === "boolean") {
    return value ? (
      <Icon
        path={mdiCheckCircleOutline}
        size={0.95}
        className="text-emerald-300"
      />
    ) : (
      <Icon
        path={mdiMinusCircleOutline}
        size={0.95}
        className="text-white/35"
      />
    );
  }

  const isHighlightedValue = value === "Custom" || value === "Unlimited";
  return (
    <span
      className={[
        "text-sm leading-6 md:text-base",
        isHighlightedValue
          ? `inline-flex rounded-full border px-3 py-1 font-semibold ${accentBadgeClass}`
          : "text-white/75",
      ].join(" ")}
    >
      {value}
    </span>
  );
}

function ComparisonTable() {
  const headerScrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={tableShellClass}>
      <div
        ref={headerScrollRef}
        className={cn(tableStickyHeaderClass, "overflow-hidden rounded-t-2xl")}
      >
        <table aria-hidden="true" className={comparisonTableClass}>
          <ComparisonColGroup />
          <thead>
            <tr>
              <th className="border-b border-white/10 bg-[#120d14]/95 px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.18em] text-white/55 shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur">
                Feature
              </th>
              {sdkPricingPlans.map((plan) => (
                <th
                  key={plan.id}
                  className="border-b border-white/10 bg-[#120d14]/95 px-5 py-4 text-left shadow-[inset_0_-1px_0_rgba(255,255,255,0.1)] backdrop-blur"
                >
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "text-sm font-semibold uppercase tracking-[0.14em]",
                        accentTextClass,
                      )}
                    >
                      {plan.name}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div
        className="overflow-x-auto"
        onScroll={(event) => {
          if (headerScrollRef.current) {
            headerScrollRef.current.scrollLeft = event.currentTarget.scrollLeft;
          }
        }}
      >
        <table className={comparisonTableClass}>
          <ComparisonColGroup />
          <thead className="sr-only">
            <tr>
              <th>Feature</th>
              {sdkPricingPlans.map((plan) => (
                <th key={plan.id}>{plan.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, index) => (
              <tr
                key={row.key}
                className={
                  index % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
                }
              >
                <th className="border-b border-white/10 px-5 py-4 text-left text-sm font-medium text-white md:text-base">
                  <div className="flex items-center gap-2">
                    <span>{row.label}</span>
                    <FeatureTooltip label={row.label} content={row.tooltip} />
                  </div>
                </th>
                {sdkPricingPlans.map((plan) => (
                  <td
                    key={`${plan.id}-${row.key}`}
                    className="border-b border-white/10 px-5 py-4 align-middle"
                  >
                    <ComparisonCell value={plan.comparison[row.key]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PricingContent() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<BillingPeriod>("monthly");
  const standardPlans = sdkPricingPlans.filter(
    (plan) => plan.id !== "enterprise",
  );
  const enterprisePlan = sdkPricingPlans.find(
    (plan) => plan.id === "enterprise",
  );
  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex flex-col gap-12 md:gap-16">
        <section className="flex flex-col items-center gap-4 text-center">
          <BillingToggle
            selectedPeriod={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </section>

        <section className="space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {standardPlans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                selectedPeriod={selectedPeriod}
              />
            ))}
          </div>
          {enterprisePlan ? (
            <PlanCard
              plan={enterprisePlan}
              selectedPeriod={selectedPeriod}
              enterprise
            />
          ) : null}
        </section>

        <section className="flex flex-col gap-14">
          <div className="text-center flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-white md:text-5xl">
              Compare plan details
            </h2>
            <p className="text-base leading-7 text-white/70 md:text-lg">
              Review the exact usage limits, overage pricing, and support levels
              across every SDK plan.
            </p>
          </div>
          <ComparisonTable />
        </section>

        <section className="grid gap-8 pt-6 md:pt-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="flex flex-col items-center gap-4 text-center lg:sticky lg:top-[140px] lg:items-start lg:text-left">
            <h2 className="text-3xl font-semibold text-white md:text-5xl leading-snug">
              Frequently asked questions
            </h2>
            <p className="max-w-xl text-base leading-7 text-white/70 md:text-lg">
              Answers to the most common questions we get about usage, storage,
              and plan flexibility.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-0">
            <Accordion type="single" collapsible className="w-full">
              {sdkPricingFaqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value}>
                  <AccordionTrigger className="px-6 md:px-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 md:px-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
