import { AnchorHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const CTALink = ({ children, ...rest }: Props) => {
  return (
    <a {...rest} className={styles.ctaLink}>
      {children}
    </a>
  );
};

export default CTALink;
