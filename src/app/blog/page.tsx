import Container from "@/app/_components/Container";
import { HeroPost } from "@/app/_components/HeroPost";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/blogApi";
import Footer from "../_components/Footer";
import Header from "../_components/Header";
import Hero from "../_components/Hero";

export default function PageBlogPosts() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <main>
        <Header />
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
