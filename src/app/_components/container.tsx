import cx from "classnames";

const Container = ({ children, className }: React.HTMLProps<HTMLElement>) => {
  return <div className={cx('container mx-auto px-5', className)}>{children}</div>;
};

export default Container;
