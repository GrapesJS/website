import Container from "@/app/_components/Container";
import Footer from "@/app/_components/Footer";
import Hero from "@/app/_components/Hero";
import PricingContent from "./PricingContent";

export default function SdkPricingPage() {
  return (
    <main className="min-h-screen bg-[var(--backgroundColor)] text-white">
      <Hero title="STUDIO SDK PRICING" subTitle="Plans that fit your scale" />

      <Container className="pb-16 md:pb-24">
        <PricingContent />
      </Container>

      <Footer />
    </main>
  );
}
