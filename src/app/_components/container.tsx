import cx from "classnames";

const Container = ({ children, className }: React.HTMLProps<HTMLElement>) => {
  return <div className={cx('container mx-auto px-5 pb-10 md:pb-44', className)}>{children}</div>;
};

export default Container;
