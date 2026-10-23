import cn from "classnames";
import Header from "../Header";
import styles from "./styles.module.css";

interface HeroProps extends Omit<React.HTMLProps<HTMLElement>, "title"> {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  clsTitle?: string;
  mainHeadingAsH1?: boolean;
  withBanner?: boolean;
  skipSeparator?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  children,
  clsTitle,
  className,
  title,
  subTitle,
  mainHeadingAsH1 = false,
  withBanner = true,
  skipSeparator,
  ...rest
}) => (
  <>
    <Header />
    <section className={cn(styles.hero, className)} {...rest}>
      <div className={styles.title}>
        {!!title && (
          <div className={styles.specialHeadingContainer}>
            <div className="z-[1]">
              {mainHeadingAsH1 ? (
                <p className={styles.h1}>{title}</p>
              ) : (
                <h1 className={styles.h1}>{title}</h1>
              )}
              <hr className={styles.separator} />
            </div>
          </div>
        )}
        {!!subTitle &&
          (mainHeadingAsH1 ? (
            <h1 className={cn(styles.h2, clsTitle)}>{subTitle}</h1>
          ) : (
            <h2 className={cn(styles.h2, clsTitle)}>{subTitle}</h2>
          ))}

        {children}
      </div>
      {withBanner && (
        <div className={styles.bannerContainer}>
          <div className={styles.bannerFrame}>
            <img
              className={styles.bannerImage}
              src="/assets/images/grapesjs-front-page-m.jpg"
              alt="GrapesJS Webpage Demo"
            />
          </div>
        </div>
      )}
    </section>
    {!skipSeparator && <hr className={styles.shadowSeparator} />}
  </>
);

export default Hero;
