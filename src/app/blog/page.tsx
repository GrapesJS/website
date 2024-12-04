import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/blogApi";
import Header from "../_components/Header";
import Footer from "../_components/footer";

export default function PageBlogPosts() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Header />
      <Container className="pt-10 md:pt-20">
        {heroPost && <HeroPost post={heroPost} />}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
      <Footer />
    </main>
  );
}
