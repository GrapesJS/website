import cn from "classnames";
import type { AnchorHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface BadgeLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const BadgeLink = (props: BadgeLinkProps) => {
  const { children, className, ...rest } = props;
  return (
    <a
      {...rest}
      className={cn(
        className,
        styles.badgeLink,
        "px-4 py-2 rounded-lg md:rounded-full"
      )}
    >
      {children}
    </a>
  );
};

export default BadgeLink;
