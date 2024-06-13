import markdownStyles from "@/app/_components/markdown-styles.module.css";
import type { MDXComponents } from 'mdx/types';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import Link from "next/link";
import { slugify } from "./lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

const mdxComponents = {
  a: ({ children, ...rest}: any) => <Link className="link-gjs" {...rest}>{ children }</Link>,
  img: ({ children, ...rest}: React.HTMLProps<any>) => <img className="rounded-md shadow-md" {...rest}>{children}</img>,
  h1: ({ children, ...rest}: React.HTMLProps<any>) => (
    <h1 className="font-bold text-xl" id={slugify(children!)} {...rest}>
      <a href={`#${slugify(children!)}`}>{ children }</a>
    </h1>
  ),
};

export function ContainerMDX({ source }: MDXRemoteProps) {
  // @ts-ignore
  const result = <MDXRemote
    components={mdxComponents}
    source={source}
  />;

  return (
    <div className={markdownStyles["markdown"]}>
        {result}
    </div>
  );
}