import { AnchorHTMLAttributes } from "react";

import cx from "classnames";
import styles from "./styles.module.css";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "tertiary";
  full?: boolean;
}

/**
 * Call To Action Link
 */
const CTALink = ({ className, children, variant, full, ...rest }: Props) => {
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
    <a
      {...rest}
      className={cx(
        styles.ctaLink,
        variantClass,
        full && styles.full,
        className
      )}
    >
      {children}
    </a>
  );
};

export default CTALink;
