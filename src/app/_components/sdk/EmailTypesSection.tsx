import { cn } from "@/lib/utils";
import SectionEyebrow from "../SectionEyebrow";
import EmailTemplatePreview, {
  type EmailTemplateKind,
} from "../layouts/EmailTemplatePreview";
import { theme } from "./theme";

const emailTypes: {
  kind: EmailTemplateKind;
  title: string;
  description: string;
  accent: string;
}[] = [
  {
    kind: "welcome",
    title: "Welcome & onboarding emails",
    description:
      "Help new users find their feet with welcome messages, getting-started guides, and product introductions.",
    accent: "#8753b2",
  },
  {
    kind: "newsletter",
    title: "Newsletters & product updates",
    description:
      "Keep readers coming back with editorial newsletters, company news, and useful product updates.",
    accent: "#4f728b",
  },
  {
    kind: "promotion",
    title: "Promotional & marketing emails",
    description:
      "Give campaigns a consistent look, from new product launches to seasonal offers and announcements.",
    accent: "#b16c8c",
  },
  {
    kind: "transactional",
    title: "Transactional emails",
    description:
      "Design order confirmations, receipts, password resets, and account notifications that match your brand.",
    accent: "#4e8879",
  },
  {
    kind: "cart",
    title: "Abandoned cart emails",
    description:
      "Let teams create personalized cart reminders and follow-up messages around the products shoppers chose.",
    accent: "#ad8150",
  },
  {
    kind: "event",
    title: "Event invitations & reminders",
    description:
      "Build invitations for webinars, launches, and live events, plus the reminders that help people attend.",
    accent: "#7561ab",
  },
];

export default function EmailTypesSection() {
  return (
    <section
      aria-labelledby="email-types-heading"
      className="relative z-[1] mx-auto max-w-[1132px] px-4 py-16 md:py-20"
    >
      <div data-reveal className="mx-auto mb-10 max-w-3xl text-center">
        <SectionEyebrow className="mb-4">
          ONE EMAIL EDITOR, EVERY OCCASION
        </SectionEyebrow>
        <h2
          id="email-types-heading"
          className={cn(
            "text-3xl font-semibold leading-tight tracking-tight md:text-[42px]",
            theme.colors.primaryText,
          )}
        >
          Build every email your users need.
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg",
            theme.colors.mutedText,
          )}
        >
          From a first welcome to a regular newsletter, give your users one
          place to design the emails their customers expect.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {emailTypes.map(({ kind, title, description, accent }) => (
          <article
            data-reveal
            key={kind}
            className={cn(
              "overflow-hidden rounded-2xl",
              theme.cards.border,
              theme.cards.bg,
            )}
          >
            <div
              role="img"
              aria-label={`${title} template preview`}
              className="flex h-[300px] justify-center overflow-hidden bg-[#201829]/60 px-7 pt-6"
            >
              <EmailTemplatePreview
                kind={kind}
                accent={accent}
                className="w-full max-w-[250px] shrink-0 self-start shadow-2xl"
              />
            </div>
            <div className="p-6">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  theme.colors.primaryText,
                )}
              >
                {title}
              </h3>
              <p
                className={cn("mt-3 text-sm leading-7", theme.colors.mutedText)}
              >
                {description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
