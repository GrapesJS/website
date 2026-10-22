import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type SdkFaqItem = { question: string; answer: string };

export default function SdkLandingFaq({
  title = "Frequently asked questions",
  description,
  faqs,
}: {
  title?: string;
  description: string;
  faqs: SdkFaqItem[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <section className="border-t border-white/[0.07] px-5 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div className="text-center lg:sticky lg:top-[140px] lg:text-left">
            <h2 className="text-3xl font-semibold leading-snug text-white md:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/65 md:mx-0 md:text-lg">
              {description}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index}`}>
                  <AccordionTrigger className="px-6 text-left md:px-8">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 leading-7 text-white/70 md:px-8">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
