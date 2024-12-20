import cx from "classnames";
import styles from "./styles.module.css";
const Container = ({ children, className }: React.HTMLProps<HTMLElement>) => {
  return (
    <div
      className={cx(styles.container, "mx-auto px-5 pb-32 md:pb-44", className)}
    >
      {children}
    </div>
  );
};

export default Container;
