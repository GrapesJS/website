import cn from "classnames";
import Header from "../Header";
import styles from "./styles.module.css";
interface HeroProps extends React.HTMLProps<HTMLElement> {
  title?: string;
  subTitle?: string;
  clsTitle?: string;
}

const Hero: React.FC<HeroProps> = ({
  children,
  clsTitle,
  className,
  title,
  subTitle,
  ...rest
}) => {
  return (
    <>
      <Header />
      <section className={cn(styles.hero, className)} {...rest}>
        <div className={styles.title}>
          {!!title && (
            <div className={styles.specialHeadingContainer}>
              <div className="z-[1]">
                <h1 className={styles.h1}>{title}</h1>
                <hr className={styles.separator} />
              </div>
            </div>
          )}
          {!!subTitle && <h2 className={cn(styles.h2)}>{subTitle}</h2>}

          {children}
        </div>
        <div className="bann-cont-c absolute top-[40%] left-1/2 transform -translate-x-1/2 -z-10">
          <div className="bann-cont opacity-20 blur-[7px] rounded-lg overflow-hidden">
            <img
              className="banner-img max-w-max"
              src="/assets/images/grapesjs-front-page-m.jpg"
              alt="GrapesJS Webpage Demo"
            />
          </div>
        </div>
      </section>
      <hr className={styles.shadowSeparator} />
    </>
  );
};

export default Hero;
