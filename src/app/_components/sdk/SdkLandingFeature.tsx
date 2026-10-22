import { cn } from "@/lib/utils";

export default function SdkLandingFeature({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  children,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  children: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section className="border-t border-white/[0.07] px-5 py-16 sm:py-24">
      <div
        className={cn(
          "mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d39cdd]">
            {eyebrow}
          </p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
            {description}
          </p>
          <a
            href={href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#e5b2eb] underline decoration-[#d39cdd]/50 underline-offset-4 transition hover:text-white"
            data-ph-capture-attribute-placement="sdk-feature"
            data-ph-capture-attribute-feature={eyebrow
              .toLowerCase()
              .replaceAll(" ", "-")}
          >
            {linkLabel} <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141019] p-2 shadow-[0_24px_80px_rgba(0,0,0,.32)] sm:p-3">
          {children}
        </div>
      </div>
    </section>
  );
}
