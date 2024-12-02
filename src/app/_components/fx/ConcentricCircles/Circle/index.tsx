import { HTMLAttributes } from "react";

import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const Circle = ({ children, ...rest }: Props) => {
  return (
    <div {...rest} className={styles.circle}>
      {children}
    </div>
  );
};

export default Circle;
