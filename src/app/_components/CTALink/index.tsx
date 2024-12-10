import { AnchorHTMLAttributes } from "react";

import styles from "./styles.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "tertiary";
}

const CTALink = ({ children, variant, ...rest }: Props) => {
  let variantClass;
  if (variant === "secondary") {
    variantClass = styles.secondary;
  } else if (variant === "tertiary") {
    variantClass = styles.tertiary;
  } else {
    variant = "primary";
    variantClass = styles.primary;
  }
  return (
    <a {...rest} className={`${styles.ctaLink} ${variantClass}`}>
      {children}
    </a>
  );
};

export default CTALink;
