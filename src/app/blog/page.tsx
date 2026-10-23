import Container from "@/app/_components/Container";
import { HeroPost } from "@/app/_components/HeroPost";
import { MoreStories } from "@/app/_components/MoreStories.tsx";
import { getAllPosts } from "@/lib/blogApi";
import Footer from "../_components/Footer";
import Hero from "../_components/Hero";
import type { Metadata } from "next";

const blogTitle = "GrapesJS Blog: Product Updates and Guides";
const blogDescription =
  "Product updates, implementation guides, and ideas for building visual editors with GrapesJS and Studio SDK.";

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: blogTitle,
    description: blogDescription,
    url: "/blog",
  },
};

export default function PageBlogPosts() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <main>
        <Hero title="BLOG" subTitle="GrapesJS Resources & Articles" />
        <Container className="pt-10 md:pt-20">
          {heroPost && <HeroPost post={heroPost} />}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
        <Footer />
      </main>
    </>
  );
}
