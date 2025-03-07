import Avatar from "@/app/_components/avatar";
import Container from "@/app/_components/Container";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import PostReadTime from "@/app/_components/postReadTime";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import { DEFAULT_TITLE } from "@/lib/constants";
import urls from "@/lib/urls";
import { ContainerMDX } from "@/mdx-components";
import cn from "classnames";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.css";

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

  const { author, title, date, coverImage } = post;

  return (
    <>
      <main>
        <Header />
        <article>
          <div className={styles.postHeader}>
            <Container>
              <div className={"max-w-2xl mx-auto"}>
                <Link className={styles.backLink} href={urls.getPathBlog()}>
                  ‹ Back to blog
                </Link>
                <h1 className="text-5xl font-bold tracking-tighter leading-tight my-6 text-center md:text-left">
                  {title}
                </h1>
                <div className="flex gap-5 items-center mb-7 md:mb-12 flex-wrap">
                  <Avatar
                    name={author.name}
                    picture={author.picture}
                    className={cn(styles.metadata, "basis-full md:basis-auto")}
                  />
                  <DateFormatter
                    className={styles.metadata}
                    dateString={date}
                  />
                  <PostReadTime className={styles.metadata} post={post} />
                </div>
                <div className="sm:mx-0">
                  <CoverImage title={title} src={coverImage} />
                </div>
              </div>
            </Container>
          </div>
          <hr className={styles.shadowSeparator} />
          <Container>
            <div className="mb-32">
              <div className={cn(styles.postContent, "max-w-2xl mx-auto")}>
                <ContainerMDX source={post.content} />
              </div>
            </div>
          </Container>
        </article>
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
