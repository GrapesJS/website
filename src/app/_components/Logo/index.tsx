"use client";
import cn from "classnames";

const Logo = ({
  className,
  height = 30,
  width,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div {...rest} className={cn("flex items-center gap-3", className)}>
      <img
        style={{ width, height }}
        alt="GrapesJS Logo"
        src="/assets/images/logos/grapesjs-logo-with-text.svg"
      />
    </div>
  );
};

export default Logo;
