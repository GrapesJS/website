import CTALink from "./_components/CTALink";
import Header from "./_components/Header";
import StarOnGH from "./_components/StarOnGH";
import "./home.css";

// TODO: improve semantics of html
export default function HomePage() {
  return (
    <>
      <div className="bg"></div>
      <main>
        <Header isHome transparent />
        <section>
          <h1>Design Without Code</h1>
          <h2>
            The customizable website and email builder that grows with your
            business.
          </h2>

          <CTALink href="https://app.grapesjs.com/studio?utm_source=studiotrial&utm_medium=button">
            Start Building
          </CTALink>

          <StarOnGH />

          <div className="flex flex-col rounded-t-[24px] outline outline-8 outline-[#ffffff33]  bg-[#252527] pt-[40px]">
            <div className="flex gap-[8px] m-[12px] mt-[-28px]">
              <div className="w-[12px] h-[12px] rounded-full bg-[#ED6D60]"></div>
              <div className="w-[12px] h-[12px] rounded-full bg-[#F6BF52]"></div>
              <div className="w-[12px] h-[12px] rounded-full bg-[#64C556]"></div>
            </div>
            <img
              className="w-[1086px]"
              src="/assets/images/studio-editor.jpg"
              alt="GrapesJS Webpage Demo"
            />
          </div>
        </section>

        <section>
          <div className="flex flex-col items-center">
            <h3>POWERING SOLUTIONS FOR</h3>
            <hr />
          </div>
          <div className="flex gap-[32px] overflow-auto max-w-full h-[54px] items-stretch self-center">
            <img src="assets/images/external-logos/braze.png" alt="Braze" />
            <img
              src="assets/images/external-logos/france-gov.png"
              alt="Government of France"
            />
            <img src="assets/images/external-logos/pfizer.png" alt="Pfizer" />
            <img
              src="assets/images/external-logos/microsoft.png"
              alt="Microsoft"
            />
            <img
              src="assets/images/external-logos/volkswagen.png"
              alt="Volkswagen"
            />
            <img src="assets/images/external-logos/toyota.png" alt="Toyota" />
            <img src="assets/images/external-logos/phresia.png" alt="Phresia" />
          </div>
        </section>
        <section>
          <div className="flex flex-col items-center">
            <h3>FEATURES</h3>
            <hr />
          </div>
          <h1>Create Your Perfect Visual Editor</h1>
          <h2>
            Build powerful, customizable visual editors with GrapesJS. Our
            versatile framework provides everything you need, from drag-and-drop
            editing to responsive design.
          </h2>
          <CTALink href="https://app.grapesjs.com/studio?utm_source=studiotrial&utm_medium=button">
            Start Now<span className="font-[400]"> - It's free</span>
          </CTALink>
        </section>
      </main>
    </>
  );
}
