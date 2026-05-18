import cn from "classnames";

const Logo = ({
  className,
  height = 25,
  width,
  loading,
  ...rest
}: React.HTMLProps<HTMLDivElement> & { loading?: "eager" | "lazy" }) => {
  return (
    <div {...rest} className={cn("flex items-center gap-3", className)}>
      <img
        style={{ width, height }}
        alt="GrapesJS Logo"
        loading={loading}
        src="/assets/images/logos/grapesjs-logo-with-text.svg"
      />
    </div>
  );
};

export default Logo;
