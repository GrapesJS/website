import cn from "classnames";
import styles from "./styles.module.css";
const Container = ({ children, className }: React.HTMLProps<HTMLElement>) => {
  return <div className={cn(styles.container, className)}>{children}</div>;
};

export default Container;
