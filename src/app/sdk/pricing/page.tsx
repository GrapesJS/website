import Container from "@/app/_components/Container";
import Footer from "@/app/_components/Footer";
import Hero from "@/app/_components/Hero";
import PricingContent from "./PricingContent";

export default function SdkPricingPage() {
  return (
    <main className="min-h-screen bg-[var(--backgroundColor)] text-white">
      <Hero
        title="SDK PRICING"
        subTitle="Plans that fit your scale"
        className="pb-8 md:pb-10"
      />

      <Container className="pb-16 pt-2 md:pb-24 md:pt-4">
        <PricingContent />
      </Container>

      <Footer />
    </main>
  );
}
