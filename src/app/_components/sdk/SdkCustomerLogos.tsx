import { cn } from "@/lib/utils";
import SectionEyebrow from "@/app/_components/SectionEyebrow";

const customers = [
  {
    src: "/assets/images/external-logos/gainsight.webp",
    alt: "Gainsight",
    className: "!brightness-0 !invert !h-[40px]",
  },
  {
    src: "/assets/images/external-logos/microsoft.webp",
    alt: "Microsoft",
    className: "!brightness-0 !invert",
  },
  {
    src: "/assets/images/external-logos/bytedance.webp",
    alt: "TikTok",
    className: "!brightness-0 !invert !h-[40px]",
  },
  {
    src: "/assets/images/external-logos/bbc.webp",
    alt: "BBC",
    className: "!brightness-0 !invert",
  },
  {
    src: "/assets/images/external-logos/servicenow.webp",
    alt: "ServiceNow",
    className: "!brightness-0 !invert !h-[30px]",
  },
  {
    src: "/assets/images/external-logos/braze.webp",
    alt: "Braze",
    className: "!brightness-0 !invert",
  },
  {
    src: "/assets/images/external-logos/phresia.webp",
    alt: "Phresia",
    className: "!brightness-0 !invert",
  },
  {
    src: "/assets/images/external-logos/france-gov.webp",
    alt: "France Government",
    className: "",
  },
];

export default function SdkCustomerLogos() {
  return (
    <section className="flex w-full flex-col items-center gap-6 px-4 pb-8 pt-14">
      <SectionEyebrow as="h2" className="z-[1]">
        POWERING SOLUTIONS FOR
      </SectionEyebrow>
      <div className="relative w-full max-w-[1100px] overflow-hidden [--logo-mask:linear-gradient(90deg,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:var(--logo-mask)] [mask-image:var(--logo-mask)]">
        <div className="flex w-max animate-logo-marquee will-change-transform motion-reduce:animate-none">
          {[0, 1].map((copyIndex) => (
            <div
              key={copyIndex}
              className="flex shrink-0 items-center gap-12 px-6 max-[640px]:gap-9"
              aria-hidden={copyIndex === 1}
            >
              {customers.map(({ src, alt, className }) => (
                <div
                  key={`${copyIndex}-${src}`}
                  className="flex min-w-[160px] items-center justify-center max-[640px]:min-w-[128px]"
                >
                  <img
                    className={cn("h-[54px] grayscale", className)}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
