import Alert from "@/app/_components/alert";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostHeader } from "@/app/_components/post-header";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import { DEFAULT_TITLE } from "@/lib/constants";
import { ContainerMDX } from "@/mdx-components";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageBlogPostProps {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: PageBlogPostProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <main>
      <Alert preview={post.preview} />
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
          />
          <div className="max-w-2xl mx-auto">
            <ContainerMDX source={post.content}/>
          </div>
        </article>
      </Container>
    </main>
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
  const result: PageBlogPostProps['params'][] = getAllPosts().map((post) => ({ slug: post.slug }));
  return result;
}
