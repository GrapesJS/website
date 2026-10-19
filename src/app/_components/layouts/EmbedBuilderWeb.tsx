import type { ReactNode } from "react";
import {
  ArrowUp,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CodeXml,
  Copy,
  Crosshair,
  Download,
  EllipsisVertical,
  Eye,
  FileStack,
  Frame,
  Hand,
  Image as ImageIcon,
  Layers,
  Maximize,
  Menu,
  Move,
  MoveVertical,
  PanelTop,
  Play,
  Plus,
  Redo2,
  Scan,
  Settings,
  SquareDashed,
  Tag,
  Trash2,
  Type,
  Undo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EmbedBuilderWebProps = {
  className?: string;
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

function ApplicationShell() {
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

function PagesPanel() {
  return (
    <div className="min-w-0 border-r-[0.075cqw] border-[#494251] bg-[#201e2a]">
      <div className="flex h-[2.1cqw] items-center gap-[0.45cqw] px-[0.7cqw] text-[0.8cqw] font-semibold">
        <FileStack className="size-[0.85cqw]" />
        <span className="flex-1">Pages</span>
        <Plus className="size-[0.85cqw]" />
        <ChevronUp className="ml-[0.3cqw] size-[0.85cqw]" />
      </div>
      {["Home", "About", "Contact"].map((page, index) => (
        <div
          key={page}
          className={cn(
            "flex h-[1.85cqw] items-center justify-between px-[1cqw]",
            index === 0 && "bg-[#a88af2] text-white",
          )}
        >
          <span>{page}</span>
          <EllipsisVertical className="size-[0.8cqw] opacity-70" />
        </div>
      ))}
      <div className="mt-[0.75cqw] flex h-[2.1cqw] items-center gap-[0.5cqw] border-y-[0.05cqw] border-[#35313f] px-[0.7cqw] text-[0.8cqw] font-semibold">
        <Layers className="size-[0.85cqw]" />
        <span className="flex-1">Layers</span>
        <ChevronUp className="size-[0.85cqw]" />
      </div>
      <div className="pt-[0.15cqw]">
        {layerRows.map(({ name, depth, icon: Icon, open, selected }) => (
          <div
            key={`${depth}-${name}`}
            className={cn(
              "flex h-[1.55cqw] items-center gap-[0.4cqw] whitespace-nowrap pr-[0.3cqw]",
              selected && "bg-[#a88af2]/20 text-[#c5adff]",
            )}
            style={{ paddingLeft: `${0.45 + depth * 0.52}cqw` }}
          >
            {open ? (
              <ChevronDown className="size-[0.65cqw]" />
            ) : depth <= 1 ? (
              <ChevronRight className="size-[0.65cqw]" />
            ) : (
              <span className="w-[0.65cqw] shrink-0" />
            )}
            <Icon className="size-[0.75cqw]" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CanvasToolbar() {
  return (
    <div className="relative flex h-[2.1cqw] shrink-0 items-center justify-between bg-[#201e29] px-[0.6cqw]">
      <div className="flex size-[1.4cqw] items-center justify-center rounded-[0.15cqw] bg-[#8b5cf6] text-white shadow-[inset_0_0_0_0.08cqw_#ffffff15]">
        <Plus className="size-[0.95cqw]" />
      </div>
      <div className="absolute left-1/2 flex h-[1.5cqw] -translate-x-1/2 items-center gap-[0.4cqw] rounded-[0.2cqw] border-[0.05cqw] border-[#45404f] px-[0.5cqw]">
        <span>Desktop</span>
        <ChevronDown className="size-[0.7cqw]" />
      </div>
      <div className="flex items-center gap-[0.78cqw]">
        {[
          Scan,
          Eye,
          Maximize,
          CodeXml,
          Download,
          Trash2,
          Undo2,
          Redo2,
          Settings,
        ].map((Icon, index) => (
          <Icon key={index} className="size-[0.85cqw]" strokeWidth={2.1} />
        ))}
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
    <div className="flex min-w-0 flex-col overflow-hidden">
      <CanvasToolbar />
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[linear-gradient(165deg,#18051e_0%,#351039_45%,#501e58_100%)] text-white">
        <div className="flex h-[4.7cqw] items-center justify-between px-[2.7cqw]">
          <div className="flex items-center gap-[0.65cqw] text-[1.45cqw] font-bold text-[#c647dd]">
            <SiteLogo />
            <span>Your Logo</span>
          </div>
          <div className="flex items-center gap-[2.2cqw] text-[1.05cqw]">
            <span>About</span>
            <span>Features</span>
            <span>Testimonials</span>
          </div>
          <WaitlistButton />
        </div>
        <div className="mt-[5.2cqw] flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-[0.5cqw] whitespace-nowrap text-[2.6cqw] font-bold leading-[1.5] tracking-[-0.06cqw]">
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

function PropertyField({
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
          "mb-[0.3cqw] leading-[1.1]",
          highlighted && "text-[#b79be8]",
        )}
      >
        {label}
        {highlighted && <span className="ml-[0.35cqw]">×</span>}
      </div>
      <div className="flex h-[1.6cqw] min-w-0 items-center gap-[0.3cqw] rounded-[0.18cqw] border-[0.05cqw] border-[#45404e] px-[0.45cqw] text-[#9a96a5]">
        {adjustable && (
          <MoveVertical className="size-[0.65cqw] text-[#6c6679]" />
        )}
        <span className="flex min-w-0 flex-1 items-center gap-[0.35cqw] truncate">
          {children}
        </span>
        <ChevronDown className="size-[0.65cqw]" />
      </div>
    </div>
  );
}

function PanelSection({ label, open }: { label: string; open?: boolean }) {
  return (
    <div className="flex h-[1.8cqw] items-center justify-between border-y-[0.025cqw] border-[#484050] bg-[#2b2739] px-[0.65cqw] text-[0.8cqw]">
      <span className="flex items-center gap-[0.35cqw]">
        {label}
        {open && <span className="size-[0.23cqw] rounded-full bg-[#ae88ed]" />}
      </span>
      {open ? (
        <ChevronUp className="size-[0.75cqw]" />
      ) : (
        <ChevronDown className="size-[0.75cqw]" />
      )}
    </div>
  );
}

function StylesPanel() {
  return (
    <div className="min-w-0 overflow-hidden border-l-[0.075cqw] border-[#494251] bg-[#201e2a]">
      <div className="flex h-[2.1cqw] border-b-[0.05cqw] border-[#47404f] font-semibold">
        <div className="flex w-1/2 items-center justify-center border-b-[0.08cqw] border-[#b494f4] text-[#b494f4]">
          Styles
        </div>
        <div className="flex w-1/2 items-center justify-center">Properties</div>
      </div>
      <div className="px-[0.6cqw] pb-[0.35cqw] pt-[0.4cqw]">
        <div className="mb-[0.45cqw] flex h-[1.55cqw] items-center gap-[0.65cqw]">
          <span>Selection</span>
          <Layers className="size-[0.8cqw]" />
          <span className="ml-auto flex h-[1.3cqw] items-center gap-[0.25cqw] rounded-[0.15cqw] border-[0.05cqw] border-[#45404e] px-[0.3cqw] text-[0.6cqw]">
            - State -
            <ChevronDown className="size-[0.6cqw]" />
          </span>
        </div>
        <div className="mb-[0.45cqw] flex h-[1.45cqw] items-center rounded-[0.15cqw] border-[0.05cqw] border-[#595160]">
          <span className="flex h-full w-[1.4cqw] items-center justify-center border-r-[0.05cqw] border-[#45404e]">
            <Tag className="size-[0.75cqw] fill-current" />
          </span>
          <Plus className="mx-[0.3cqw] size-[0.85cqw] text-[#b494f4]" />
          <span className="flex items-center gap-[0.25cqw] rounded-[0.15cqw] bg-[#f6c7e6] px-[0.3cqw] py-[0.1cqw] text-[0.55cqw] text-[#5c314f]">
            gjs-text-blue
            <EllipsisVertical className="size-[0.6cqw]" />
          </span>
        </div>
        <div className="mb-[0.45cqw] flex h-[1.45cqw] items-center rounded-[0.15cqw] border-[0.05cqw] border-[#595160]">
          <span className="mr-[0.4cqw] flex h-full w-[1.4cqw] items-center justify-center rounded-l-[0.1cqw] bg-[#a988ee] text-white">
            <Frame className="size-[0.85cqw]" />
          </span>
          <span className="rounded-[0.1cqw] bg-[#4b9dce] px-[0.3cqw] py-[0.05cqw] text-[0.6cqw] text-white">
            Text
          </span>
        </div>
        <div className="flex h-[1.5cqw] items-center justify-between">
          {[Crosshair, Frame, CodeXml].map((Icon, index) => (
            <span
              key={index}
              className="flex size-[1.45cqw] items-center justify-center rounded-[0.15cqw] border-[0.05cqw] border-[#393441]"
            >
              <Icon className="size-[0.8cqw]" />
            </span>
          ))}
        </div>
      </div>
      {["Layout", "Size", "Space", "Position"].map((label) => (
        <PanelSection key={label} label={label} />
      ))}
      <PanelSection label="Typography" open />
      <div className="grid gap-[0.55cqw] px-[0.6cqw] py-[0.6cqw]">
        <PropertyField label="Font" highlighted>
          Helvetica
        </PropertyField>
        <PropertyField label="Color" highlighted>
          <span className="size-[0.85cqw] shrink-0 rounded-[0.1cqw] bg-[#c647dd]" />
          <span className="text-[0.6cqw]">rgb(198, 71, 221)</span>
        </PropertyField>
        <div className="grid grid-cols-2 gap-[0.3cqw]">
          <PropertyField label="Size" adjustable>
            medium
          </PropertyField>
          <PropertyField label="Weight">Normal</PropertyField>
        </div>
        <div className="grid grid-cols-2 gap-[0.3cqw]">
          <PropertyField label="Line height" adjustable>
            normal
          </PropertyField>
          <PropertyField label="Spacing" adjustable>
            normal
          </PropertyField>
        </div>
        <div className="grid grid-cols-2 gap-[0.3cqw]">
          <PropertyField label="Align">left</PropertyField>
          <PropertyField label="Vertical align">Baseline</PropertyField>
        </div>
        <div className="grid grid-cols-2 gap-[0.3cqw]">
          <PropertyField label="Transform">None</PropertyField>
          <PropertyField label="Direction">LTR</PropertyField>
        </div>
        <div className="grid grid-cols-2 gap-[0.3cqw]">
          <PropertyField label="Breaking">Normal</PropertyField>
          <PropertyField label="Decoration">None</PropertyField>
        </div>
      </div>
      {["Background", "Borders", "Effects"].map((label) => (
        <PanelSection key={label} label={label} />
      ))}
    </div>
  );
}

/** A static React illustration; dimensions scale together with its container. */
export default function EmbedBuilderWeb({ className }: EmbedBuilderWebProps) {
  return (
    <div
      role="img"
      aria-label="GrapesJS Studio website builder embedded in your app, with page layers, a purple landing page, and style controls."
      className={cn(
        "relative isolate aspect-[1172/621] w-full overflow-hidden bg-[#24212b] [container-type:inline-size]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 select-none text-left font-[Arial,Helvetica,sans-serif] text-[0.7cqw] font-normal leading-normal text-[#a7a4b3] [&_svg]:shrink-0"
      >
        <ApplicationShell />
        <div className="absolute bottom-[2.6%] left-[16.7%] right-[1.35%] top-[10.1%] grid grid-cols-[16.7%_minmax(0,1fr)_16.7%] overflow-hidden shadow-[0_0_0.6cqw_#16131c22]">
          <PagesPanel />
          <LandingPageCanvas />
          <StylesPanel />
        </div>
      </div>
    </div>
  );
}
