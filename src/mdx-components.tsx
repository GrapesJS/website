import markdownStyles from "@/app/_components/markdown-styles.module.css";
import type { MDXComponents } from 'mdx/types';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

const mdxComponents = {
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