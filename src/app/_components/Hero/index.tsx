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
}) => (
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
      <div className={styles.bannerContainer}>
        <div className={styles.bannerFrame}>
          <img
            className={styles.bannerImage}
            src="/assets/images/grapesjs-front-page-m.jpg"
            alt="GrapesJS Webpage Demo"
          />
        </div>
      </div>
    </section>
    <hr className={styles.shadowSeparator} />
  </>
);

export default Hero;
