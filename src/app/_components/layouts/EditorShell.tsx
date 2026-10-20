import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CodeXml,
  Crosshair,
  Database,
  EllipsisVertical,
  FileStack,
  Frame,
  Image as ImageIcon,
  Layers,
  Maximize,
  Menu,
  Mic,
  Monitor,
  MoveVertical,
  PanelTop,
  Play,
  Plus,
  Redo2,
  Save,
  Sparkles,
  SquareDashed,
  SquarePlus,
  SwatchBook,
  Tag,
  Type,
  Trash2,
  X,
  Undo2,
} from "lucide-react";
import type { ReactNode } from "react";

// The hero uses container units; smaller demos can set --editor-unit explicitly.
export const editorShellTheme =
  "[--editor-bg:#201e2a] [--editor-raised:#2b2739] [--editor-canvas:#292534] [--editor-border:#494251] [--editor-text:#a7a4b3]";
export const editorShellText =
  "font-[Arial,Helvetica,sans-serif] text-[calc(0.7*var(--editor-unit,1cqw))] font-normal leading-normal text-[color:var(--editor-text)] [&_svg]:shrink-0";

const layerRows = [
  { name: "Body", depth: 0, icon: PanelTop, open: true },
  { name: "Header", depth: 1, icon: SquareDashed, open: true },
  { name: "Your logo", depth: 2, icon: Type },
  { name: "Menu", depth: 2, icon: Menu },
  { name: "Button", depth: 2, icon: SquareDashed },
  { name: "Hero section", depth: 1, icon: SquareDashed, open: true },
  { name: "Container", depth: 2, icon: SquareDashed, open: true },
  { name: "Heading", depth: 3, icon: Type, open: true },
  { name: "Text", depth: 4, icon: Type, selected: true },
  { name: "Subtitle", depth: 3, icon: Type },
  { name: "Button", depth: 3, icon: SquareDashed },
  { name: "Image", depth: 3, icon: ImageIcon },
  { name: "Feature left section", depth: 1, icon: SquareDashed },
  { name: "Features grid section", depth: 1, icon: SquareDashed },
  { name: "Testimonial section", depth: 1, icon: SquareDashed },
  { name: "Banner section", depth: 1, icon: SquareDashed },
  { name: "Footer section", depth: 1, icon: SquareDashed },
];

// Retained for layouts that show the page and layer managers.
export function PagesPanel({
  withLayers = true,
}: { withLayers?: boolean } = {}) {
  return (
    <div className="min-w-0 border-r-[calc(0.075*var(--editor-unit,1cqw))] border-[#494251] bg-[color:var(--editor-bg)]">
      <div className="flex h-[calc(2.1*var(--editor-unit,1cqw))] items-center gap-[calc(0.45*var(--editor-unit,1cqw))] px-[calc(0.7*var(--editor-unit,1cqw))] text-[calc(0.8*var(--editor-unit,1cqw))] font-semibold">
        <FileStack className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
        <span className="flex-1">Pages</span>
        <Plus className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
        <ChevronUp className="ml-[calc(0.3*var(--editor-unit,1cqw))] size-[calc(0.85*var(--editor-unit,1cqw))]" />
      </div>
      {["Home", "About", "Contact"].map((page, index) => (
        <div
          key={page}
          className={cn(
            "flex h-[calc(1.85*var(--editor-unit,1cqw))] items-center justify-between px-[calc(1*var(--editor-unit,1cqw))]",
            index === 0 && "bg-[#a88af2] text-white",
          )}
        >
          <span>{page}</span>
          <EllipsisVertical className="size-[calc(0.8*var(--editor-unit,1cqw))] opacity-70" />
        </div>
      ))}
      {withLayers && (
        <>
          <div className="mt-[calc(0.75*var(--editor-unit,1cqw))] flex h-[calc(2.1*var(--editor-unit,1cqw))] items-center gap-[calc(0.5*var(--editor-unit,1cqw))] border-y-[calc(0.05*var(--editor-unit,1cqw))] border-[#35313f] px-[calc(0.7*var(--editor-unit,1cqw))] text-[calc(0.8*var(--editor-unit,1cqw))] font-semibold">
            <Layers className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
            <span className="flex-1">Layers</span>
            <ChevronUp className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
          </div>
          <div className="pt-[calc(0.15*var(--editor-unit,1cqw))]">
            {layerRows.map(({ name, depth, icon: Icon, open, selected }) => (
              <div
                key={`${depth}-${name}`}
                className={cn(
                  "flex h-[calc(1.55*var(--editor-unit,1cqw))] items-center gap-[calc(0.4*var(--editor-unit,1cqw))] whitespace-nowrap pr-[calc(0.3*var(--editor-unit,1cqw))]",
                  selected && "bg-[#a88af2]/20 text-[#c5adff]",
                )}
                style={{
                  paddingLeft: `calc(${0.45 + depth * 0.52} * var(--editor-unit, 1cqw))`,
                }}
              >
                {open ? (
                  <ChevronDown className="size-[calc(0.65*var(--editor-unit,1cqw))]" />
                ) : depth <= 1 ? (
                  <ChevronRight className="size-[calc(0.65*var(--editor-unit,1cqw))]" />
                ) : (
                  <span className="w-[calc(0.65*var(--editor-unit,1cqw))] shrink-0" />
                )}
                <Icon className="size-[calc(0.75*var(--editor-unit,1cqw))]" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function EditorSidebar({
  activeIndex = 5,
}: { activeIndex?: number } = {}) {
  return (
    <div className="flex min-h-0 flex-col items-center border-r-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] py-[calc(0.45*var(--editor-unit,1cqw))] text-[color:var(--editor-text)]">
      <div className="flex flex-col items-center gap-[calc(0.5*var(--editor-unit,1cqw))]">
        {[SquarePlus, Layers, SwatchBook, ImageIcon, Database, Sparkles].map(
          (Icon, index) => (
            <span
              key={index}
              className={cn(
                "flex h-[calc(1.65*var(--editor-unit,1cqw))] w-[calc(2*var(--editor-unit,1cqw))] items-center justify-center rounded-[calc(0.18*var(--editor-unit,1cqw))]",
                index === activeIndex && "bg-[#8b5cf6] text-white",
              )}
            >
              <Icon
                className="size-[calc(0.95*var(--editor-unit,1cqw))]"
                fill={Icon === Sparkles ? "currentColor" : "none"}
                strokeWidth={1.8}
              />
            </span>
          ),
        )}
      </div>
    </div>
  );
}

export function CanvasToolbar() {
  return (
    <div className="relative flex h-[calc(2.1*var(--editor-unit,1cqw))] shrink-0 items-center justify-between border-b-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] px-[calc(0.45*var(--editor-unit,1cqw))] text-[color:var(--editor-text)]">
      <div className="flex h-[calc(1.6*var(--editor-unit,1cqw))] items-center gap-[calc(0.4*var(--editor-unit,1cqw))] rounded-[calc(0.18*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] px-[calc(0.5*var(--editor-unit,1cqw))] text-[calc(0.75*var(--editor-unit,1cqw))]">
        <CodeXml className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
        <span>Code</span>
      </div>
      <div className="absolute left-1/2 flex h-[calc(1.5*var(--editor-unit,1cqw))] -translate-x-1/2 items-center gap-[calc(0.4*var(--editor-unit,1cqw))] rounded-[calc(0.2*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] px-[calc(0.5*var(--editor-unit,1cqw))]">
        <Monitor className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
        <span>Desktop</span>
        <ChevronDown className="size-[calc(0.7*var(--editor-unit,1cqw))]" />
      </div>
      <div className="flex items-center gap-[calc(0.75*var(--editor-unit,1cqw))]">
        {[Maximize, Save, Undo2, Redo2, Play].map((Icon, index) => (
          <Icon
            key={index}
            className="size-[calc(0.85*var(--editor-unit,1cqw))]"
            strokeWidth={2.1}
          />
        ))}
      </div>
    </div>
  );
}

export function PropertyField({
  label,
  children,
  adjustable,
  highlighted,
}: {
  label: string;
  children: ReactNode;
  adjustable?: boolean;
  highlighted?: boolean;
}) {
  return (
    <div className="min-w-0">
      <div
        className={cn(
          "mb-[calc(0.3*var(--editor-unit,1cqw))] leading-[1.1]",
          highlighted && "text-[#b79be8]",
        )}
      >
        {label}
        {highlighted && (
          <span className="ml-[calc(0.35*var(--editor-unit,1cqw))]">×</span>
        )}
      </div>
      <div className="flex h-[calc(1.6*var(--editor-unit,1cqw))] min-w-0 items-center gap-[calc(0.3*var(--editor-unit,1cqw))] rounded-[calc(0.18*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] px-[calc(0.45*var(--editor-unit,1cqw))] text-[color:var(--editor-text)]">
        {adjustable && (
          <MoveVertical className="size-[calc(0.65*var(--editor-unit,1cqw))] text-[#6c6679]" />
        )}
        <span className="flex min-w-0 flex-1 items-center gap-[calc(0.35*var(--editor-unit,1cqw))] truncate">
          {children}
        </span>
        <ChevronDown className="size-[calc(0.65*var(--editor-unit,1cqw))]" />
      </div>
    </div>
  );
}

export function PanelSection({
  label,
  open,
}: {
  label: string;
  open?: boolean;
}) {
  return (
    <div className="flex h-[calc(1.8*var(--editor-unit,1cqw))] items-center justify-between border-y-[calc(0.025*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] bg-[color:var(--editor-raised)] px-[calc(0.65*var(--editor-unit,1cqw))] text-[calc(0.8*var(--editor-unit,1cqw))]">
      <span className="flex items-center gap-[calc(0.35*var(--editor-unit,1cqw))]">
        {label}
        {open && (
          <span className="size-[calc(0.23*var(--editor-unit,1cqw))] rounded-full bg-[#ae88ed]" />
        )}
      </span>
      {open ? (
        <ChevronUp className="size-[calc(0.75*var(--editor-unit,1cqw))]" />
      ) : (
        <ChevronDown className="size-[calc(0.75*var(--editor-unit,1cqw))]" />
      )}
    </div>
  );
}

export function StylesPanel({
  brand = false,
  selected = false,
  compact = false,
  color,
}: {
  brand?: boolean;
  selected?: boolean;
  compact?: boolean;
  color?: string;
} = {}) {
  return (
    <div className="min-w-0 overflow-hidden border-l-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] text-[color:var(--editor-text)]">
      <div className="flex h-[calc(2.1*var(--editor-unit,1cqw))] border-b-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] font-semibold">
        <div className="flex w-1/2 items-center justify-center border-b-[calc(0.08*var(--editor-unit,1cqw))] border-[#b494f4] text-[#b494f4]">
          Styles
        </div>
        <div className="flex w-1/2 items-center justify-center">Properties</div>
      </div>
      <div className="px-[calc(0.6*var(--editor-unit,1cqw))] pb-[calc(0.35*var(--editor-unit,1cqw))] pt-[calc(0.4*var(--editor-unit,1cqw))]">
        <div className="mb-[calc(0.45*var(--editor-unit,1cqw))] flex h-[calc(1.55*var(--editor-unit,1cqw))] items-center gap-[calc(0.65*var(--editor-unit,1cqw))]">
          <span>Selection</span>
          <Layers className="size-[calc(0.8*var(--editor-unit,1cqw))]" />
          <span className="ml-auto flex h-[calc(1.3*var(--editor-unit,1cqw))] items-center gap-[calc(0.25*var(--editor-unit,1cqw))] rounded-[calc(0.15*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[#45404e] px-[calc(0.3*var(--editor-unit,1cqw))] text-[calc(0.6*var(--editor-unit,1cqw))]">
            - State -
            <ChevronDown className="size-[calc(0.6*var(--editor-unit,1cqw))]" />
          </span>
        </div>
        <div className="mb-[calc(0.45*var(--editor-unit,1cqw))] flex h-[calc(1.45*var(--editor-unit,1cqw))] items-center rounded-[calc(0.15*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[#595160]">
          <span className="flex h-full w-[calc(1.4*var(--editor-unit,1cqw))] items-center justify-center border-r-[calc(0.05*var(--editor-unit,1cqw))] border-[#45404e]">
            <Tag className="size-[calc(0.75*var(--editor-unit,1cqw))] fill-current" />
          </span>
          <Plus className="mx-[calc(0.3*var(--editor-unit,1cqw))] size-[calc(0.85*var(--editor-unit,1cqw))] text-[#b494f4]" />
          <span className="flex items-center gap-[calc(0.25*var(--editor-unit,1cqw))] rounded-[calc(0.15*var(--editor-unit,1cqw))] bg-[#f6c7e6] px-[calc(0.3*var(--editor-unit,1cqw))] py-[calc(0.1*var(--editor-unit,1cqw))] text-[calc(0.55*var(--editor-unit,1cqw))] text-[#5c314f]">
            {brand
              ? selected
                ? "hero-title"
                : "landing-page"
              : "gjs-text-blue"}
            <EllipsisVertical className="size-[calc(0.6*var(--editor-unit,1cqw))]" />
          </span>
        </div>
        <div className="mb-[calc(0.45*var(--editor-unit,1cqw))] flex h-[calc(1.45*var(--editor-unit,1cqw))] items-center rounded-[calc(0.15*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[#595160]">
          <span className="mr-[calc(0.4*var(--editor-unit,1cqw))] flex h-full w-[calc(1.4*var(--editor-unit,1cqw))] items-center justify-center rounded-l-[calc(0.1*var(--editor-unit,1cqw))] bg-[#a988ee] text-white">
            <Frame className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
          </span>
          <span className="rounded-[calc(0.1*var(--editor-unit,1cqw))] bg-[#4b9dce] px-[calc(0.3*var(--editor-unit,1cqw))] py-[calc(0.05*var(--editor-unit,1cqw))] text-[calc(0.6*var(--editor-unit,1cqw))] text-white">
            {brand ? (selected ? "Heading" : "Body") : "Text"}
          </span>
        </div>
        <div className="flex h-[calc(1.5*var(--editor-unit,1cqw))] items-center justify-between">
          {[Crosshair, Frame, CodeXml].map((Icon, index) => (
            <span
              key={index}
              className="flex size-[calc(1.45*var(--editor-unit,1cqw))] items-center justify-center rounded-[calc(0.15*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[#393441]"
            >
              <Icon className="size-[calc(0.8*var(--editor-unit,1cqw))]" />
            </span>
          ))}
        </div>
      </div>
      {["Layout", "Size", "Space", "Position"].map((label) => (
        <PanelSection key={label} label={label} />
      ))}
      <PanelSection label="Typography" open={!compact} />
      {!compact && (
        <div className="grid gap-[calc(0.55*var(--editor-unit,1cqw))] px-[calc(0.6*var(--editor-unit,1cqw))] py-[calc(0.6*var(--editor-unit,1cqw))]">
          <PropertyField label="Font" highlighted>
            {brand ? "Arial" : "Helvetica"}
          </PropertyField>
          <PropertyField label="Color" highlighted>
            <span
              className="size-[calc(0.85*var(--editor-unit,1cqw))] shrink-0 rounded-[calc(0.1*var(--editor-unit,1cqw))]"
              style={{
                backgroundColor: color ?? (brand ? "#4c2368" : "#c647dd"),
              }}
            />
            <span className="text-[calc(0.6*var(--editor-unit,1cqw))]">
              {color ?? (brand ? "rgb(76, 35, 104)" : "rgb(198, 71, 221)")}
            </span>
          </PropertyField>
          <div className="grid grid-cols-2 gap-[calc(0.3*var(--editor-unit,1cqw))]">
            <PropertyField label="Size" adjustable>
              {brand ? (selected ? "48 px" : "16 px") : "medium"}
            </PropertyField>
            <PropertyField label="Weight">
              {brand && selected ? "600" : "Normal"}
            </PropertyField>
          </div>
          <div className="grid grid-cols-2 gap-[calc(0.3*var(--editor-unit,1cqw))]">
            <PropertyField label="Line height" adjustable>
              normal
            </PropertyField>
            <PropertyField label="Spacing" adjustable>
              normal
            </PropertyField>
          </div>
          <div className="grid grid-cols-2 gap-[calc(0.3*var(--editor-unit,1cqw))]">
            <PropertyField label="Align">left</PropertyField>
            <PropertyField label="Vertical align">Baseline</PropertyField>
          </div>
          <div className="grid grid-cols-2 gap-[calc(0.3*var(--editor-unit,1cqw))]">
            <PropertyField label="Transform">None</PropertyField>
            <PropertyField label="Direction">LTR</PropertyField>
          </div>
          <div className="grid grid-cols-2 gap-[calc(0.3*var(--editor-unit,1cqw))]">
            <PropertyField label="Breaking">Normal</PropertyField>
            <PropertyField label="Decoration">None</PropertyField>
          </div>
        </div>
      )}
      {["Background", "Borders", "Effects"].map((label) => (
        <PanelSection key={label} label={label} />
      ))}
    </div>
  );
}

/** The same conversation header is used by the hero and feature demos. */
export function ChatPanelHeader() {
  return (
    <div className="flex h-[calc(2.1*var(--editor-unit,1cqw))] shrink-0 items-center gap-[calc(0.45*var(--editor-unit,1cqw))] border-b-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] bg-[color:var(--editor-bg)] px-[calc(0.5*var(--editor-unit,1cqw))] text-[calc(0.72*var(--editor-unit,1cqw))] text-[color:var(--editor-text)]">
      <Sparkles
        className="size-[calc(0.95*var(--editor-unit,1cqw))] fill-current"
        strokeWidth={1}
      />
      <span className="flex-1">AI Assistant</span>
      <Trash2 className="size-[calc(0.85*var(--editor-unit,1cqw))]" />
      <X className="ml-[calc(0.35*var(--editor-unit,1cqw))] size-[calc(0.95*var(--editor-unit,1cqw))]" />
    </div>
  );
}

export function ChatMessage({
  children,
  user = false,
}: {
  children: ReactNode;
  user?: boolean;
}) {
  return (
    <div
      className={cn(
        user &&
          "rounded-[calc(0.2*var(--editor-unit,1cqw))] bg-[#8b5cf6] px-[calc(0.45*var(--editor-unit,1cqw))] py-[calc(0.4*var(--editor-unit,1cqw))] font-normal text-white",
      )}
    >
      {children}
    </div>
  );
}

export function ChatToolCard({
  label,
  done,
  status,
  children,
}: {
  label: string;
  done: boolean;
  status?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[calc(0.2*var(--editor-unit,1cqw))] bg-[color:var(--editor-raised)]">
      <div className="flex h-[calc(1.75*var(--editor-unit,1cqw))] items-center gap-[calc(0.4*var(--editor-unit,1cqw))] px-[calc(0.45*var(--editor-unit,1cqw))]">
        {done ? (
          <Check className="size-[calc(0.75*var(--editor-unit,1cqw))] text-[#cbb2e8]" />
        ) : (
          status
        )}
        <span className="min-w-0 flex-1 truncate">{label}</span>
        <ChevronDown className="size-[calc(0.7*var(--editor-unit,1cqw))]" />
      </div>
      {done && children}
    </div>
  );
}

export function ChatBrandDetails() {
  return (
    <div className="flex items-center gap-[calc(0.35*var(--editor-unit,1cqw))] border-t-[calc(0.05*var(--editor-unit,1cqw))] border-white/5 px-[calc(0.45*var(--editor-unit,1cqw))] py-[calc(0.4*var(--editor-unit,1cqw))] text-[calc(0.6*var(--editor-unit,1cqw))]">
      {["#17121e", "#d8b4fe", "#8b5cf6"].map((color) => (
        <span
          key={color}
          style={{ backgroundColor: color }}
          className="size-[calc(0.7*var(--editor-unit,1cqw))] rounded-[calc(0.12*var(--editor-unit,1cqw))] ring-[calc(0.05*var(--editor-unit,1cqw))] ring-white/10"
        />
      ))}
      <span className="ml-auto">Arial · Rounded</span>
    </div>
  );
}

export function ChatSendButton({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "flex size-[calc(1.6*var(--editor-unit,1cqw))] items-center justify-center rounded-full",
        active ? "bg-[#8b5cf6] text-white" : "bg-[#8b5cf6]/50 text-[#b69ae6]",
      )}
    >
      <ArrowUp className="size-[calc(1.05*var(--editor-unit,1cqw))]" />
    </span>
  );
}

export function ChatComposer({
  draft,
  context,
  caret,
  sendControl,
}: {
  draft?: string;
  context?: ReactNode;
  caret?: ReactNode;
  sendControl?: ReactNode;
}) {
  return (
    <div className="shrink-0 border-t-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] p-[calc(0.5*var(--editor-unit,1cqw))]">
      <div className="flex h-[calc(6.6*var(--editor-unit,1cqw))] flex-col rounded-[calc(0.45*var(--editor-unit,1cqw))] border-[calc(0.05*var(--editor-unit,1cqw))] border-[color:var(--editor-border)] p-[calc(0.45*var(--editor-unit,1cqw))]">
        {context}
        <div className="mt-[calc(0.4*var(--editor-unit,1cqw))] leading-[1.45]">
          <span
            data-demo-draft
            className={draft ? "text-[#e3e0ea]" : "text-[#8d849b]"}
          >
            {draft || "Ask anything..."}
          </span>
          {draft && caret}
        </div>
        <div className="mt-auto flex items-center gap-[calc(0.85*var(--editor-unit,1cqw))]">
          <Plus className="size-[calc(0.95*var(--editor-unit,1cqw))]" />
          <Mic className="ml-auto size-[calc(0.9*var(--editor-unit,1cqw))]" />
          {sendControl ?? <ChatSendButton active={!!draft} />}
        </div>
      </div>
    </div>
  );
}
