import CarbonAd from "./_components/carbonAd";
import "./home.css";

const navLinks = [
  { content: 'Support', href: '#support' },
  { content: 'Features', href: '#features' },
  { content: 'Docs', href: '/docs' },
  { content: 'GitHub', href: 'https://github.com/grapesjs/grapesjs', target: '_blank' },
  { content: 'Twitter/X', href: 'https://x.com/grapesjs', target: '_blank' },
];

const featuredItems = [
  { src: '/assets/images/hn-logo.png' },
  { src: '/assets/images/ph-logo.png' },
  { src: '/assets/images/t3n-logo.png' },
  { src: '/assets/images/wdd-logo.png' },
  { src: '/assets/images/speckyboy-logo.png' },
];

const goldSponsors = [
  {
    href: 'https://www.phreesia.com',
    src: '/assets/images/phreesia_logo.png',
    alt: 'Phreesia logo',
    className: 'w-[250px]',
  },
  {
    href: 'https://www.braze.com',
    src: '/assets/images/braze_logo.svg',
    alt: 'Braze logo',
    className: 'w-[250px]',
  },
  {
    href: 'https://veepn.com/vpn-apps/download-vpn-for-pc/',
    src: '/assets/images/logo_veepn.png',
    alt: 'Download the Best Windows VPN for PC',
    className: 'w-[150px]',
  },
];

const clsSectionTitle = 'primary-title text-center mb-20 text-4xl md:text-5xl';
const clsFeatureRow = 'flex flex-col gap-10 md:flex-row items-center mb-24';
const clsFeatureTitle = 'text-2xl md:text-5xl mb-4';
const clsFeatureCol = 'basis-full md:basis-1/2';

export default function HomePage() {
  return (
    <main>
      <section className="page-header z-0">
        <div className="width-all top-header pt-5">
          <div className="flex flex-wrap items-center md:justify-between gap-7 flex-col md:flex-row">
            <div id="logo-cont" className="select-none flex gap-3 items-center">
              <img className="h-[55px]" src="/assets/images/grapesjs-logo-cl.png"/>
              <span className="text-4xl">GrapesJS</span>
            </div>
            <nav className="flex flex-wrap justify-center items-center gap-6">
                {navLinks.map(({ href, target, content }) => (
                  <span className="nav-item" key={href}>
                    <a className="top-nav-link" href={href} target={target}>
                      {content}
                    </a>
                  </span>
                ))}
              </nav>
          </div>
        </div>

        <h1 className="mt-24 text-3xl">
          Free and Open Source Web Builder Framework
        </h1>
        <h2 className="mt-5 text-lg opacity-80">
          Next generation tool for building templates without coding
        </h2>

        <div className="mt-24 btns-cont">
          <a href="./demo.html" className="btn try btn-rnd">Webpage Demo</a>
          <a href="./demo-newsletter-editor.html" className="btn try btn-rnd">Newsletter Demo</a>
          <a href="./demo-mjml.html" className="btn try btn-rnd">MJML Demo</a>
          <div></div>
          <a href="https://studio.grapesjs.com" className="btn try btn-rnd btn-studio">
              <img src="/assets/images/logos/grapesjs-logo.svg" className="h-[40px]"/>
              Try GrapesJS Studio <small>(alpha)</small>
          </a>
          <div className="device-small">Sorry but your device is too small for the editor. See below for more information</div>
        </div>

        <CarbonAd/>

        <div className="bann-cont-c">
          <div className="bann-cont">
            <img className="banner-img" src="/assets/images/grapesjs-front-page-m.jpg" alt="GrapesJS Webpage Demo"/>
          </div>
        </div>

        <div className="ddown-sharer">
            <div>
              <a className="btn-share sh-tw tooltip" data-tooltip="Tweet" target="_blank" href="https://twitter.com/intent/tweet?hashtags=grapesjs&ref_src=twsrc%5Etfw&text=GrapesJS%3A%20next%20generation%20tool%20for%20building%20templates%20without%20coding&tw_p=tweetbutton&url=http%3A%2F%2Fgrapesjs.com"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              <a className="btn-share sh-fb tooltip" data-tooltip="Share" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgrapesjs.com"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
            </div>
        </div>
      </section>

      <section className="section-container what-sect">
        <div className="width-all">
          <h1 className={clsSectionTitle}>What is it?</h1>
          <div className="section-content">
            GrapesJS is an open-source, multi-purpose, Web Builder Framework which combines different tools and features with the goal to help you (or users of your application) to build HTML templates
            without any knowledge of coding. It's a perfect solution to replace the common WYSIWYG editors, which are good for content editing but inappropriate for
            creating HTML structures. You can see it in action with the <a  className="link-gjs" href="#logo-cont">official demos</a>,
            but using its <a className="link-gjs" target="_blank" href="https://grapesjs.com/docs/api">API</a> you're able to build your own editors.
            <br/>
            <br/>
            If you're here just to build stuff faster, open and bookmark the official demos and use them when you need it.

            <div className="what-images">
              <div className="what-image-cont what-image-cont1">
                <img className="what-image what-image1" src="/assets/images/grapesjs-front-page-m.jpg" alt="GrapesJS Webpage Demo"/>
              </div>
              <div className="what-image-cont what-image-cont2">
                <img className="what-image what-image2" src="/assets/images/sc-grapesjs-newsletter-demo.jpg" alt="GrapesJS Newsletter Demo"/>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container even-content overflow-hidden" id="features">
        <div className="body1 width-all">
          <h1 className={clsSectionTitle}>Available end-user features</h1>

          <div className={clsFeatureRow}>
            <div className={clsFeatureCol}>
              <div className={clsFeatureTitle}>Drag&Drop Built-in Blocks</div>
              <div>
                GrapesJS comes with a set of built-in blocks, in this way you're able to
                build your templates faster. If the default set is not enough you can always add your own custom blocks.
              </div>
            </div>
            <div className={clsFeatureCol}>
              <div className="card-images">
                <div className="card-image-cont card-image-cont1 brd-image">
                  <img className="card-image card-image1" src="/assets/images/sc-grapesjs-blocks-prp.jpg" alt="GrapesJS Blocks"/>
                </div>
              </div>
            </div>
          </div>

          <div className={clsFeatureRow}>
            <div className={`${clsFeatureCol} order-2 md:-order-1`}>
              <div className="relative z-0">
                <div className="card-image-cont card-image-cont3 brd-image">
                  <img className="card-image card-image3" src="/assets/images/sc-grapesjs-style-3.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont32 brd-image">
                  <img className="card-image card-image3" src="/assets/images/sc-grapesjs-style-2.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont33 brd-image">
                  <img className="card-image card-image3" src="/assets/images/sc-grapesjs-style-1.jpg" alt="GrapesJS Style Manager"/>
                </div>
              </div>
            </div>
            <div className={`${clsFeatureCol} text-right`}>
              <div className={clsFeatureTitle}>Limitless styling</div>
              <div>
                GrapesJS implements simple and powerful Style Manager module which enables
                independent styling of any component inside the canvas. It's also possible to configure it to use any of the
                CSS properties.
              </div>
            </div>
          </div>


          <div className={clsFeatureRow}>
            <div className={clsFeatureCol}>
              <div className={clsFeatureTitle}>Responsive design</div>
              <div>
                GrapesJS gives you all the necessary tools you need to optimize your
                templates to look awesomely on any device. In this way you're able to provide various viewing experience.
                In case more device options are required, you can easily add them to the editor.
              </div>
            </div>
            <div className={clsFeatureCol}>
              <div>
                <div className="card-image-cont card-image-cont2 brd-image">
                  <img className="card-image card-image2" src="/assets/images/sc-grapesjs-responsive-2.jpg" alt="GrapesJS Responsive"/>
                </div>
              </div>
            </div>
          </div>


          <div className={clsFeatureRow}>
            <div className={`${clsFeatureCol} order-2 md:-order-1`}>
              <div className="relative z-0">
                <div className="card-image-cont card-image-cont4 brd-image">
                  <img className="card-image card-image3" src="/assets/images/sc-grapesjs-layers-1.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont42 brd-image">
                  <img className="card-image card-image3" src="/assets/images/sc-grapesjs-layers-2.jpg" alt="GrapesJS Style Manager"/>
                </div>
              </div>
            </div>
            <div className={`${clsFeatureCol} text-right`}>
              <div className={clsFeatureTitle}>The structure always under control</div>
              <div>
                You can nest components as much as you can but when the structure begins to grow
                the Layer Manager comes very handy. It allows you to manage and rearrange your elements extremely faster, focusing
                always on the architecture of your structure.
              </div>
            </div>
          </div>



          <div className={clsFeatureRow}>
            <div className={clsFeatureCol}>
              <div className={clsFeatureTitle}>The code is there when you need it</div>
              <div>
                You don't have to care about the code, but it's always there, available for you. When
                the work is done you can grab and use it wherever you want. Developers could also implement their own storage interfaces
                to use inside the editor.
              </div>
            </div>
            <div className={clsFeatureCol}>
              <div>
                <div className="card-image-cont card-image-cont6 brd-image">
                  <img className="card-image card-image6" src="/assets/images/sc-grapesjs-code.jpg" alt="GrapesJS Code"/>
                </div>
              </div>
            </div>
          </div>


          <div className={clsFeatureRow}>
            <div className={`${clsFeatureCol} order-2 md:-order-1`}>
              <div className="relative z-0">
                <div className="card-image-cont card-image-cont5 brd-image">
                  <img className="card-image card-image5" src="/assets/images/sc-grapesjs-assets-1.jpg" alt="GrapesJS Asset Manager"/>
                </div>
                <div className="card-image-cont card-image-cont52 brd-image">
                  <img className="card-image card-image52" src="/assets/images/sc-grapesjs-assets-2.jpg" alt="GrapesJS Asset Manager"/>
                </div>
              </div>
            </div>
            <div className={`${clsFeatureCol} text-right`}>
              <div className={clsFeatureTitle}>Asset Manager</div>
              <div>
                With the Asset Manager is easier to organize your media files and it's
                enough to double click on the image to change it.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-zinc-100">
        <div className="text-center pb-10 text-zinc-400 font-bold tracking-[5px]">
          FEATURED ON
        </div>
        <div className="flex flex-wrap md:flex-nowrap justify-evenly">
          {featuredItems.map(({ src }) => (
            <div className="my-[50px] mx-[30px]" key={src}>
              <img className="opacity-50" src={src}/>
            </div>
          ))}
        </div>
      </section>

      <section className="section-container support" id="support">
        <div className="width-all">
          <h1 className={clsSectionTitle}>Support us</h1>
          <div>
            If you like the project you can help us get bigger. GrapesJS is an independent
            project, made by developers in their spare time with a common purpose, to make
            web development accessible to everyone. We appreciate even the smallest contribution
            as it's a huge change from many aspects, but mostly, the motivation to
            keep improving this tool.
          </div>

          <div className="text-center pt-20 pb-36">
            <h2 className="text-center font-semibold text-2xl">Gold Sponsors</h2>
            <div className="mt-12">
              <div className="flex flex-center gap-[25px]">
                {goldSponsors.map(({ href, className, src, alt }) => (
                  <div className="sp-gold-item" key={href}>
                    <a href={href} target="_blank" className="block">
                      <img className={`${className} max-w-full`} src={src} alt={alt}/>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-center font-semibold text-2xl">Sponsors</h2>
            <div className="mt-12">
              <div className="overflow-auto flex justify-center">
                <object type="image/svg+xml" data="https://opencollective.com/grapesjs/tiers/sponsors.svg?avatarHeight=64"></object>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-container footer-content">
          <div className="footer-c width-all">
            <div className="text-center mb-20 text-lg">
              The project is under development, so <a className="darker-link" href="https://twitter.com/grapesjs" target="_blank">stay tuned</a>.
              <br/>
              Being a free and open source project contributors and supporters are extremely welcome.
            </div>
            <div className="btns-c">
              <a className="btn btn-gjs" href="/docs">Get Started</a>
            </div>
          </div>
      </section>
      <section className="copyr-content">
        <div className="copyr-c width-all">
          made with ♥ by <a className="darker-link" href="https://github.com/artf">Artur Arseniev</a>
        </div>
      </section>
    </main>
  );
}
