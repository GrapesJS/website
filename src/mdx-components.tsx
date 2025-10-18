import markdownStyles from "@/app/_components/markdown-styles.module.css";
import type { MDXComponents } from "mdx/types";
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import { slugify } from "./lib/utils";
import rehypeHighlight from "rehype-highlight";

import "./app/hjs-dracula.css";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

const mdxComponents = {
  a: ({ children, ...rest }: any) => (
    <Link className="link-gjs" {...rest}>
      {children}
    </Link>
  ),
  strong: ({ children, ...rest }: React.HTMLProps<any>) => (
    <b className="font-medium" {...rest}>
      {children}
    </b>
  ),
  img: ({ children, ...rest }: React.HTMLProps<any>) => (
    <img className="rounded-md shadow-md" {...rest}>
      {children}
    </img>
  ),
  iframe: ({ ...rest }: React.HTMLProps<HTMLIFrameElement>) => (
    <iframe className="rounded-lg shadow-md my-8" {...rest} />
  ),
  h1: ({ children, ...rest }: React.HTMLProps<any>) => (
    <h1 className="font-bold text-xl" id={slugify(children!)} {...rest}>
      <a href={`#${slugify(children!)}`}>{children}</a>
    </h1>
  ),
  h2: ({ children, ...rest }: React.HTMLProps<any>) => (
    <h2 className="font-semibold" id={slugify(children!)} {...rest}>
      <a href={`#${slugify(children!)}`}>{children}</a>
    </h2>
  ),
};

const options: MDXRemoteProps["options"] = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [
      // @ts-expect-error
      rehypeHighlight,
    ],
  },
};

export function ContainerMDX({ source }: MDXRemoteProps) {
  return (
    <div className={markdownStyles.markdown}>
      <MDXRemote components={mdxComponents} source={source} options={options} />
    </div>
  );
}
