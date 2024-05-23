import Container from "@/app/_components/container";
import { getPathBlog } from "@/lib/utils";
import Link from "next/link";

import "./home.css";

const navLinks = [
  { content: 'Support', href: '#support' },
  { content: 'Features', href: '#features' },
  { content: 'Docs', href: '/docs' },
  { content: 'GitHub', href: 'https://github.com/grapesjs/grapesjs', target: '_blank' },
  { content: 'Twitter/X', href: 'https://x.com/grapesjs', target: '_blank' },
];

export default function HomePage() {
  return (
    <main>
      <section className="page-header">
        <div className="width-all top-header">
          <div className="flex justify-between mt-5">
            <div id="logo-cont" className="select-none flex gap-3 items-center">
              <img className="h-[55px]" src="/assets/images/grapesjs-logo-cl.png"/>
              <span className="text-4xl">GrapesJS</span>
            </div>
            <nav className="flex items-center gap-6">
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

        <div id="native-carbon"></div>
        <script async type="text/javascript" src="./js/carbon-v2.js"></script>

        <div className="bann-cont-c">
          <div className="bann-cont">
            <img className="banner-img" src="/assets/images/grapesjs-front-page-m.jpg" alt="GrapesJS Webpage Demo"/>
          </div>
        </div>

        {/* <div className="ddown-c" style="display:none">
          <div className="ddown-icon-c animated fadeInDown scroll-link" data-target=".what-sect">
            <div id="ddown-icon" style="cursor:pointer">&lang;</div>
          </div>
        </div> */}

        <div className="ddown-sharer">
            <div>
              <a className="btn-share sh-tw tooltip" data-tooltip="Tweet" target="_blank" href="https://twitter.com/intent/tweet?hashtags=grapesjs&ref_src=twsrc%5Etfw&text=GrapesJS%3A%20next%20generation%20tool%20for%20building%20templates%20without%20coding&tw_p=tweetbutton&url=http%3A%2F%2Fgrapesjs.com"><i className="fa fa-twitter" aria-hidden="true"></i></a>
              <a className="btn-share sh-fb tooltip" data-tooltip="Share" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fgrapesjs.com"><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
            </div>
        </div>
      </section>
      <section className="section-container what-sect">
        <div className="width-all">
          <h1 className="section-title primary-title">What is it?</h1>
          <div className="section-content">
            GrapesJS is an open-source, multi-purpose, Web Builder Framework which combines different tools and features with the goal to help you (or users of your application) to build HTML templates
            without any knowledge of coding. It's a perfect solution to replace the common WYSIWYG editors, which are good for content editing but inappropriate for
            creating HTML structures. You can see it in action with the
            <a  className="scroll-link" href="#logo-cont">official demos</a>,
            but using its
            <a target="_blank" href="https://github.com/artf/grapesjs/wiki/API-Reference">API</a>
            you're able to
            build your own editors.
            <br/>
            <br/>
            If you're here just to build stuff faster, open and bookmark the official demos and use them when you need it.

            <div className="what-images">
              <div className="what-image-cont what-image-cont1">
                <img className="what-image what-image1" src="img/grapesjs-front-page-m.jpg" alt="GrapesJS Webpage Demo"/>
              </div>
              <div className="what-image-cont what-image-cont2">
                <img className="what-image what-image2" src="img/sc-grapesjs-newsletter-demo.jpg" alt="GrapesJS Newsletter Demo"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="main-content" id="features">
        <div className="body-c body1 width-all">

          <h1 className="main-section-title">Available end-user features</h1>


          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12">
              <div className="info-card-title">Drag&Drop Built-in Blocks</div>
              <div className="info-card-description">GrapesJS comes with a set of built-in blocks, in this way you're able to
                build your templates faster. If the default set is not enough you can always add your own custom blocks.</div>
            </div>
            <div className="column col-6 col-md-12">
              <div className="card-images card-images1">
                <div className="card-image-cont card-image-cont1 brd-image">
                  <img className="card-image card-image1" src="img/sc-grapesjs-blocks-prp.jpg" alt="GrapesJS Blocks"/>
                </div>
              </div>
            </div>
          </div>

          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12 card-column3-1">
              <div className="card-images card-images3">
                <div className="card-image-cont card-image-cont3 brd-image">
                  <img className="card-image card-image3" src="img/sc-grapesjs-style-3.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont32 brd-image">
                  <img className="card-image card-image3" src="img/sc-grapesjs-style-2.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont33 brd-image">
                  <img className="card-image card-image3" src="img/sc-grapesjs-style-1.jpg" alt="GrapesJS Style Manager"/>
                </div>
              </div>
            </div>
            <div className="column col-6 col-md-12 text-right card-column3-2">
              <div className="info-card-title">Limitless styling</div>
              <div className="info-card-description">GrapesJS implements simple and powerful Style Manager module which enables
                independent styling of any component inside the canvas. It's also possible to configure it to use any of the
                CSS properties</div>
            </div>
          </div>


          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12">
              <div className="info-card-title">Responsive design</div>
              <div className="info-card-description">GrapesJS gives you all the necessary tools you need to optimize your
                templates to look awesomely on any device. In this way you're able to provide various viewing experience.
                In case more device options are required, you can easily add them to the editor.</div>
            </div>
            <div className="column col-6 col-md-12">
              <div className="card-images card-images2">
                <div className="card-image-cont card-image-cont2 brd-image">
                  <img className="card-image card-image2" src="img/sc-grapesjs-responsive-2.jpg" alt="GrapesJS Responsive"/>
                </div>
              </div>
            </div>
          </div>


          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12 card-column4-1">
              <div className="card-images card-images3">
                <div className="card-image-cont card-image-cont4 brd-image">
                  <img className="card-image card-image3" src="img/sc-grapesjs-layers-1.jpg" alt="GrapesJS Style Manager"/>
                </div>
                <div className="card-image-cont card-image-cont42 brd-image">
                  <img className="card-image card-image3" src="img/sc-grapesjs-layers-2.jpg" alt="GrapesJS Style Manager"/>
                </div>
              </div>
            </div>
            <div className="column col-6 col-md-12 card-column4-2 text-right">
              <div className="info-card-title">The structure always under control</div>
              <div className="info-card-description">You can nest components as much as you can but when the structure begins to grow
                the Layer Manager comes very handy. It allows you to manage and rearrange your elements extremely faster, focusing
                always on the architecture of your structure.</div>
            </div>
          </div>



          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12">
              <div className="info-card-title">The code is there when you need it</div>
              <div className="info-card-description">You don't have to care about the code, but it's always there, available for you. When
                the work is done you can grab and use it wherever you want. Developers could also implement their own storage interfaces
                to use inside the editor.</div>
            </div>
            <div className="column col-6 col-md-12">
              <div className="card-images card-images2">
                <div className="card-image-cont card-image-cont6 brd-image">
                  <img className="card-image card-image6" src="img/sc-grapesjs-code.jpg" alt="GrapesJS Code"/>
                </div>
              </div>
            </div>
          </div>


          <div className="info-card info-card-blocks fadeInBlock columns">
            <div className="column col-6 col-md-12 card-column5-1">
              <div className="card-images card-images3">
                <div className="card-image-cont card-image-cont5 brd-image">
                  <img className="card-image card-image5" src="img/sc-grapesjs-assets-1.jpg" alt="GrapesJS Asset Manager"/>
                </div>
                <div className="card-image-cont card-image-cont52 brd-image">
                  <img className="card-image card-image52" src="img/sc-grapesjs-assets-2.jpg" alt="GrapesJS Asset Manager"/>
                </div>
              </div>
            </div>
            <div className="column col-6 col-md-12 card-column5-2 text-right">
              <div className="info-card-title">Asset Manager</div>
              <div className="info-card-description">With the Asset Manager is easier to organize your media files and it's
                enough to double click on the image to change it</div>
            </div>
          </div>

        </div>
      </section>
      <section className="featured">
        <div className="featured-title">FEATURED ON</div>
        <div className="featured-cards">
          <div className="featured-card">
            <img className="featured-logo hn-logo" src="./img/hn-logo.png"/>
          </div>
          <div className="featured-card">
            <img className="featured-logo ph-logo" src="./img/ph-logo.png"/>
          </div>
          <div className="featured-card">
            <img className="featured-logo t3n-logo" src="./img/t3n-logo.png"/>
          </div>
          <div className="featured-card">
            <img className="featured-logo wdd-logo" src="./img/wdd-logo.png"/>
          </div>
          <div className="featured-card">
            <img className="featured-logo speckyboy-logo" src="./img/speckyboy-logo.png"/>
          </div>
        </div>
      </section>
      <section className="support section-container" id="support">
        <div className="width-all">
          <h1 className="section-title primary-title">Support us</h1>
          <div className="section-content">
            If you like the project you can help us get bigger. GrapesJS is an independent
            project, made by developers in their spare time with a common purpose, to make
            web development accessible to everyone. We appreciate even the smallest contribution
            as it's a huge change from many aspects, but mostly, the motivation to
            keep improving this tool.
          </div>
          <div className="suppoer-banners text-center">
            <br/><br/><br/>
            <h2 className="text-center">Gold Sponsors</h2>
            <div className="sponsors--direct">
            </div>
            <div className="sponsors">
              <div className="flex flex-center gap-[25x]">
                <div className="sp-gold-item">
                  <a href="https://www.phreesia.com" target="_blank" className="block">
                    <img className="sp-logo" src="./img/phreesia_logo.png"/>
                  </a>
                </div>
                <div className="sp-gold-item">
                  <a href="https://www.braze.com" target="_blank" className="block">
                    <img className="sp-logo" src="./img/braze_logo.svg"/>
                  </a>
                </div>
                <div className="sp-gold-item">
                  <a href="https://veepn.com/vpn-apps/download-vpn-for-pc/" target="_blank" className="block">
                    <img className="sp-logo w-[150px]" src="./img/logo_veepn.png" alt="Download the Best Windows VPN for PC"/>
                  </a>
                </div>
              </div>
              <div className="sp-sup">
                {/* https://opencollective.com/grapesjs#support
                https://opencollective.com/grapesjs/tiers/gold-sponsors.svg
                https://opencollective.com/grapesjs/tiers/sponsors.svg
                https://opencollective.com/grapesjs/tiers/backers.svg */}
              </div>
            </div>
            <br/><br/><br/>
          </div>
          <div className="suppoer-banners text-center">
            <h2 className="text-center">Sponsors</h2>
            <div className="sponsors--direct">
            </div>
            <div className="sponsors">
              <div className="overflow-auto">
                <object type="image/svg+xml" data="https://opencollective.com/grapesjs/tiers/sponsors.svg?avatarHeight=64"></object>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="footer-content">
          <div className="footer-c width-all">
            <div className="title">
              The project is still under development, so
              <a className="darker-link" href="https://twitter.com/grapesjs" target="_blank">stay tuned</a>.
              <br/>
              Being a free and open source project contributors and supporters are extremely welcome.
            </div>
            <div className="btns-c">
              <a className="btn btn-gjs" href="/docs/">Get Started</a>
            </div>
          </div>
          <div className="madewith-c">
            <span className="madewith">Site built with <br/>
              <span className="logo-bot-c"><img className="bot-logo-made" src="img/grapesjs-logo-cl.png"/> rapesJS</span>
            </span>
          </div>
      </section>
      <section className="copyr-content">
        <div className="copyr-c width-all">
          made with <span className="animated pulse infinite inline-block">♥</span> by <a className="darker-link" href="https://github.com/artf">Artur Arseniev</a>
        </div>
      </section>

      {/* <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-74284223-1', 'auto');
        ga('send', 'pageview');
      </script> */}
    </main>
  );
}
