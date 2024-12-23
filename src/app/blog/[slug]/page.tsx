import Container from "@/app/_components/Container";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import { PostHeader } from "@/app/_components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import { DEFAULT_TITLE } from "@/lib/constants";
import urls from "@/lib/urls";
import { ContainerMDX } from "@/mdx-components";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageBlogPostProps {
  params: {
    slug: string;
  };
}

export default async function PageBlogPost({ params }: PageBlogPostProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <main>
        <Header />
        <Container>
          <div className="pt-40 pb-7">
            <Link href={urls.getPathBlog()}>‹ Back to blog</Link>
          </div>
          <article className="mb-32">
            <PostHeader post={post} />
            <div className="max-w-2xl mx-auto">
              <ContainerMDX source={post.content} />
            </div>
          </article>
        </Container>
        <Footer />
      </main>
    </>
  );
}

export function generateMetadata({ params }: PageBlogPostProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${DEFAULT_TITLE} Blog`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const result: PageBlogPostProps["params"][] = getAllPosts().map((post) => ({
    slug: post.slug,
  }));
  return result;
}
