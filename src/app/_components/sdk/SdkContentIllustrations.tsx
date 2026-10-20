"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import {
  Backpack,
  Check,
  ChevronDown,
  CodeXml,
  Columns2,
  Headphones,
  LampDesk,
  LayoutTemplate,
  Monitor,
  MousePointer2,
  Package,
  Search,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CanvasToolbar,
  EditorSidebar,
  PanelSection,
  editorShellText,
  editorShellTheme,
} from "../layouts/EditorShell";
import {
  Illustration,
  type IllustrationProps,
  type IllustrationState,
} from "./SdkIllustrations";
import { theme } from "./theme";

function FeatureEditor({
  activeIndex,
  className,
  children,
}: {
  activeIndex: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        editorShellTheme,
        editorShellText,
        theme.illustrations.editorFrame,
        className,
      )}
    >
      <EditorSidebar activeIndex={activeIndex} />
      <div className="flex min-h-0 min-w-0 flex-col">{children}</div>
    </div>
  );
}

function PanelHeader({ children }: { children: ReactNode }) {
  return (
    <div className={theme.illustrations.panelHeader}>
      {children}
      <X size={12} />
    </div>
  );
}

function CompactToolbar() {
  return (
    <CanvasToolbar
      withDevice={false}
      rightContent={
        <span className="flex items-center gap-1">
          <Monitor size={9} /> Desktop
        </span>
      }
    />
  );
}

function ProductBlock({
  thumbnail = false,
  selected = false,
}: {
  thumbnail?: boolean;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center gap-2 rounded-sm bg-[#30213f] p-2 text-[#f1e7f7]",
        selected && "outline outline-1 outline-offset-2 outline-[#a88af2]",
      )}
    >
      {selected && (
        <span className="absolute -left-0.5 -top-4 rounded-t-sm bg-[#8b5cf6] px-1 py-0.5 text-[7px] text-white">
          Product card
        </span>
      )}
      <div className="flex aspect-square w-[28%] shrink-0 items-center justify-center rounded-sm bg-[#a37bc5]/15">
        <Headphones className="w-2/3 text-[#c6a1e3]" strokeWidth={1.3} />
      </div>
      <div className="min-w-0 flex-1">
        {thumbnail ? (
          <div className="space-y-1">
            <div className="h-1 w-full rounded bg-[#d4badf]/60" />
            <div className="h-1 w-1/2 rounded bg-[#d4badf]/30" />
          </div>
        ) : (
          <>
            <div className="text-[clamp(7px,1.8cqw,10px)] font-semibold">
              Studio headphones
            </div>
            <div className="mt-1 text-[8px] text-[#c9afd8]">$129</div>
            <div className="mt-2 inline-block rounded-sm bg-[#8b5cf6] px-2 py-1 text-[7px] text-white">
              Shop now
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function BlocksFrame({ step, reduced }: IllustrationState) {
  return (
    <FeatureEditor
      activeIndex={0}
      className={theme.illustrations.pairedViewport}
    >
      <div className="relative grid h-full min-h-0 grid-cols-[42%_minmax(0,1fr)]">
        <div className={theme.illustrations.editorPanel}>
          <PanelHeader>Blocks</PanelHeader>
          <div className="space-y-2 p-2">
            <div className="flex rounded-full bg-[#45404e] p-0.5 text-center text-[8px]">
              <span className="w-1/2 rounded-full bg-[color:var(--editor-bg)] py-1 text-[#b99bea]">
                Regular
              </span>
              <span className="w-1/2 py-1">Symbols</span>
            </div>
            <div
              className={cn(
                theme.illustrations.panelInput,
                "text-[8px] text-[#908a9c]",
              )}
            >
              <Search size={9} /> Search...
            </div>
          </div>
          <PanelSection label="Basic" open />
          <div className="grid grid-cols-2 gap-1.5 p-2">
            {[
              { icon: Columns2, label: "Columns" },
              { icon: Type, label: "Text" },
              { icon: LayoutTemplate, label: "Section" },
              { icon: Package, label: "Button" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-1 rounded-sm border border-[color:var(--editor-border)] py-1.5 text-[8px]"
              >
                <Icon size={15} strokeWidth={1.4} />
                {label}
              </div>
            ))}
          </div>
          <PanelSection label="Your components" open />
          <div className="space-y-2 p-2 pb-1">
            <div
              className={cn(
                "rounded-sm border p-1",
                step > 0
                  ? "border-[#a88af2]"
                  : "border-[color:var(--editor-border)]",
              )}
            >
              <ProductBlock thumbnail />
              <div className="mt-1 text-center text-[8px]">Product card</div>
            </div>
            <div className="rounded-sm border border-[color:var(--editor-border)] p-1">
              <div className="flex h-8 items-center justify-between rounded-sm bg-[#673a8d] px-2">
                <span className="h-1 w-1/2 rounded bg-white/60" />
                <span className="h-2 w-1/4 rounded-full bg-[#e9d5ff]" />
              </div>
              <div className="mt-1 text-center text-[8px]">Promo banner</div>
            </div>
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-col">
          <CompactToolbar />
          <div className={theme.illustrations.templateCanvas}>
            <div className="h-full rounded-sm bg-[#17121e] p-[10%] text-[#f1e7f7]">
              <div className="text-[8px] font-bold">
                YourBrand<span className="text-[#b99bea]">.</span>
              </div>
              <div className="mb-3 mt-7 text-[clamp(15px,4cqw,23px)] font-semibold leading-tight tracking-tight">
                Your next
                <br />
                favorite.
              </div>
              <div className="mb-7 space-y-1">
                <div className="h-1 w-full rounded bg-[#705b7e]/60" />
                <div className="h-1 w-2/3 rounded bg-[#705b7e]/60" />
              </div>
              {step < 2 ? (
                <div
                  className={cn(
                    "flex h-24 items-center justify-center rounded-sm border border-dashed",
                    step === 1
                      ? "border-[#a88af2] bg-[#8b5cf6]/10"
                      : "border-[#554162]",
                  )}
                >
                  <span className="text-[8px] text-[#a38db4]">
                    Drop a block here
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.3 }}
                >
                  <ProductBlock selected />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {step === 1 && (
          <motion.div
            className="absolute z-10 w-[28%] rounded-sm border border-[#b99bea] bg-[#201a2b] p-1.5 shadow-lg"
            initial={{ left: "8%", top: "57%", opacity: 0 }}
            animate={{
              left: ["8%", "8%", "65%", "65%"],
              top: ["57%", "57%", "57%", "57%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: reduced ? 0 : 1.4,
              times: [0, 0.15, 0.85, 1],
            }}
          >
            <ProductBlock thumbnail />
            <MousePointer2
              size={16}
              className="absolute -bottom-3 -right-2 fill-[#e9d5ff] text-[#24172f]"
            />
          </motion.div>
        )}
      </div>
    </FeatureEditor>
  );
}

export function CustomBlocksIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      label="Build with your own blocks and components"
      steps={[
        "Offer built-in and custom blocks",
        "Drag a custom component onto the page",
        "Keep editing on the canvas",
      ]}
      stepDurations={[2600, 1600, 3200]}
      withControls={withControls}
      className="[container-type:inline-size]"
    >
      {(state) => <BlocksFrame {...state} />}
    </Illustration>
  );
}

const brandStyles = [
  {
    primary: "#8b5cf6",
    secondary: "#30213f",
    accent: "#d8b4fe",
    font: "Arial",
  },
  {
    primary: "#ba4a9c",
    secondary: "#30213f",
    accent: "#f0b1df",
    font: "Arial",
  },
  {
    primary: "#ba4a9c",
    secondary: "#30213f",
    accent: "#f0b1df",
    font: "Georgia",
  },
];

function StyleValue({
  label,
  value,
  color,
  active = false,
}: {
  label: string;
  value: string;
  color?: string;
  active?: boolean;
}) {
  return (
    <div className="grid grid-cols-[0.85fr_1.15fr] items-center gap-1 px-2 py-0.5 text-[clamp(7px,1.8cqw,9px)]">
      <span>{label}</span>
      <div
        className={cn(
          theme.illustrations.panelInput,
          "px-1",
          active && "border-[#a88af2]",
        )}
      >
        {color && (
          <span
            className="size-2 shrink-0 rounded-sm"
            style={{ backgroundColor: color }}
          />
        )}
        <span className="min-w-0 truncate">{value}</span>
      </div>
    </div>
  );
}

function GlobalStylesFrame({ step }: IllustrationState) {
  const brand = brandStyles[step];
  return (
    <FeatureEditor
      activeIndex={2}
      className={theme.illustrations.pairedViewport}
    >
      <div className="grid h-full min-h-0 grid-cols-[44%_minmax(0,1fr)]">
        <div className={theme.illustrations.editorPanel}>
          <PanelHeader>Global Styles</PanelHeader>
          <PanelSection label="Colors" open />
          <div className="py-1">
            <StyleValue
              label="Primary"
              value={brand.primary}
              color={brand.primary}
              active={step === 1}
            />
            <StyleValue
              label="Secondary"
              value={brand.secondary}
              color={brand.secondary}
            />
            <StyleValue
              label="Accent"
              value={brand.accent}
              color={brand.accent}
              active={step === 1}
            />
          </div>
          <PanelSection label="Body" open />
          <div className="py-1">
            <StyleValue label="Background" value="#17121e" color="#17121e" />
            <StyleValue label="Font Size" value="16" />
            <StyleValue label="Line Height" value="1.65" />
            <StyleValue
              label="Font Family"
              value={brand.font}
              active={step === 2}
            />
          </div>
          <PanelSection label="Heading" open />
          <div className="py-1">
            <StyleValue
              label="Color"
              value={brand.accent}
              color={brand.accent}
            />
            <StyleValue
              label="Font Family"
              value={brand.font}
              active={step === 2}
            />
            <StyleValue label="Weight" value="600" />
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-col">
          <CompactToolbar />
          <div className={theme.illustrations.templateCanvas}>
            <div
              className="h-full rounded-sm bg-[#17121e] p-[10%] text-[#f1e7f7]"
              style={
                {
                  "--brand-primary": brand.primary,
                  "--brand-accent": brand.accent,
                  fontFamily: brand.font,
                } as CSSProperties
              }
            >
              <div className="border-b border-white/10 pb-4 text-[8px] font-bold">
                YourBrand
                <span className="text-[color:var(--brand-accent)]">.</span>
              </div>
              <div className="mt-6 text-[clamp(15px,4cqw,24px)] font-semibold leading-tight tracking-tight">
                Your brand.
                <br />
                <span className="text-[color:var(--brand-accent)] transition-colors duration-500 motion-reduce:transition-none">
                  Every detail.
                </span>
              </div>
              <p className="mt-3 text-[8px] leading-relaxed text-[#b6a9c1]">
                A shared style for everything you create.
              </p>
              <div className="mt-4 inline-block rounded-sm bg-[color:var(--brand-primary)] px-2 py-1.5 text-[7px] text-white transition-colors duration-500 motion-reduce:transition-none">
                Start creating
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2">
                {["Discover", "Create"].map((label) => (
                  <div
                    key={label}
                    className="rounded-sm border border-white/10 p-2"
                  >
                    <Sparkles
                      size={12}
                      className="mb-2 text-[color:var(--brand-accent)] transition-colors duration-500 motion-reduce:transition-none"
                    />
                    <span className="text-[7px]">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FeatureEditor>
  );
}

export function GlobalStylesIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      label="Create projects with a shared brand design system"
      steps={[
        "Start with shared brand styles",
        "Update shared brand colors across the page",
        "Apply shared typography",
      ]}
      withControls={withControls}
      className="[container-type:inline-size]"
    >
      {(state) => <GlobalStylesFrame {...state} />}
    </Illustration>
  );
}

const customerOffers = [
  {
    name: "Ava Stone",
    firstName: "Ava",
    product: "Studio headphones",
    price: "$129",
    offer: "20% off",
    icon: Headphones,
  },
  {
    name: "Leo Martin",
    firstName: "Leo",
    product: "Everyday backpack",
    price: "$89",
    offer: "Free delivery",
    icon: Backpack,
  },
  {
    name: "Mia Chen",
    firstName: "Mia",
    product: "Desk lamp",
    price: "$59",
    offer: "15% off",
    icon: LampDesk,
  },
];

function DataSourcesFrame({ step, reduced, selectStep }: IllustrationState) {
  const record = customerOffers[Math.max(0, step - 1)];
  const ProductIcon = step === 0 ? Package : record.icon;
  return (
    <FeatureEditor activeIndex={4}>
      <div className="grid min-w-0 sm:h-[440px] sm:grid-cols-[34%_minmax(0,1fr)]">
        <div
          className={cn(
            theme.illustrations.editorPanel,
            "border-b sm:border-b-0",
          )}
        >
          <PanelHeader>Data sources</PanelHeader>
          <div className="flex items-center justify-between border-b border-[color:var(--editor-border)] px-3 py-2 text-[9px]">
            <span className="flex items-center gap-1.5">
              <ChevronDown size={10} /> Customer offers
            </span>
            <span className="text-[#887e96]">3 records</span>
          </div>
          <table className="w-full table-fixed text-left text-[8px] lg:text-[9px]">
            <caption className="sr-only">
              Customer offers used in the newsletter preview
            </caption>
            <thead className="bg-[color:var(--editor-raised)] text-[#c4b6d1]">
              <tr>
                <th className="w-[29%] px-2 py-2 font-normal">Customer</th>
                <th className="w-[43%] px-2 py-2 font-normal">Product</th>
                <th className="px-2 py-2 font-normal">Offer</th>
              </tr>
            </thead>
            <tbody>
              {customerOffers.map((item, index) => (
                <tr
                  key={item.name}
                  data-preview-record={index}
                  className={cn(
                    "border-b border-white/5 transition-colors",
                    step === index + 1 && "bg-[#8b5cf6]/20 text-[#e1cbf1]",
                  )}
                >
                  <td
                    className={cn(
                      "border-l-2 px-2 py-2.5",
                      step === index + 1
                        ? "border-[#a88af2]"
                        : "border-transparent",
                    )}
                  >
                    {item.name}
                  </td>
                  <td className="px-2 py-2.5">
                    {item.product}
                    <span className="mt-0.5 block text-[#8f849f]">
                      {item.price}
                    </span>
                  </td>
                  <td className="px-2 py-2.5">{item.offer}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-3">
            <div className="mb-2 flex items-center gap-1.5 text-[9px]">
              <CodeXml size={11} />
              Your template syntax
            </div>
            <div className="mb-2 text-[8px] text-[#95879f]">
              Configured importer · Handlebars
            </div>
            <pre className="overflow-hidden whitespace-pre-wrap break-words rounded-sm bg-[#191520] p-2 font-mono text-[9px] leading-[1.7] text-[#c3a5da]">
              <code>
                {
                  "Hi {{ customer.firstName }},\n{{ product.name }}\n{{ product.price }} · {{ offer }}"
                }
              </code>
            </pre>
            <div className="mt-2 flex items-center gap-1.5 text-[8px] text-[#b4a6c1]">
              {step > 0 ? (
                <>
                  <Check size={10} className="text-[#9ec0ac]" />
                  Editable data fields
                </>
              ) : (
                <>
                  <CodeXml size={10} />
                  Import template bindings
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 flex-col">
          <div className="[--editor-unit:16px]">
            <CanvasToolbar
              withDevice={false}
              rightContent={
                <label className="pointer-events-auto flex items-center gap-2 text-[9px]">
                  <span className="hidden sm:inline">Preview</span>
                  <select
                    aria-label="Preview customer"
                    className="max-w-[136px] rounded-sm border border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] px-1.5 py-1 text-[10px] text-[#e6dcec] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#b494f4]"
                    value={step}
                    onFocus={() => selectStep(step)}
                    onChange={(event) => selectStep(Number(event.target.value))}
                  >
                    <option value={0}>Template fields</option>
                    {customerOffers.map((item, index) => (
                      <option key={item.name} value={index + 1}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              }
            />
          </div>
          <div
            className={cn(
              theme.illustrations.templateCanvas,
              "flex min-h-[360px] flex-col sm:min-h-0",
            )}
          >
            <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col rounded-sm bg-[#17121e] px-4 py-4 text-[#eee4f5] sm:px-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[9px]">
                <span className="font-bold">
                  YourBrand<span className="text-[#c49cde]">.</span>
                </span>
                <span className="text-[7px] uppercase tracking-widest text-[#9885a8]">
                  Picked for you
                </span>
              </div>
              <motion.div
                key={step}
                data-newsletter-preview={step}
                initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduced ? 0 : 0.25 }}
                className="flex flex-1 flex-col pt-4"
              >
                <div className="text-[clamp(15px,2.3cqw,21px)] font-semibold leading-tight">
                  {step === 0 ? (
                    <span className="border-b border-dotted border-[#b494f4] text-[12px] text-[#c8a9e5] sm:text-[18px]">
                      {"Hi {{ customer.firstName }},"}
                    </span>
                  ) : (
                    `Hi ${record.firstName},`
                  )}
                </div>
                <p className="mt-2 text-[10px] text-[#a99ab5]">
                  A little upgrade for your everyday.
                </p>
                <div className="mt-4 flex min-h-[88px] flex-1 items-center justify-center rounded-sm border border-[#b494f4]/15 bg-[#30213f]/50">
                  <ProductIcon
                    size={64}
                    strokeWidth={1.15}
                    className="text-[#c8a2e4]"
                  />
                </div>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div className="min-w-0 text-[12px] font-semibold">
                    {step === 0 ? "{{ product.name }}" : record.product}
                    <div className="mt-1 text-[10px] font-normal text-[#bc9ed0]">
                      {step === 0 ? "{{ product.price }}" : record.price}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-sm bg-[#8b5cf6]/20 px-2 py-1 text-[9px] text-[#d5bbf0]">
                    {step === 0 ? "{{ offer }}" : record.offer}
                  </span>
                </div>
                <div className="mt-4 rounded-sm bg-[#8b5cf6] px-3 py-2 text-center text-[9px] font-semibold text-white">
                  Explore your offer
                </div>
              </motion.div>
            </div>
            <div className="pt-2 text-center text-[8px] text-[#a195af]">
              {step === 0
                ? "Template fields · ready to connect"
                : `Previewing ${record.name} · live data`}
            </div>
          </div>
        </div>
      </div>
    </FeatureEditor>
  );
}

export function DataSourcesIllustration({
  withControls = false,
}: IllustrationProps = {}) {
  return (
    <Illustration
      label="Preview personalized newsletters with your data"
      steps={[
        "Import your template syntax",
        "Preview Ava’s offer",
        "Preview Leo’s offer",
        "Preview Mia’s offer",
      ]}
      stepDurations={[2400, 2800, 2800, 2800]}
      interactive
      withControls={withControls}
      className="[container-type:inline-size]"
    >
      {(state) => <DataSourcesFrame {...state} />}
    </Illustration>
  );
}
