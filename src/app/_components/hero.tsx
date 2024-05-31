import cx from "classnames";
import Header from "./header";

interface HeroProps extends React.HTMLProps<HTMLElement> {
  title?: string;
  subTitle?: string;
  clsTitle?: string;
}

const Hero: React.FC<HeroProps> = ({ children, clsTitle, className, title, subTitle, ...rest }) => {
  return (
    <section className={cx('flex flex-col relative overflow-hidden pt-5 z-0 [text-shadow:_0_2px_2px_rgb(0_0_0_/_35%)]', className)} {...rest}>
      <Header transparent/>
      <div className="container flex-grow mx-auto px-5 drop-shadow-lg flex flex-col items-center justify-center">
        {!!title && <h1 className={cx(clsTitle ?? 'text-3xl')}>{ title }</h1>}
        {!!subTitle && <h2 className="mt-5 text-lg opacity-80">{ subTitle }</h2>}

        { children }
      </div>
      <div className="bann-cont-c absolute top-[40%] left-1/2 transform -translate-x-1/2 -z-10">
          <div className="bann-cont opacity-20 blur-[7px] rounded-lg overflow-hidden">
            <img className="banner-img max-w-max" src="/assets/images/grapesjs-front-page-m.jpg" alt="GrapesJS Webpage Demo"/>
          </div>
        </div>
    </section>
  );
};

export default Hero;
