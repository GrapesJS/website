import Container from "@/app/_components/container";
import Hero from "../_components/hero";
import JobBoard from "./jobBoard";
import Footer from "../_components/footer";

export default function PageCareers() {
  return (
    <main>
      <Hero title="Careers" clsTitle="text-5xl" className="bg-gjs min-h-[300px]"/>
      <Container className="pt-10 md:pt-20">
        <h1 className="primary-title mb-16 text-4xl md:text-5xl">Current Job Openings</h1>
        <div>Check below our current open positions</div>
        <hr className="border-neutral-200 my-5" />
        <JobBoard/>
      </Container>
      <Footer/>
    </main>
  );
}
